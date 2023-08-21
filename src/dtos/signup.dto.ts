import { IsNotEmpty, IsString } from 'class-validator';

export class SignUpDto {
  @IsNotEmpty({message: 'All fields are required!'})
  @IsString()
  username: string;

  @IsNotEmpty({message: 'All fields are required!'})
  @IsString()
  avatar: string;
}