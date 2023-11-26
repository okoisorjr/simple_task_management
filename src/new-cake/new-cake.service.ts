import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateNewCakeDto } from './dto/create-new-cake.dto';
import { UpdateNewCakeDto } from './dto/update-new-cake.dto';
import {
  S3Client,
  PutObjectCommand,
  PutObjectCommandOutput,
} from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Cake } from './entities/new-cake.entity';
import * as mongoose from 'mongoose';

@Injectable()
export class NewCakeService {
  private readonly s3Client = new S3Client({
    region: this.configService.getOrThrow('AWS_S3_REGION'),
  });

  constructor(
    private readonly configService: ConfigService,
    @InjectModel(Cake.name)
    private readonly cakeModel: mongoose.Model<Cake>,
  ) {}

  AWS_S3_BUCKET = 'dial-a-cake';

  async create(createNewCakeDto: CreateNewCakeDto) {
    try {
      const cake = await this.cakeModel.create(createNewCakeDto);
      return cake;
    } catch (error) {
      throw new HttpException(
        'Oops something went wrong!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async uploadImage(filename: string, filetype: string, file: Buffer) {
    const key = filename + Date.now();
    let fileURL: PutObjectCommandOutput;
    try {
      fileURL = await this.s3Client.send(
        new PutObjectCommand({
          Bucket: this.AWS_S3_BUCKET,
          Key: key,
          Body: file,
          ACL: 'public-read',
          ContentType: filetype,
        }),
      );
    } catch (err) {
      console.log(err);
      return err;
    }

    if (fileURL.$metadata.httpStatusCode !== 200) {
      throw new HttpException(
        'FILE WAS NOT SAVED TO BUCKET!',
        HttpStatus.EXPECTATION_FAILED,
      );
    }

    return {
      id: `https://${this.AWS_S3_BUCKET}.s3.amazonaws.com/${key}`,
    };
  }

  async findAll() {
    const cakes = await this.cakeModel.find();
    return cakes;
  }

  async findOne(category: string): Promise<Cake[]> {
    const cakes = await this.cakeModel.find({ category: category });
    return cakes;
  }

  update(id: number, updateNewCakeDto: UpdateNewCakeDto) {
    return `This action updates a #${id} newCake`;
  }

  remove(id: number) {
    return `This action removes a #${id} newCake`;
  }
}
