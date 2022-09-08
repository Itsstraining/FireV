import { Controller, Get, Post, Body, Delete, Query, Req, Put } from '@nestjs/common';
import { Comment } from 'src/schemas/comment.schema';
import { CommentService } from './comment.service';

@Controller('comment')
export class CommentController {


  constructor(private readonly commentService: CommentService) {}
  @Post('send')
  public async createComment(@Body() comment: Comment, @Req() req: any, @Query('id') id: string){
    return await this.commentService.createComment(comment, req.user, id);
  }
  @Get('video/path')
  public async getCommentByVideoId(@Query('id') id: string){
    return await this.commentService.findAllComment(id);
  }
  @Put('like/path')
  public async updateLike(@Query('id') id: string, @Req() req: any){
    return await this.commentService.updateLike(id, req.user);
  }
  @Put('dislike/path')
  public async updateDislike(@Query('id') id: string, @Req() req: any){
    return await this.commentService.updateDislike(id, req.user);
  }
  @Put('unlike/path')
  public async updateUnlike(@Query('id') id: string, @Req() req: any){
    return await this.commentService.updateLike(id, req.user);
  }
  @Put('undislike/path')
  public async updateUndislike(@Query('id') id: string, @Req() req: any){
    return await this.commentService.updateDislike(id, req.user);
  }

  
}