import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";

export class GetTreeLocationFilter {
  @ApiProperty({
    minimum: 0,
    format: 'int32',
    default: 2
  })
  @Transform((param) => Number(param.value))
  depth: number;

  constructor() {
    this.depth = 2;
  }
}