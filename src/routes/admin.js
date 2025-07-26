const express = require("express")
const adminController = require("../controllers/admin-controller")
const authMiddleware = require("../middlewares/auth-middleware")
const adminMiddleware = require("../middlewares/admin-middleware")
const adminRouter = express.Router()

adminRouter.get('/users', authMiddleware, adminMiddleware, adminController.index)
adminRouter.get('/users/:id', authMiddleware, adminMiddleware, adminController.show)
adminRouter.put('/users/:id', authMiddleware, adminMiddleware, adminController.update)
adminRouter.delete('/users/:id', authMiddleware, adminMiddleware, adminController.delete)

module.exports = adminRouter