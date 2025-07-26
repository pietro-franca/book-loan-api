const adminMiddleware = (req, res, next) => {

  const user = req.user

  try 
  {
    if (user.role !== 'admin')
    {
      return res.status(401).json({ message: 'Você não tem autorização para acessar esse recurso' })
    }

    req.adminUser = user

    next()
  } 
  catch (error) 
  {
    return res.status(401).json({ message: 'Usuário Inválido' })
  }
}

module.exports = adminMiddleware