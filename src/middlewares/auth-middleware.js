const jwt = require('jsonwebtoken')
const usersModel = require('../models/users-model')

const authMiddleware = (req, res, next) => {
  
  const authHeader = req.headers.authorization

  if (!authHeader) 
    return res.status(401).json({ message: 'Não autorizado!' })

  const token = authHeader.split(' ')[1]
  // token é enviado no modelo: 'bearer token...' 

  try 
  {
    const { id } = jwt.verify(token, process.env.JWT_KEY)
    const user = usersModel.getUserById(id)

    if (!user)
      return res.status(404).json({ message: 'Usuário não encontrado!' })

    req.user = user

    next()
  } 
  catch (error) 
  {
    return res.status(401).json({ message: 'Token Inválido!' })
  }
}

module.exports = authMiddleware