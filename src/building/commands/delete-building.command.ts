import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { BuildingService } from "../building.service";

export class DeleteBuildingCommand {
  constructor(
    public readonly id: number,
  ) {

  }
}

@CommandHandler(DeleteBuildingCommand)
export class DeleteBuildingHandler implements ICommandHandler<DeleteBuildingCommand> {
  constructor(
    private readonly buildingService: BuildingService,
  ) {

  }

  async execute(execution: DeleteBuildingCommand): Promise<number> {
    const { id } = execution;
    await this.buildingService.remove(id);
    return id;
  }
}