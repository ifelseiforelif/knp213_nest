import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
  Redirect,
} from '@nestjs/common';

//http://localhost:PORT/api/product/16?title=tv
@Controller('api')
export class AppController {
  //@HttpCode(203)
  //@Redirect('https://google.com')
  @Get('product/:id')
  getInfo(
    @Param('id') id: string,
    @Query('title') title: string,
  ): { message: string; id: number; title: string } {
    // const id = Number(id);
    const new_id = Number(id);
    if (isNaN(new_id))
      throw new BadRequestException('id неможливо привести до Number');
    return {
      message: 'Hello From Nest',
      title,
      id: new_id,
    };
  }

  @Post('product')
  createProduct(@Body() productDto: { id: number; title: string }) {
    return productDto;
  }
}
