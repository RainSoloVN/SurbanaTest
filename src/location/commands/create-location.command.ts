import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateLocationDto } from "../dto/create-location.dto";
import { common } from "src/utils/common";
import { Location } from "../entities/location.entity";
import { LocationService } from "../location.service";

export class CreateLocationCommand {
  constructor(
    public readonly dto: CreateLocationDto,
  ) {

  }
}

@CommandHandler(CreateLocationCommand)
export class CreateLocationHandler implements ICommandHandler<CreateLocationCommand> {
  constructor(
    private readonly locationService: LocationService,
  ) {

  }

  async execute(execution: CreateLocationCommand): Promise<Location> {
    const { dto } = execution;
    return this.locationService.create(dto);
  }
}