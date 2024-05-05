import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SongEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;
}
