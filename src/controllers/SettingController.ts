import { Request, Response } from 'express'
import SettingsService from '../services/SettingsService'

export default {
  async CreateSetting(req : Request, res : Response) : Promise<Response>{
    const { chat, username } = req.body
    
    try{
      const settingsService = await SettingsService.create({ chat, username })
      return res.send(settingsService)

    } catch(error){
      return res.status(400).send({ error : error.message})
    }
  },
  async findByUserName(req : Request, res : Response){
    const { username } = req.params
    
    const settings = await SettingsService.findByUsername(username)

    return res.send(settings)
  },
  async update(req : Request, res : Response){
    const { username } = req.params
    const { chat } = req.body
    
    const settings = await SettingsService.update(username, chat)

    return res.send(settings)
  },
}