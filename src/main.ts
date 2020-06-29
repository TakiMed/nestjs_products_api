import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ValidationPipe, ValidationError } from '@nestjs/common';
import { FallbackExceptionFilter } from './products/filters/fallback.filter';
import { HttpExceptionFilter } from './products/filters/http.filter';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationFilter } from './products/filters/validation.filter';
import { ValidationException } from './products/filters/validation.exception';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ProductsModule } from './products/products.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  // swagger products setup
  const prodOptions = new DocumentBuilder()
    .setTitle('API')
    .setDescription('Test products')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'jwt',
      },
      'jwt',
    )
    .build();

  const document = SwaggerModule.createDocument(app, prodOptions);
  SwaggerModule.setup('api', app, document);

  app.useGlobalFilters(
    new FallbackExceptionFilter(),
    new HttpExceptionFilter(),
    new ValidationFilter(),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      skipMissingProperties: true,
      exceptionFactory: (errors: ValidationError[]) => {
        const messages = errors.map(
          error => `${error.property} has wrong value${error.value},
        ${Object.values(error.constraints).join(', ')}`,
        );
        return new ValidationException(messages);
      },
    }),
  );
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
