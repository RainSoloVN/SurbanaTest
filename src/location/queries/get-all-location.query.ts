import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { Location } from "../entities/location.entity";
import { LocationService } from "../location.service";
import { GetAllLocationFilter } from "../filters/get-all-location.filter";

export class GetAllLocationQuery {
  constructor(
    public readonly filter: GetAllLocationFilter,
  ) {

  }
}

@QueryHandler(GetAllLocationQuery)
export class GetAllLocationHandler implements IQueryHandler<GetAllLocationQuery> {
  constructor(
    private readonly locationService: LocationService,
  ) {

  }

  async execute(execution: GetAllLocationQuery): Promise<Location[]> {
    const { filter } = execution;
    return this.locationService.findAll(filter);
  }
}