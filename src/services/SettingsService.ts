import { getCustomRepository } from "typeorm"
import SettingsRepository from "../repositories/SettingsRepository"

interface SettingsCreateProps {
  chat : boolean,
  username : string
}

export default {
  async create({chat, username} : SettingsCreateProps){
    const settingsRepository = getCustomRepository(SettingsRepository)

    const userAlreadyExists = await settingsRepository.findOne({ username })

    if(userAlreadyExists){
      throw new Error("User Already Exists")
    }
  
    const settings = settingsRepository.create({
      chat,
      username
    })
    
    await settingsRepository.save(settings)

    return settings
  }
}