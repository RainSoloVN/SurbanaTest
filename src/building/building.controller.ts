import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CreateBuildingDto } from './dto/create-building.dto';
import { UpdateBuildingDto } from './dto/update-building.dto';
import { ApiTags } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetAllBuildingQuery } from './queries/get-all-building.query';
import { Building } from './entities/building.entity';
import { GetOneBuildingQuery } from './queries/get-one-building.query';
import { GetOneBuildingFilter } from './filters/get-one-builder.filter';
import { GetAllBuildingFilter } from './filters/get-all-building.filter';
import { CreateBuildingCommand } from './commands/create-building.command';
import { UpdateBuildingCommand } from './commands/update-bullding.command';
import { DeleteBuildingCommand } from './commands/delete-building.command';

@ApiTags('building')
@Controller('building')
export class BuildingController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  /**
   * Post decorator represents method of request as we have used post decorator the method
   * of this API will be post.
   * so the API URL to create Building will be
   * POST http://localhost:6482/building
   */
   @Post()
   create(@Body() createBuildingDto: CreateBuildingDto) {
    return this.commandBus.execute<CreateBuildingCommand, Building>(
      new CreateBuildingCommand(createBuildingDto));
   }

  /**
   * we have used get decorator to get all the building's list
   * so the API URL will be
   * GET http://localhost:6482/building
   */
  @Get()
  findAll(@Query() filter: GetAllBuildingFilter) {
    return this.queryBus.execute<GetAllBuildingQuery, Building[]>(new GetAllBuildingQuery(filter));
  }

  /**
   * we have used get decorator with id param to get id from request
   * so the API URL will be
   * GET http://localhost:6482/building/detail/:id
   */
  @Get('detail/:id')
  findOne(@Param('id') id: string) {
    const filter = new GetOneBuildingFilter(Number(id));
    return this.queryBus.execute<GetAllBuildingQuery, Building>(new GetOneBuildingQuery(filter));
  }

  /**
   * we have used patch decorator with id param to get id from request
   * so the API URL will be
   * PATCH http://localhost:6482/building/:id
   */
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBuildingDto: UpdateBuildingDto) {
    return this.commandBus.execute<UpdateBuildingCommand, Building>(
      new UpdateBuildingCommand(Number(id), updateBuildingDto));
  }

  /**
   * we have used Delete decorator with id param to get id from request
   * so the API URL will be
   * DELETE http://localhost:6482/building/:id
   */
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.commandBus.execute<DeleteBuildingCommand, Building>(
      new DeleteBuildingCommand(Number(id)));
  }
}
