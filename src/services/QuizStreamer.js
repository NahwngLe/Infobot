import { useEffect } from "react"

const QuizStreamer = ({ pdfId, language, onNewQuiz, onDone, onError }) => {
  useEffect(() => {
    const fetchStreamingQuiz = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/pdf/create-quiz/${pdfId}?language_of_quiz=${language}`
        )

        const reader = response.body.getReader()
        const decoder = new TextDecoder("utf-8")
        let buffer = ""

        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          buffer += decoder.decode(value, { stream: true })
          const lines = buffer.split("\n")
          buffer = lines.pop()

          for (const line of lines) {
            if (line.trim()) {
              const data = JSON.parse(line)
              if (data.error) {
                onError?.(data.error)
              } else {
                onNewQuiz?.(data)
              }
            }
          }
        }

        if (buffer.trim()) {
          const last = JSON.parse(buffer)
          if (!last.error) {
            onNewQuiz?.(last)
          }
        }

        onDone?.()
      } catch (err) {
        console.error("Stream error:", err)
        onError?.("Lỗi khi streaming quiz")
        onDone?.()
      }
    }

    fetchStreamingQuiz()
  }, [pdfId, language, onNewQuiz, onDone, onError])

  return null // component này không render gì
}

export default QuizStreamer
