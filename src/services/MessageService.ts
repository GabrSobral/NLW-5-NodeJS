import { getCustomRepository } from "typeorm"
import { MessageRepository } from "../repositories/MessagesRepository"

interface MessageCreate {
  admin_id?:string,
  text : string,
  user_id : string
}

export default {
  async create({admin_id, text, user_id} : MessageCreate){
    const messagesRepository = getCustomRepository(MessageRepository)

    const message = messagesRepository.create({
      admin_id,
      text,
      user_id
    })
    await messagesRepository.save(message)

    return message
  },
  async listByUser(user_id){
    const messagesRepository = getCustomRepository(MessageRepository)

    const list = await messagesRepository.find({
      where : { user_id },
      relations : ['user']
    })
    return list
  }
}