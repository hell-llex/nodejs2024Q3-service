import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { loadApiSpec } from './swagger.util';
import { LoggingService } from './logging/logging.service';
import { ILogger } from './logging/logger.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.useGlobalPipes(new ValidationPipe());
  const apiSpec = loadApiSpec();
  const config = new DocumentBuilder()
    .setTitle(apiSpec.info.title)
    .setDescription(apiSpec.info.description)
    .setVersion(apiSpec.info.version)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  Object.assign(document, {
    components: apiSpec.components,
    paths: apiSpec.paths,
  });
  SwaggerModule.setup('doc', app, document, {
    swaggerOptions: {
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
  });

  // const logger = app.get(LoggingService);
  // process.on('uncaughtException', (error) => {
  //   logger.log('error', 'Uncaught Exception', { error });
  //   process.exit(1);
  // });
  // process.on('unhandledRejection', (reason) => {
  //   logger.log('error', 'Unhandled Rejection', { reason });
  // });

  const logger = app.get(LoggingService);

  process.on('uncaughtException', (error) => {
    logger.error('Uncaught Exception', {
      error: error.message,
      stack: error.stack,
    });
    process.exit(1);
  });

  process.on('unhandledRejection', (reason) => {
    logger.error('Unhandled Rejection', { reason });
  });

  const port = configService.get<number>('PORT') || 4000;
  await app.listen(port, () => {
    console.log(`Application is running on: http://localhost:${port}`);
  });
}
bootstrap();
