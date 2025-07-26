const HttpError = require("../errors/HttpError")
const booksModel = require("../models/books-model")
const loansModel = require("../models/loans-model")

module.exports = {
  // GET /api/loans
  index: (req, res) => {
    const loans = loansModel.getAllLoans()
    res.json(loans)
  },

  // GET /api/loans/:id
  show: (req, res) => {
    const id = req.params.id
    const loan = loansModel.getLoanById(id)

    if (!loan) throw new HttpError(404, 'Empréstimo não encontrado!')
    res.json(loan)
  },

  // GET /api/loans/user
  getUserLoans: (req, res) => {
    const userId = req.user.id
    const userLoans = loansModel.getLoansByUserId(userId)

    res.json(userLoans)
  },

  // GET /api/loans/user/:id
  getUserLoanById: (req, res) => {
    const userId = req.user.id
    const id = req.params.id
    const loan = loansModel.getLoanById(id)

    if (!loan) 
      return res.status(404).json({ message: 'Empréstimo não encontrado' });

    if (loan.userId !== userId) 
      throw new HttpError(403, 'Você não pode acessar esse empréstimo!')

    res.json(loan)
  },

  // POST /api/loans
  save: (req, res) => {
    const user = req.user
    const { bookId } = req.body

    if (typeof bookId !== 'string')
      throw new HttpError(400, 'ID de livro inválido!')

    const book = booksModel.getBookById(bookId)

    if (!book)
      throw new HttpError(400, 'Livro não encontrado!')

    const newLoan = loansModel.createLoan(user, book)
    res.status(201).json(newLoan)
  },

  // POST /api/loans/:id/return
  return: (req, res) => {
    const { id } = req.params

    const loan = loansModel.returnLoan(id)
    res.json(loan)
  }
}