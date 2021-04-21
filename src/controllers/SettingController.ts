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
  }
}