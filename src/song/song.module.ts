import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SongController } from 'src/song/song.controller';
import { SongEntity } from 'src/song/song.entity';
import { SongService } from 'src/song/song.service';

@Module({
  imports: [TypeOrmModule.forFeature([SongEntity])],
  providers: [SongService],
  controllers: [SongController],
})
export class SongModule {}
