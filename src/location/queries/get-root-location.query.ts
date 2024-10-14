import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { Location } from "../entities/location.entity";
import { LocationService } from "../location.service";
import { GetRootLocationFilter } from "../filters/get-root-location.filter";

export class GetRootLocationQuery {
  constructor(
    public readonly filter: GetRootLocationFilter,
  ) {

  }
}

@QueryHandler(GetRootLocationQuery)
export class GetRootLocationHandler implements IQueryHandler<GetRootLocationQuery> {
  constructor(
    private readonly locationService: LocationService,
  ) {

  }

  async execute(execution: GetRootLocationQuery): Promise<Location[]> {
    const { filter } = execution;
    return this.locationService.findRoots(filter);
  }
}