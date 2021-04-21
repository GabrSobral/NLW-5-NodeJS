import { Request, Response } from "express";
import MessageService from "../services/MessageService";


export default {
  async CreateMessage(req : Request, res : Response) : Promise<Response>{
    const { admin_id, text, user_id } = req.body

    const message = await MessageService.create({ 
      admin_id, 
      text, 
      user_id 
    })
    return res.send(message)
  },
  async ShowByUser(req : Request, res : Response) : Promise<Response>{
    const {id} = req.params  
    
    const userMessages = await MessageService.listByUser(id)

    return res.send(userMessages)
  }
}