import { Body, Controller, Get, Header, HttpCode, Param, Post, Req } from '@nestjs/common';
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
