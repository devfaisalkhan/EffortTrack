import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ConfigurationService {
  constructor(private configService: ConfigService) {}

  getAppConfig() {
    return {
      name: this.configService.get<string>('app.name'),
      url: this.configService.get<string>('app.url'),
      localPort: this.configService.get<number>('app.localPort'),
      swaggerPath: this.configService.get<string>('app.swaggerPath'),
    };
  }

  getDatabaseConfig() {
    return {
      location: this.configService.get<string>('database.location'),
      seedData: this.configService.get<boolean>('database.seedData'),
      type: this.configService.get<string>('database.type'),
      host: this.configService.get<string>('database.host'),
      port: this.configService.get<number>('database.port'),
      username: this.configService.get<string>('database.username'),
      password: this.configService.get<string>('database.password'),
      databaseName: this.configService.get<string>('database.databaseName'),
      synchronize: this.configService.get<boolean>('database.synchronize'),
    };
  }

  getJwtConfig() {
    return {
      accessTokenKey: this.configService.get<string>('jwt.accessTokenKey'),
      refreshTokenKey: this.configService.get<string>('jwt.refreshTokenKey'),
      secret: this.configService.get<string>('jwt.secret'),
    };
  }

  getFilesConfig() {
    return {
      destination: this.configService.get<string>('files.destination'),
    };
  }

  getEmailConfig() {
    return {
      host: this.configService.get<string>('email.host'),
      port: this.configService.get<number>('email.port'),
      username: this.configService.get<string>('email.username'),
      password: this.configService.get<string>('email.password'),
      secure: this.configService.get<boolean>('email.secure'),
      from: this.configService.get<string>('email.from'),
    };
  }
}
