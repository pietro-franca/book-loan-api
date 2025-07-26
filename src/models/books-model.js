const HttpError = require('../errors/HttpError')
const uuid = require('uuid').v4

let books = [
  { id: '1', title: 'Book One', author: 'Author One', quantityAvailable: 4},
  { id: '2', title: 'Book Two', author: 'Author Two', quantityAvailable: 3}
]

module.exports = {
  getALlBooks: () => books.map(book => ({ id: book.id, title: book.title })),

  getBookById: (id) => books.find(book => book.id === id),

  createBook: (title, author, quantityAvailable) => {
    const newBook = {
      id: uuid(),
      title,
      author,
      quantityAvailable
    }

    books.push(newBook)
    return newBook
  },

  updateBook: (id, updatedBook) => {
    const bookIndex = books.findIndex(book => book.id === id)
    
    if (bookIndex === -1) throw new HttpError(404, 'Livro não encontrado')

    books[bookIndex] = { ...books[bookIndex], ...updatedBook }
    return books[bookIndex]
  },

  deleteBook: (id) => {
    const bookIndex = books.findIndex(book => book.id === id)
    
    if (bookIndex === -1) throw new HttpError(404, 'Livro não encontrado')

    const deletedBook = books[bookIndex]
    books = books.filter(book => book.id !== id)
    return deletedBook
  },

  takeBook: (id) => {
    const bookIndex = books.findIndex(book => book.id === id)
    
    if (bookIndex === -1) throw new HttpError(404, 'Livro não encontrado')

    books[bookIndex].quantityAvailable--
  },

  returnBook: (id) => {
    const bookIndex = books.findIndex(book => book.id === id)
    
    if (bookIndex === -1) throw new HttpError(404, 'Livro não encontrado')

    books[bookIndex].quantityAvailable++
  }
}