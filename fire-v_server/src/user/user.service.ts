import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import {
  User,
  UserDocument,
} from "src/schemas/user.schema";
@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

  async create(user: any) {
    try{
      const user_Indb = await this.userModel.findOne({email :user.email});
      // console.log(user_Indb);
      if(!user_Indb){
        const newUser = new this.userModel();
        newUser.name = user.name;
        newUser.email = user.email;
        newUser.avatar = user.picture;
        const _user = await newUser.save();
        return _user;
      }
      if(user_Indb){
        console.log(`user with email:${user.email} has just logined `)
      }
    }catch(err){
      console.log(err);
    }
  }

  async findByUserId(id: string) {
    return await this.userModel.findById(id);
  }

  async findAllUser() {
    return await this.userModel.find({});
  }

  async deleteUser(id: string) {
    return await this.userModel.findByIdAndDelete(id);
  }

  async findOne(email: string) {
    try{
      if(email){
        const user =  await this.userModel.findOne({
          email: email
        })
        return user._id;
      }else{
        return '';
      }
    }catch(err){
      return err;
    }
  }

  async updateSubscribers(id: string, email: string) {
    const findUser = await this.userModel.findOne({_id: id});
    const user_Indb = await this.userModel.findOne({
      email: email,
    }).exec();
    const idOfUser = user_Indb._id;
    console.log(idOfUser);
    console.log(user_Indb.email);
    if(findUser.subscriberList.includes(user_Indb._id)){
      const index = findUser.subscriberList.indexOf(idOfUser);
      findUser.subscriberList.splice(index, 1);
      findUser.subscribers -= 1;
    }else{
      findUser.subscriberList.push(idOfUser);
      findUser.subscribers += 1;
    }
    const tam = await findUser.save();
    return tam;
  }
  
}
