import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Sequelize } from 'sequelize-typescript';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Apply global pipes
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
  }));

  // Get the ConfigService
  const configService = app.get(ConfigService);

  // Get the Sequelize instance
  const sequelize = app.get(Sequelize);

  try {
    // Test the database connection
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  // Get the port from configuration, or use a default
  const port = configService.get('PORT') || 3000;
  
  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();