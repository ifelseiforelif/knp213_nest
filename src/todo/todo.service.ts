import { Injectable, Scope } from '@nestjs/common';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable({ scope: Scope.TRANSIENT })
export class TodoService {
  constructor(@InjectModel(Todo) private readonly todo: typeof Todo) {}
  async create(createTodoDto: any) {
    const user = await this.todo.create(createTodoDto);
    return user;
  }

  async findAll() {
    const todos = await this.todo.findAll();
    return todos;
  }

  async findOne(id: number) {
    const todo = await this.todo.findByPk(id);
    return todo;
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    const todo = await this.todo.update(updateTodoDto, { where: { id } });
    return { ...updateTodoDto, id };
  }

  async remove(id: number) {
    await this.todo.destroy({ where: { id } });
    return `This action removes a #${id} todo`;
  }
}
