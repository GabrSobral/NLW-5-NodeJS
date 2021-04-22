import { getCustomRepository } from "typeorm"
import { UsersRepository } from "../repositories/UsersRepository"


interface UserCreateProps {
  email : string
}

export default {
  async create( email : string ){
    const usersRepository = getCustomRepository(UsersRepository)
    const userExists = await usersRepository.findOne({email})

    if(userExists){
      return userExists
    }

    const user = usersRepository.create({email})

    await usersRepository.save(user)
    return user
  },
  async findByEmail(email : string){
    const usersRepository = getCustomRepository(UsersRepository)
    
    const user = await usersRepository.findOne({email})

    return user
  }
}