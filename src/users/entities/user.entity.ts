import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  password: string;

  @Column()
  createdAt: Date;
}
