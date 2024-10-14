import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { Location } from "../entities/location.entity";
import { LocationService } from "../location.service";
import { GetTreeLocationFilter } from "../filters/get-tree-location.filter";

export class GetTreeLocationQuery {
  constructor(
    public readonly filter: GetTreeLocationFilter,
  ) {

  }
}

@QueryHandler(GetTreeLocationQuery)
export class GetTreeLocationHandler implements IQueryHandler<GetTreeLocationQuery> {
  constructor(
    private readonly locationService: LocationService,
  ) {

  }

  async execute(execution: GetTreeLocationQuery): Promise<Location[]> {
    const { filter } = execution;
    return this.locationService.findTree(filter);
  }
}