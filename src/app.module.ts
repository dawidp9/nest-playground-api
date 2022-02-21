import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { NewsletterModule } from './newsletter/newsletter.module';
import { config } from 'dotenv';

config();
@Module({
  imports: [
    AuthModule,
    UsersModule,
    NewsletterModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useFactory: async () => ({
        url: process.env.DATABASE_URL,
        type: 'postgres',
        ssl:
          process.env.NODE_ENV == 'development'
            ? false
            : {
                rejectUnauthorized: false,
              },
        entities: ['dist/**/*.entity{.ts,.js}'],
        synchronize: true,
        autoLoadEntities: true,
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
