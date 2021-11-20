"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const fallback_filter_1 = require("./products/filters/fallback.filter");
const http_filter_1 = require("./products/filters/http.filter");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const validation_filter_1 = require("./products/filters/validation.filter");
const validation_exception_1 = require("./products/filters/validation.exception");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('api');
    const prodOptions = new swagger_1.DocumentBuilder()
        .setTitle('API')
        .setDescription('Test products')
        .setVersion('1.0')
        .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'jwt',
    }, 'jwt')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, prodOptions);
    swagger_1.SwaggerModule.setup('api', app, document);
    app.useGlobalFilters(new fallback_filter_1.FallbackExceptionFilter(), new http_filter_1.HttpExceptionFilter(), new validation_filter_1.ValidationFilter());
    app.useGlobalPipes(new common_1.ValidationPipe({
        skipMissingProperties: true,
        exceptionFactory: (errors) => {
            const messages = errors.map(error => `${error.property} has wrong value${error.value},
        ${Object.values(error.constraints).join(', ')}`);
            return new validation_exception_1.ValidationException(messages);
        },
    }));
    app.enableCors();
    await app.listen(process.env.PORT || 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map