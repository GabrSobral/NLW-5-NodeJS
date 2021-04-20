import { Router } from 'express'
import SettingController from './controllers/SettingController'

const routes = Router()

routes.post('/settings', SettingController.CreateSetting)

export default routes