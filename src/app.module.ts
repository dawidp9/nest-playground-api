import { Module } from '@nestjs/common';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [RestaurantsModule, AuthModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
