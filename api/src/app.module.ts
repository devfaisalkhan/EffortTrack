import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { join } from 'path';
import appConfig from './shared/config/app.config';
import { SeedDataMiddleware } from './shared/middleware/seed-data.middleware';
import { CustomConfigurationService } from './shared/config/configuration.service';
import { ConfigurationModule } from './shared/config/configuration.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './user/auth/auth.module';
import { User } from './user/entities/user.entity';
import { Base } from './shared/base.entity';
import { Otp } from './user/otp/entities/otp.entity';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

const CONNECTION_NAME = 'default';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
      envFilePath: '.env',
      expandVariables: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigurationModule],
      name: CONNECTION_NAME,
      useFactory: async (configService: CustomConfigurationService) => ({
        type: 'mysql',
        host: configService.getDatabaseConfig().host,
        port: +configService.getDatabaseConfig().port,
        username: configService.getDatabaseConfig().username,
        password: configService.getDatabaseConfig().password,
        database: configService.getDatabaseConfig().databaseName,
        entities: [Base],
        synchronize: true,
        connectTimeout: 60 * 60 * 1000,
      }),
      inject: [CustomConfigurationService],
    }),
    // MailerModule.forRootAsync({
    //   imports: [ConfigurationModule],
    //   useFactory: async (configurationService: CustomConfigurationService) => ({
    //     transport: {
    //       host: configurationService.getEmailConfig().host,
    //       auth: {
    //         user: configurationService.getEmailConfig().username,
    //         pass: configurationService.getEmailConfig().password,
    //       },
    //     },
    //   }),
    //   inject: [CustomConfigurationService], // Use ConfigurationService
    // }),
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '..', '_uploads'),
    //   serveRoot: '/uploads',
    // }),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, CustomConfigurationService],
})
export class AppModule {
  async configure(consumer: MiddlewareConsumer) {
    consumer.apply(SeedDataMiddleware).forRoutes('/');
  }
}
