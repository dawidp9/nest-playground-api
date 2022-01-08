import { Injectable, NotFoundException } from '@nestjs/common';
import { Restaurants } from '../dto/restaurants/restaurants';
import { Restaurant } from '../dto/restaurants/restaurant';

@Injectable()
export class RestaurantsService {
  private readonly restaurants: Restaurants = {};

  findAll(): Restaurants {
    return this.restaurants;
  }

  create(restaurant: Restaurant): Restaurant {
    const id = Date.now();
    this.restaurants[id] = { ...restaurant, id };

    return this.restaurants[id];
  }

  findById(id: number): Restaurant {
    const restaurant: Restaurant = this.restaurants[id];
    if (!restaurant)
      throw new NotFoundException('Restaurant with this id do not exist');

    return restaurant;
  }

  update(restaurant: Restaurant): Restaurant {
    if (!this.restaurants[restaurant.id])
      throw new NotFoundException('Restaurant with this id do not exist');

    this.restaurants[restaurant.id] = restaurant;
    return this.restaurants[restaurant.id];
  }

  delete(id: number) {
    if (!this.restaurants[id])
      throw new NotFoundException('Restaurant with this id do not exist');

    delete this.restaurants[id];
  }
}
