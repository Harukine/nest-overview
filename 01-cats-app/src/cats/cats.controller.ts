import { Body, Controller, Get, Header, HttpCode, HttpException, HttpStatus, Param, Post, Req } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cats.interface';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  @HttpCode(204) // Custom status code
  @Header('Cache-Control', 'none')
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    // throw new HttpException('Forbidden', HttpStatus.FORBIDDEN); // hard coded throw
    return this.catsService.findAll();
  }

  @Get(':id')
  findOne(@Param() params): string {
    // console.log(params.id);
    return `This action returns a #${params.id} cat`;
  }

  @Get('ab*cd')
  findAllWild() {
    return 'This route uses a wildcard';
  }
}
