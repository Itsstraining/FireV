import { Controller, Get, Post, Body, Query, Delete, Req, Put } from '@nestjs/common';
import { User } from 'src/schemas/user.schema';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) { }

  @Post('send')
  public async createUser(@Req() req: any) {
    return await this.userService.create(req.user);
  }

  @Get('id')
  getUserId(@Req() req: any){
    return this.userService.findOne(req.user.email);
  }

  @Get('/')
  public async getUserById(@Query(`id`) id: string) {
    console.log(id);
    return await this.userService.findByUserId(id);
  }

  @Get('all')
  public async getAllUsers() {
    return await this.userService.findAllUser();
  }

  @Delete('/delete')
  public async deleteUser(@Query(`id`) id: string) {
    return await this.userService.deleteUser(id);
  }
  @Put('subscribers/path')
  public async updateSubscribers(@Query(`id`) id: string, @Req() req: any) {
    return await this.userService.updateSubscribers(id, req.user.email);
  }
}
