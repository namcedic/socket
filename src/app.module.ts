import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppGateway } from './app/app.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './database/typeorm.config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { ChatModule } from './chat/chat.module';
// import { ServeStaticModule } from '@nestjs/serve-static';
// import { join } from 'path';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: undefined,
      useFactory() {
        return typeOrmConfig;
      },
      dataSourceFactory: async (options: DataSourceOptions) => {
        if (!options) {
          throw new Error('DataSourceOptions is required');
        }
        return addTransactionalDataSource(new DataSource(options));
      },
    }),
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '..', 'static'), // Serve static files from the static directory
    // }),
    ChatModule,
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppGateway],
})
export class AppModule {}
