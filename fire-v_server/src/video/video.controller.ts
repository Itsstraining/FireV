import { Controller, Get, Post, Body, Query, Delete, Req, Res, StreamableFile, Param, Put } from '@nestjs/common';
import { createReadStream } from 'fs';
import { join } from 'path';
import { AuthService } from 'src/middleware/auth/auth.service';
import { Video } from 'src/schemas/video.schema';
import { VideoService } from './video.service';
import type { Response } from 'express';

@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService,private authService: AuthService) {}
  
  @Post('send')
  public async createVideoInfo(@Body()video:Video, @Req() req: any){
      console.log('di vo day');
      return await this.videoService.creatVideo(video,req.user);
  }

  @Get('play')
  public  getVideoByid(@Query('id') id: string){
    console.log(id);
      return this.videoService.findByVideoId(id);
  }

  @Get('play/test')
  getFile(@Query('path') path: string): StreamableFile {
   
    const file = createReadStream(join(process.cwd(), path));
    console.log(`video was played in this "${file.path}" path`);
    return new StreamableFile(file);
  }

  @Get('all')
  public async getAllVideo(){
    return await this.videoService.findAllVideo();
  }

  @Get('all/except')
  public async getAllExceptId(@Query('id') id: string){
    return await this.videoService.findAllExceptId(id);
  }

  @Put('views/path')
  public async updateVideo(@Query('id') id: string){
    return await this.videoService.update(id);
  }

  @Put('likes/path')
  public async updateLike(@Query('id') id: string, @Req() req: any){
    // console.log(req.user);
    return await this.videoService.updateLike(id, req.user);
  }

  @Put('dislikes/path')
  public async updateDislike(@Query('id') id: string, @Req() req: any){
    return await this.videoService.updateDislike(id, req.user);
  }

  @Put('unlikes/path')
  public async updateUnlike(@Query('id') id: string, @Req() req: any){
    return await this.videoService.updateLike(id, req.user);
  }

  @Put('undislikes/path')
  public async updateUndislike(@Query('id') id: string, @Req() req: any){
    return await this.videoService.updateDislike(id, req.user);
  }
}