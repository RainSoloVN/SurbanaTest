import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { common } from "src/utils/common";
import { Location } from "../entities/location.entity";
import { LocationService } from "../location.service";
import { UpdateLocationDto } from "../dto/update-location.dto";

export class UpdateLocationCommand {
  constructor(
    public readonly id: number,
    public readonly dto: UpdateLocationDto,
  ) {

  }
}

@CommandHandler(UpdateLocationCommand)
export class UpdateLocationHandler implements ICommandHandler<UpdateLocationCommand> {
  constructor(
    private readonly locationService: LocationService,
  ) {

  }

  async execute(execution: UpdateLocationCommand): Promise<Location> {
    const { id, dto } = execution;
    return this.locationService.update(id, dto);
  }
}