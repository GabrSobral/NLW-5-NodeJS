import { getCustomRepository } from "typeorm";
import { Connection } from "../entities/Connection";
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
  },
  async findAllWithoutAdmin(){
    const connectionRepository = getCustomRepository(ConnectionsRepository)

    const connections = connectionRepository.find({
      where : { admin_id : null },
      relations : ['user']
    })

    return connections
  },
  async findBySocketId(socket_id: string){
    const connectionRepository = getCustomRepository(ConnectionsRepository)

    const connection = connectionRepository.findOne({
      socket_id
    })

    return connection
  },
  async updateAdminId(user_id: string, admin_id : string){
    const connectionRepository = getCustomRepository(ConnectionsRepository)

    await connectionRepository.createQueryBuilder().
    update(Connection)
    .set({ admin_id })
    .where('user_id = :user_id', {
      user_id
    })
    .execute()
  }
}
