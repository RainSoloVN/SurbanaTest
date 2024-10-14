import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, Min, MinLength, ValidateIf } from "class-validator";

export class CreateLocationDto {
  @IsString()
  @MinLength(2, { message: 'The code must be at least 2 characters long.' })
  @MaxLength(200, { message: 'The code cannot exceed 200 characters.' })
  @IsNotEmpty()
  code: string;

  @IsString()
  @MinLength(2, { message: 'The name must be at least 2 characters long.' })
  @MaxLength(200, { message: 'The name cannot exceed 200 characters.' })
  @IsNotEmpty()
  name: string;

  @IsInt()
  @IsNotEmpty()
  @Min(1, { message: 'Building ID must be valid.' })
  buildingId: number | null;

  @IsInt()
  @IsOptional()
  parentId?: number | null;

  @IsInt()
  @IsOptional()
  area?: number | null;
}
