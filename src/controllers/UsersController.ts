import { Request, Response } from "express"
import UsersService from "../services/UsersService"


export default {
  async CreateUser(req : Request, res : Response) : Promise<Response>{
    const { email } = req.body
    
    try{
      const user = await UsersService.create(email)
      return res.send(user)
    } catch(error){
      return res.status(400).send({ error : error.message })
    }
  }
}