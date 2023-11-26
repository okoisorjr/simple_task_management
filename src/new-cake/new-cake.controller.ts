import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { NewCakeService } from './new-cake.service';
import { CreateNewCakeDto } from './dto/create-new-cake.dto';
import { UpdateNewCakeDto } from './dto/update-new-cake.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';

//@UseGuards(AuthGuard('jwt'))
@Controller('yvette_baker/api/v1/cakes')
export class NewCakeController {
  constructor(private readonly newCakeService: NewCakeService) {}

  @Post('new-cake')
  create(@Body() createNewCakeDto: CreateNewCakeDto) {
    return this.newCakeService.create(createNewCakeDto);
  }

  @Post('upload-image')
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    return this.newCakeService.uploadImage(
      file.originalname,
      file.mimetype,
      file.buffer,
    );
  }

  @Get()
  findAll() {
    return this.newCakeService.findAll();
  }

  @Get(':category')
  findOne(@Param('category') category: string) {
    return this.newCakeService.findOne(category);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNewCakeDto: UpdateNewCakeDto) {
    return this.newCakeService.update(+id, updateNewCakeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.newCakeService.remove(+id);
  }
}
