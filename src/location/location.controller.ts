import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { ApiTags } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateLocationCommand } from './commands/create-location.command';
import { GetAllLocationQuery } from './queries/get-all-location.query';
import { GetOneLocationQuery } from './queries/get-one-location.query';
import { GetOneLocationFilter } from './filters/get-one-location.filter';
import { UpdateLocationCommand } from './commands/update-location.command';
import { DeleteLocationCommand } from './commands/delete-location.command';
import { GetTreeLocationQuery } from './queries/get-tree-location.query';
import { GetTreeLocationFilter } from './filters/get-tree-location.filter';
import { GetAllLocationFilter } from './filters/get-all-location.filter';
import { GetRootLocationFilter } from './filters/get-root-location.filter';
import { GetRootLocationQuery } from './queries/get-root-location.query';

@ApiTags('location')
@Controller('location')
export class LocationController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  /**
   * Post decorator represents method of request as we have used post decorator the method
   * of this API will be post.
   * so the API URL to create Building will be
   * POST http://localhost:6482/location
   */
  @Post()
  create(@Body() createLocationDto: CreateLocationDto) {
    return this.commandBus.execute<CreateLocationCommand, Location>(
      new CreateLocationCommand(createLocationDto));
  }

  /**
   * we have used get decorator to get all the location's list
   * so the API URL will be
   * GET http://localhost:6482/location
   */
  @Get()
  findAll(@Query() filter: GetAllLocationFilter) {
    return this.queryBus.execute<GetAllLocationQuery, Location>(
      new GetAllLocationQuery(filter));
  }

  /**
   * we have used get decorator with id param to get id from request
   * so the API URL will be
   * GET http://localhost:6482/location/detail/:id
   */
  @Get('detail/:id')
  findOne(@Param('id') id: string) {
    const filter = new GetOneLocationFilter(Number(id));
    return this.queryBus.execute<GetOneLocationQuery, Location>(new GetOneLocationQuery(filter));
  }

  /**
   * we have used get decorator to get all the location's roots
   * so the API URL will be
   * GET http://localhost:6482/location/root
   */
  @Get(`root`)
  @UsePipes(new ValidationPipe({ transform: true }))
  findRoot(@Query() filter: GetRootLocationFilter) {
    return this.queryBus.execute<GetRootLocationQuery, Location[]>(
      new GetRootLocationQuery(filter));
  }

  /**
   * we have used get decorator to get all the location's tree
   * so the API URL will be
   * GET http://localhost:6482/location/tree
   */
  @Get(`tree`)
  @UsePipes(new ValidationPipe({ transform: true }))
  findTree(@Query() filter: GetTreeLocationFilter) {
    return this.queryBus.execute<GetTreeLocationQuery, Location[]>(
      new GetTreeLocationQuery(filter));
  }

  /**
   * we have used patch decorator with id param to get id from request
   * so the API URL will be
   * PATCH http://localhost:6482/location/:id
   */
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLocationDto: UpdateLocationDto) {
    return this.commandBus.execute<UpdateLocationCommand, Location>(
      new UpdateLocationCommand(Number(id), updateLocationDto));
  }

  /**
   * we have used Delete decorator with id param to get id from request
   * so the API URL will be
   * DELETE http://localhost:6482/location/:id
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commandBus.execute<DeleteLocationCommand, Location>(
      new DeleteLocationCommand(Number(id)));
  }
}
