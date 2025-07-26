const uuid = require('uuid').v4
const bcrypt = require('bcrypt')

const users = [
  { id: '1', name: 'Pietro Franca', email: 'pietro@gmail.com', password: bcrypt.hashSync('123456', 10), role: 'admin' },
  { id: '2', name: 'Ronaldo Fenômeno', email: 'ronaldo@gmail.com', password: bcrypt.hashSync('000000', 10), role: 'standard' }
]

module.exports = {
  getAllUsers: () => users,

  getUserById: (id) => users.find(user => user.id === id),

  getUserByEmail: (email) => users.find(user => user.email === email),

  createUser: (name, email, password) => {
    const newUser = {
      id: uuid(),
      name,
      email,
      password: bcrypt.hashSync(password, 10),
      role: 'standard'
    }

    users.push(newUser)
    return newUser
  }
}