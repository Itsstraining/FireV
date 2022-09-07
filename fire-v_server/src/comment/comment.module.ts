import { MongooseModule } from '@nestjs/mongoose';
import { forwardRef, Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { Comment, CommentSchema } from 'src/schemas/comment.schema';
import { Video, VideoSchema } from 'src/schemas/video.schema';
import { User, UserSchema } from 'src/schemas/user.schema';
import { UserModule } from 'src/user/user.module';
import { VideoModule } from 'src/video/video.module';
import { VideoService } from 'src/video/video.service';
import { AuthService } from 'src/middleware/auth/auth.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
    MongooseModule.forFeature([{ name: Video.name, schema: VideoSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),    
    forwardRef(() => UserModule),
    forwardRef(() => VideoModule),
  ],
  controllers: [CommentController],
  providers: [CommentService, VideoService, AuthService]
})
export class CommentModule {}
