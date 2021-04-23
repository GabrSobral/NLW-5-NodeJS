import { io } from '../http'
import ConnectionsService from '../services/ConnectionsService'
import MessageService from '../services/MessageService'

io.on('connect', async (socket) =>{
  const allConnectionsWithoutAdmin = await ConnectionsService.findAllWithoutAdmin()

  io.emit('admin_list_all_users', allConnectionsWithoutAdmin)

  socket.on('admin_list_messages_by_user', async (params, callback) => {
    const { user_id } = params

    const AllMessages = await MessageService.listByUser(user_id)

    callback(AllMessages)
  })

  socket.on('admin_send_message', async params => {
    const { user_id, text } = params

    await MessageService.create({
      text,
      user_id,
      admin_id : socket.id
    })

    const { socket_id } = await ConnectionsService.findByUserId(user_id)
  
    io.to(socket_id).emit('admin_send_to_client', {
      text,
      socket_id : socket.id
    })
  })

  socket.on('admin_user_in_call', async (params) => {
    const { user_id } = params
    await ConnectionsService.updateAdminId(user_id, socket.id)

    const allConnectionsWithoutAdmin = await ConnectionsService.findAllWithoutAdmin()

    io.emit('admin_list_all_users', allConnectionsWithoutAdmin)
  })
})