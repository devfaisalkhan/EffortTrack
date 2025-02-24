import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { AppConstant } from 'src/shared/app.constant';
import { PassportModule } from '@nestjs/passport';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guards/auth.guard';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ConfigurationModule } from 'src/shared/config/configuration.module';
import { ConfigurationService } from 'src/shared/config/configuration.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigurationModule],
      inject: [ConfigurationService], // Inject the ConfigService
      useFactory: async (configService: ConfigurationService) => ({
        secret: configService.getJwtConfig().accessTokenKey,
        signOptions: {
          expiresIn: AppConstant.DEFAULT_JWT_ACCESS_TOKEN_EXPIRATION,
        },
      }),
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AuthController],
  providers: [
    ConfigurationService,
    AuthService,
    UserService,
    LocalStrategy,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  exports: [ConfigurationService, AuthService],
})
export class AuthModule {}
