import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { Location } from './entities/location.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateLocationHandler } from './commands/create-location.command';
import { UpdateLocationHandler } from './commands/update-location.command';
import { DeleteLocationHandler } from './commands/delete-location.command';
import { GetAllLocationHandler } from './queries/get-all-location.query';
import { GetOneLocationHandler } from './queries/get-one-location.query';
import { CqrsModule } from '@nestjs/cqrs';
import { Building } from 'src/building/entities/building.entity';
import { GetTreeLocationHandler } from './queries/get-tree-location.query';
import { GetRootLocationHandler } from './queries/get-root-location.query';

const CommandHandlers = [
  CreateLocationHandler,
  UpdateLocationHandler,
  DeleteLocationHandler,
];

const QueryHandlers = [
  GetAllLocationHandler,
  GetOneLocationHandler,
  GetTreeLocationHandler,
  GetRootLocationHandler,
]

@Module({
  imports: [
    TypeOrmModule.forFeature([Building, Location]),
    CqrsModule,
  ],
  controllers: [LocationController],
  providers: [
    LocationService,
    ...QueryHandlers,
    ...CommandHandlers,
  ],
  exports: [
    LocationService,
    ...QueryHandlers,
    ...CommandHandlers,
  ]
})
export class LocationModule {}
