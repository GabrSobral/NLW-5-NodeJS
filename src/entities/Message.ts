import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid} from "uuid";
import { User } from "./User";

@Entity('messages')
export class Message{
  @PrimaryColumn()
  id : string;

  @Column()
  admin_id : string;

  @Column()
  text : string;

  @CreateDateColumn()
  created_at : Date;

  @JoinColumn( {name : "user_id"})
  @ManyToOne(() => User)
  user: User;

  @Column()
  user_id : string

  constructor(){
    if(!this.id){
      this.id = uuid()
    }
  }
}