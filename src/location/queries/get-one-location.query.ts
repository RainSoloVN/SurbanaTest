import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { Location } from "../entities/location.entity";
import { LocationService } from "../location.service";
import { GetOneLocationFilter } from "../filters/get-one-location.filter";

export class GetOneLocationQuery {
  constructor(
    public readonly filter: GetOneLocationFilter,
  ) {

  }
}

@QueryHandler(GetOneLocationQuery)
export class GetOneLocationHandler implements IQueryHandler<GetOneLocationQuery> {
  constructor(
    private readonly locationService: LocationService,
  ) {

  }

  async execute(execution: GetOneLocationQuery): Promise<Location> {
    const { filter } = execution;

    const location = await this.locationService.findOne(filter.id);

    if(!location) {
      throw new Error(`These is not valid location`);
    }

    return location;
  }
}