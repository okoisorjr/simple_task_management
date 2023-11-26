import { PartialType } from '@nestjs/mapped-types';
import { CreateNewCakeDto } from './create-new-cake.dto';

export class UpdateNewCakeDto extends PartialType(CreateNewCakeDto) {}
