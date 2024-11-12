import { Column, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'todos',
  timestamps: false,
})
export class Todo extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    allowNull: false,
  })
  title: string;
  
  @Column({
    allowNull: false,
  })
  description: string;
}
