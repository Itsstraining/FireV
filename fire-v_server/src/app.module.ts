import { UploadModule } from './upload/upload.module';
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { VideoModule } from './video/video.module';

import { MongooseModule } from '@nestjs/mongoose';
import databaseConfig from './configs/database.config';
import { UserController } from './user/user.controller';
import { CommentModule } from './comment/comment.module';
import { AuthService } from './middleware/auth/auth.service';
import { AuthMiddleware } from './middleware/auth/auth.middleware';


@Module({
  imports: [
    MongooseModule.forRoot(databaseConfig().appDatabase),
    UserModule, 
    VideoModule, 
    CommentModule, 
    UploadModule

  ],
  controllers: [AppController],
  providers: [AppService, AuthService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: 'video/all', method: RequestMethod.GET },
        { path: 'video/play/(.*)', method: RequestMethod.GET },
        { path: 'video/play', method: RequestMethod.GET },
        { path: 'video/all/(.*)', method: RequestMethod.GET },
        { path: 'video/views/(.*)', method: RequestMethod.PUT },
        // { path: 'video/likes/(.*)', method: RequestMethod.PUT },
      //   // { path: 'video/all/vid', method: RequestMethod.GET },
      //   // { path: 'video/one/', method: RequestMethod.GET },
      //   // { path: 'video/entire/', method: RequestMethod.GET },
      //   // { path: 'video/views/', method: RequestMethod.PUT },
      //   'video/all/(.*)',
      //   'video/one/(.*)',
      //   'video/entire/(.*)',
      //   'video/views/(.*)'
      // 'video/play?path=(.*)'
      //'video/play/(.*)',
      )
      .forRoutes(
        {
          path: '*',
          method: RequestMethod.ALL
        })
  }
}
