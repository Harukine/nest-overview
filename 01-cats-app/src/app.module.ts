import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { logger, LoggerMiddleware } from './common/middleware/logger.middleware';
import { CatsModule } from './cats/cats.module';
import { CatsController } from './cats/cats.controller';

@Module({
  imports: [CatsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(logger) // can apply multiple middleware ex. .apply(cors(), helmet(), logger)
      .forRoutes(CatsController);
  }
}

// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer
//       .apply(LoggerMiddleware) // apply can take multiple middleware functions
//       .exclude(
//         { path: 'cats', method: RequestMethod.GET }, // excludes the get methods
//       )
//       .forRoutes(CatsController); // forRoutes can take multiple strings and controllers
//   }
// }
