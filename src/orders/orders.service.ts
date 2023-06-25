import { Injectable } from '@nestjs/common';
import { OrderStatus } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private prismaService: PrismaService) {}

  all(filter: { asset_id: string }) {
    return this.prismaService.order.findMany({
      where: {
        asset_id: filter.asset_id,
      },
      include: {
        Asset: {
          select: {
            id: true,
            symbol: true,
          },
        },
      },
    });
  }

  create(input: { asset_id: string; price: number }) {
    return this.prismaService.order.create({
      data: {
        asset_id: input.asset_id,
        price: input.price,
        status: OrderStatus.PENDING,
      },
    });
  }
}
