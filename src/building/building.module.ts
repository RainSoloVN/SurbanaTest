import { Module } from '@nestjs/common';
import { BuildingService } from './building.service';
import { BuildingController } from './building.controller';
import { Building } from './entities/building.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GetAllBuildingHandler } from './queries/get-all-building.query';
import { GetOneBuildingHandler } from './queries/get-one-building.query';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateBuildingHandler } from './commands/create-building.command';
import { UpdateBuildingHandler } from './commands/update-bullding.command';
import { DeleteBuildingHandler } from './commands/delete-building.command';

const CommandHandlers = [
  CreateBuildingHandler,
  UpdateBuildingHandler,
  DeleteBuildingHandler,
];

const QueryHandlers = [
  GetAllBuildingHandler,
  GetOneBuildingHandler,
]

@Module({
  imports: [
    TypeOrmModule.forFeature([Building]),
    CqrsModule,
  ],
  controllers: [BuildingController],
  providers: [
    BuildingService,
    ...QueryHandlers,
    ...CommandHandlers,
  ],
  exports: [
    ...QueryHandlers,
    ...CommandHandlers,
  ]
})
export class BuildingModule {}
