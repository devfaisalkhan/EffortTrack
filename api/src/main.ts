import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, ClassSerializerInterceptor } from '@nestjs/common';
import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { AppConstant } from './shared/app.constant';
import { CustomConfigurationService } from './shared/config/configuration.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const confgiSvc = app.get(CustomConfigurationService);

  app.useGlobalPipes(new ValidationPipe({ forbidNonWhitelisted: true }));

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  app.enableCors();

  app.setGlobalPrefix(AppConstant.ROUTE_PREFIX);

  const config = new DocumentBuilder()
    .setTitle(confgiSvc.getAppConfig().name)
    .setDescription('The API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(
    confgiSvc.getAppConfig().swaggerPath,
    app,
    documentFactory,
  );

  const uploadDir = join(process.cwd(), '_uploads');
  if (!existsSync(uploadDir)) {
    mkdirSync(uploadDir);
  }

  await app.listen(confgiSvc.getAppConfig().localPort);

  console.log(`app running on ${confgiSvc.getAppConfig().localPort}`);
  console.log(
    `To test api endpoints go to http://localhost:${confgiSvc.getAppConfig().localPort}/${confgiSvc.getAppConfig().swaggerPath}`,
  );
}
bootstrap();