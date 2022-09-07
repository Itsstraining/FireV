import { Controller, Get, Post, Body, Delete, Query, Req } from '@nestjs/common';
import { Comment } from 'src/schemas/comment.schema';
import { CommentService } from './comment.service';

@Controller('comment')
export class CommentController {


  constructor(private readonly commentService: CommentService) {}
  @Post('send')
  public async createComment(@Body() comment: Comment, @Req() req: any, @Query('id') id: string){
    return await this.commentService.createComment(comment, req.user, id);
  }
  @Get('video')
  public async getCommentByVideoId(@Query('id') id: string){
    return await this.commentService.findAllComment(id);
  }
  
}