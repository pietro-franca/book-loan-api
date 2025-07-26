const usersModel = require("../models/users-model")

module.exports = {
  // GET /admin/users
  index: (req, res) => {
    const users = usersModel.getAllUsers()
    const usersNoPassword = users.map(({ password, ...userNoPassword }) => userNoPassword)
    
    res.json(usersNoPassword)
  },

  // GET /admin/users/:id
  show: (req, res) => {
    const id = req.params.id
    const user = usersModel.getUserById(id)

    if (!user)
      return res.status(404).json({ message: 'Usuário não encontrado!' })

    res.json(user)
  },

  // PUT /admin/users/:id
  update: (req, res) => {
    const id = req.params.id
    const user = usersModel.getUserById(id)

    if (!user)
      return res.status(404).json({ message: 'Usuário não encontrado!' })

    // torna o usuário um administrador
    user.role = 'admin'

    res.json({ message: `${user.name} agora é um Administrador` })
  },

  // DELETE /admin/users/:id
  delete: (req, res) => {
    const id = req.params.id
    const users = usersModel.getAllUsers()

    const userIndex = users.findIndex(user => user.id === id)

    if (userIndex === -1) 
      return res.status(404).json({ message: 'Usuário não encontrado!' })
    
    users.splice(userIndex, 1)

    res.end()
  }
}