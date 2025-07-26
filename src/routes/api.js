const express = require("express")
const booksController = require("../controllers/books-controller")
const loansController = require("../controllers/loans-controller")
const authMiddleware = require("../middlewares/auth-middleware")
const adminMiddleware = require("../middlewares/admin-middleware")
const apiRouter = express.Router()

apiRouter.get('/books', booksController.index)
apiRouter.get('/books/:id', booksController.show)

apiRouter.post('/books', authMiddleware, adminMiddleware, booksController.save)
apiRouter.put('/books/:id', authMiddleware, adminMiddleware, booksController.update)
apiRouter.delete('/books/:id', authMiddleware, adminMiddleware, booksController.delete)

// mostra os empréstimos do usuário autenticado no momento
apiRouter.get('/loans/user', authMiddleware, loansController.getUserLoans)
apiRouter.get('/loans/user/:id', authMiddleware, loansController.getUserLoanById)

// mostra os empréstimos registrados no total (apenas admin)
apiRouter.get('/loans', authMiddleware, adminMiddleware, loansController.index)
apiRouter.get('/loans/:id', authMiddleware, adminMiddleware, loansController.show)

apiRouter.post('/loans', authMiddleware, loansController.save)
apiRouter.post('/loans/:id/return', authMiddleware, loansController.return)

module.exports = apiRouter