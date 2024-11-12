import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Todo } from './entities/todo.entity';

@Module({
  controllers: [TodoController],
  providers: [TodoService],
  imports:[SequelizeModule.forFeature([Todo])]
})
export class TodoModule {}
