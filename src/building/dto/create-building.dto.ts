import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateBuildingDto {
  @IsString()
  @MinLength(1, { message: 'Name must have at least 1 characters.' })
  @MaxLength(200, { message: 'Name must have at longest 200 characters.' })
  @IsNotEmpty()
  name: string;
}
