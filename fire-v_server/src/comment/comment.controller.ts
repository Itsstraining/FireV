import { Controller, Get, Post, Body, Delete, Query, Param, Req } from '@nestjs/common';
import { Comment } from 'src/schemas/comment.schema';
import { CommentService } from './comment.service';

@Controller('comment')
export class CommentController {


  constructor(private readonly commentService: CommentService) {}
  @Post('create/:id')
  public async create(@Body() comment: Comment,@Param('id') videoId: string, @Req() req: any) {
    return await this.commentService.creatComment(comment,videoId,req.user.email);
  }

  @Get('all')
  public async findAll() {
    return await this.commentService.findAllComment();
  }

  @Delete()
  public async delete(@Body() id: string) {
    return await this.commentService.deleteComment(id);
  }
}