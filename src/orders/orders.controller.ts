import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('api/orders/:asset_id')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  all(@Param('asset_id') asset_id: string) {
    return this.ordersService.all({ asset_id });
  }

  @Post()
  create(@Param('asset_id') asset_id: string, @Body() body: { price: number }) {
    return this.ordersService.create({
      asset_id,
      ...body,
    });
  }
}
