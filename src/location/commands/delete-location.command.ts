import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { common } from "src/utils/common";
import { LocationService } from "../location.service";

export class DeleteLocationCommand {
  constructor(
    public readonly id: number,
  ) {

  }
}

@CommandHandler(DeleteLocationCommand)
export class DeleteLocationHandler implements ICommandHandler<DeleteLocationCommand> {
  constructor(
    private readonly locationService: LocationService,
  ) {

  }

  async execute(execution: DeleteLocationCommand): Promise<number> {
    const { id } = execution;
    await this.locationService.remove(id);
    return id;
  }
}