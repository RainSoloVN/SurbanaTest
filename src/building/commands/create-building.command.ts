import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateBuildingDto } from "../dto/create-building.dto";
import { Building } from "../entities/building.entity";
import { BuildingService } from "../building.service";

export class CreateBuildingCommand {
  constructor(
    public readonly dto: CreateBuildingDto,
  ) {

  }
}

@CommandHandler(CreateBuildingCommand)
export class CreateBuildingHandler implements ICommandHandler<CreateBuildingCommand> {
  constructor(
    private readonly buildingService: BuildingService,
  ) {

  }

  async execute(execution: CreateBuildingCommand): Promise<Building> {
    const { dto } = execution;
    return this.buildingService.create(dto);
  }
}