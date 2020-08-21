import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { environment } from './environment';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    if (environment.NODE_ENV !== 'production') {
        app.enableCors();
    }

    app.setGlobalPrefix('api');
    app.useGlobalPipes(new ValidationPipe());

    await app.listen(environment.PORT);
}

bootstrap();
