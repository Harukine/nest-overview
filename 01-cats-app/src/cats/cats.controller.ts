import { Body, Controller, ForbiddenException, Get, Header, HttpCode, HttpException, HttpStatus, Param, Post, Req, UseFilters } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cats.interface';
import { HttpExceptionFilter } from '../common/filters/http-exception.filter';

@Controller('cats')
// @UseFilters(new HttpExceptionFilter()) // Controller-scoped filter
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  @HttpCode(204) // Custom status code
  @Header('Cache-Control', 'none')
  // @UseFilters(new HttpExceptionFilter()) // Created an instance of Custom Exception Filter
  // @UseFilters(HttpExceptionFilter) // Passing a Class of Custom Exeption Filter enabling dependency injection
  async create(@Body() createCatDto: CreateCatDto) {
    // throw new ForbiddenException();
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
