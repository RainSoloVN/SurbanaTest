import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Building } from "../entities/building.entity";
import { BuildingService } from "../building.service";
import { UpdateBuildingDto } from "../dto/update-building.dto";

export class UpdateBuildingCommand {
  constructor(
    public readonly id: number,
    public readonly dto: UpdateBuildingDto,
  ) {

  }
}

@CommandHandler(UpdateBuildingCommand)
export class UpdateBuildingHandler implements ICommandHandler<UpdateBuildingCommand> {
  constructor(
    private readonly buildingService: BuildingService,
  ) {

  }

  async execute(execution: UpdateBuildingCommand): Promise<Building> {
    const { id, dto } = execution;
    return this.buildingService.update(id, dto);
  }
}