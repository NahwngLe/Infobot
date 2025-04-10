import { render, screen, waitFor } from '@testing-library/react'
import QuizScreen from './QuizScreen'
import { vi } from 'vitest'
import pdfApi from '../../services/pdfApi'

// ✅ Mock cả module
vi.mock('../../../services/pdfApi', () => ({
  default: {
    getQuiz: vi.fn(),
    createQuizFromId: vi.fn(),
  }
}))

describe('QuizScreen', () => {
  it('hiển thị danh sách quiz nếu gọi API thành công', async () => {
    pdfApi.getQuiz.mockResolvedValue([
      { quiz_name: 'Quiz 1' },
      { quiz_name: 'Quiz 2' },
    ])

    render(<QuizScreen pdfId="abc123" />)

    await waitFor(() => {
      expect(screen.getByText(/Quiz 1/)).toBeInTheDocument()
      expect(screen.getByText(/Quiz 2/)).toBeInTheDocument()
    })
  })

  it('hiển thị thông báo nếu không có quiz', async () => {
    pdfApi.getQuiz.mockRejectedValue({
      response: {
        status: 404,
        data: {
          detail: 'No quizz found'
        }
      }
    })

    render(<QuizScreen pdfId="xyz789" />)

    await waitFor(() => {
      expect(screen.getByText(/No quizz found/i)).toBeInTheDocument()
    })
  })
})
