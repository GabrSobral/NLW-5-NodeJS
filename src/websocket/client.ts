import { io } from '../http'
import ConnectionsService from '../services/ConnectionsService'
import MessageService from '../services/MessageService'
import UsersService from '../services/UsersService'

interface Params {
  text : string,
  email : string
}

io.on('connect', (socket) => {
  socket.on('client_first_access', async (params) => {
    const socket_id = socket.id
    const { text , email } = params as Params
    let user_id = null

    const userExists = await UsersService.findByEmail(email)

    if(!userExists){
      const user = await UsersService.create(email)

      await ConnectionsService.createConnection({
        socket_id,
        user_id : user.id
      })
      user_id = user.id
    } else {
      user_id = userExists.id
      const connection = await ConnectionsService.findByUserId(userExists.id)
      
      if(!connection){
        await ConnectionsService.createConnection({
          socket_id,
          user_id : userExists.id
        })
      } else {
        connection.socket_id = socket_id
        await ConnectionsService.createConnection(connection)
      }
    }
    await MessageService.create({
      text,
      user_id
    })

  })
})