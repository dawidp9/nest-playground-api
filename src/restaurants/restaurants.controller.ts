import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Put,
  Post,
  Delete,
} from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { Restaurants } from '../dto/restaurants/restaurants';
import { Restaurant } from '../dto/restaurants/restaurant';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Get()
  async getAll(): Promise<Restaurants> {
    return this.restaurantsService.findAll();
  }

  @Get(':id')
  async getById(@Param('id') id: number): Promise<Restaurant> {
    if (!+id) throw new BadRequestException('Invalid id param');

    return this.restaurantsService.findById(+id);
  }

  @Post()
  async create(@Body() restaurant: Restaurant): Promise<Restaurant> {
    return this.restaurantsService.create(restaurant);
  }

  @Put()
  async update(@Body() restaurant: Restaurant): Promise<Restaurant> {
    return this.restaurantsService.update(restaurant);
  }

  @Delete(':id')
  async deleteById(@Param('id') id: number): Promise<boolean> {
    if (!+id) throw new BadRequestException('Invalid id param');

    this.restaurantsService.delete(+id);
    return true;
  }
}
