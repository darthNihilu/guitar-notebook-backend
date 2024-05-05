import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { SongEntity } from 'src/song/song.entity';
import { SongService } from 'src/song/song.service';
import returnAsJson from 'src/utils';

@Controller('song')
export class SongController {
  constructor(private readonly songService: SongService) {}

  @Get()
  async findAll(): Promise<string> {
    const allItems = await this.songService.findAll();
    return returnAsJson(allItems);
  }

  @Get('/:id')
  async findSpecificSong(@Param('id') id: number): Promise<SongEntity> {
    const foundSong = await this.songService.findSpecificSong(id);
    return returnAsJson(foundSong);
  }

  @Post()
  async addTask(@Body() data: Omit<SongEntity, 'id'>): Promise<string> {
    const newSong = await this.songService.addSong(data);
    return returnAsJson(newSong);
  }

  @Delete('/:id')
  async deleteTask(@Param('id') id: number): Promise<string> {
    const allItems = await this.songService.deleteSong(id);
    return returnAsJson(allItems);
  }

  @Patch('/:id')
  async updateTask(
    @Param('id') id: number,
    @Body() data: Partial<SongEntity>,
  ): Promise<string> {
    const updatedSong = await this.songService.updateSong(id, data);

    if (updatedSong === null) {
      return 'Song not found'; // You can customize the error response
    }

    return returnAsJson(updatedSong);
  }
}
