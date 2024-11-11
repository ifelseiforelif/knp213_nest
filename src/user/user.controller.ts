import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Redirect,
  Req,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { UserService } from './user.service';
import { UserPipe } from './user.pipe';
import { UserCreateDto } from './dto/user-create.dto';
import { AuthGuard } from 'src/auth/auth.guard';

//http://localhost:PORT/api/product/16?title=tv
@Controller('api')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //@UsePipes(new ValidationPipe())
  //@UseGuards(AuthGuard)
  @Post('user') //POST http://localhost:3333/api/user
  createUser(@Body() user: UserCreateDto) {
    return user;
  }

  @Header('X-Powered-By', 'Secret')
  @Get()
  simple() {
    return this.userService.getData();
  }

  //@HttpCode(HttpStatus.RESET_CONTENT)
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

  // GET http://loclahost:3333/api/test/3
  @Get('test/:id')
  getTest(
    @Req() req: Request<{ id: string }>,
    @Res() res: Response<{ message: string }>,
  ) {
    res.send({ message: req.params.id });
  }

  //GET http://loclahost:3333/api/:id?title=data
  @Get(':id')
  getDataFromPipe(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
    @Query('title', UserPipe) title: string,
  ): string {
    return `Id: ${id} Title: ${title}`;
  }
}
