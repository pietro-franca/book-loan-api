const HttpError = require('../errors/HttpError')
const booksModel = require('./books-model')

const uuid = require('uuid').v4

const loans = [
  {
    id: '1',
    userId: '1',
    bookId: '1',
    loanDate: new Date('2025-01-01'),
    returnDate: null,
    isReturned: false,
    isLate: true
  }
]

module.exports = {
  getAllLoans: () => loans,

  getLoansByUserId: (userId) => loans.filter(loan => loan.userId === userId),

  getLoanById: (id) => loans.find(loan => loan.id === id),

  createLoan: (user, book) => {
    if (book.quantityAvailable < 1) throw new HttpError(400, 'Não há exemplares disponíveis')

    const today = new Date()
    const returnDate = new Date()
    returnDate.setDate(today.getDate() + 14) // prazo de duas semanas (14 dias)

    const newLoan = {
      id: uuid(),
      userId: user.id,
      bookId: book.id,
      loanDate: today,
      returnDate: returnDate,
      isReturned: false,
      isLate: false
    }

    loans.push(newLoan)
    booksModel.takeBook(book.id)

    return newLoan
  },

  returnLoan: (id) => {
    const loan = loans.find(loan => loan.id === id)
    if (loan.isReturned) return null

    loan.isReturned = true

    const today = new Date()
    const limitDate = new Date(loan.returnDate)
    loan.isLate = today > limitDate
    loan.returnDate = today

    booksModel.returnBook(loan.bookId)
    return loan
  }
}