import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { SurveyModule } from './survey/survey.module';
import { config } from 'dotenv';

config();
@Module({
  imports: [
    RestaurantsModule,
    AuthModule,
    UsersModule,
    SurveyModule,
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
        synchronize: process.env.NODE_ENV != 'production',
        autoLoadEntities: true,
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
