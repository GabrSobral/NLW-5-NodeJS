import { getCustomRepository } from "typeorm";
import { ConnectionsRepository } from "../repositories/ConnectionsRepository";

interface ConnectionCreate{
  socket_id : string,
  user_id: string,
  admin_id?: string,
  id?:string
}

export default {
  async createConnection({socket_id, user_id, admin_id, id} : ConnectionCreate) {
    const connectionRepository = getCustomRepository(ConnectionsRepository)
    
    const connection = connectionRepository.create({
      socket_id,
      user_id,
      admin_id,
      id
    })

    await connectionRepository.save(connection)
    return connection
  },
  async findByUserId(user_id : string){
    const connectionRepository = getCustomRepository(ConnectionsRepository)

    const connection = connectionRepository.findOne({
      user_id
    })

    return connection
  }
}