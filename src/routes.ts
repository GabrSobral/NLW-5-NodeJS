import { Router } from 'express'
import MessagesController from './controllers/MessagesController'
import SettingController from './controllers/SettingController'
import UsersController from './controllers/UsersController'

const routes = Router()

routes.post('/settings', SettingController.CreateSetting)

routes.post('/users', UsersController.CreateUser)

routes.post('/messages', MessagesController.CreateMessage)
routes.get('/messages/:id', MessagesController.ShowByUser)
export default routes