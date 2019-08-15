import { Controller, Get, Header, HttpCode, Post, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('cats')
export class CatsController {
  @Post()
  @HttpCode(204) // Custom status code
  @Header('Cache-Control', 'none')
  create(): string {
    return 'This action adds a new cat';
  }

  @Get()
  findAll(@Req() request: Request): string {
    return 'This action returns all cats';
  }

  @Get('ab*cd')
  findAllWild() {
    return 'This route uses a wildcard';
  }
}
