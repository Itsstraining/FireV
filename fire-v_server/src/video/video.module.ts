import { Module } from '@nestjs/common';
import { VideoService } from './video.service';
import { VideoController } from './video.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Video, VideoSchema } from 'src/schemas/video.schema';
import { forwardRef } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { User, UserSchema } from 'src/schemas/user.schema';
import { AuthService } from 'src/middleware/auth/auth.service';
import { SuggestionModule } from 'src/suggestion/suggestion.module';
import { CommentModule } from 'src/comment/comment.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Video.name, schema: VideoSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),    
    forwardRef(() => UserModule),
    forwardRef(() => SuggestionModule),
    forwardRef(() => CommentModule),
  ],
  controllers: [VideoController],
  providers: [VideoService,AuthService],
  exports: [VideoService]
})
export class VideoModule {}
