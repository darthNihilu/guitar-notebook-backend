import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SongEntity } from 'src/song/song.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SongService {
  constructor(
    @InjectRepository(SongEntity)
    private songRepository: Repository<SongEntity>,
  ) {}

  findAll(): Promise<SongEntity[]> {
    return this.songRepository.find();
  }

  findSpecificSong(id: number): Promise<SongEntity> {
    return this.songRepository.findOne({ where: { id } });
  }

  addSong(data: Omit<SongEntity, 'id'>): Promise<SongEntity> {
    return this.songRepository.save(this.songRepository.create(data));
  }

  deleteSong(id: number) {
    return this.songRepository.delete(id);
  }

  async updateSong(
    id: number,
    data: Partial<SongEntity>,
  ): Promise<SongEntity | null> {
    const task = await this.songRepository.findOne({ where: { id } });

    if (!task) {
      return null; // Task not found
    }

    const updatedTask = { ...task, ...data };
    return this.songRepository.save(updatedTask);
  }
}
