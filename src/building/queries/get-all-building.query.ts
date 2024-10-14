import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { Building } from "../entities/building.entity";
import { GetAllBuildingFilter } from "../filters/get-all-building.filter";
import { BuildingService } from "../building.service";

export class GetAllBuildingQuery {
  constructor(
    public readonly filter: GetAllBuildingFilter,
  ) {

  }
}

@QueryHandler(GetAllBuildingQuery)
export class GetAllBuildingHandler implements IQueryHandler<GetAllBuildingQuery> {
  constructor(
    private readonly buildingService: BuildingService,
  ) {

  }

  async execute(execution: GetAllBuildingQuery): Promise<Building[]> {
    const { filter } = execution;
    return this.buildingService.findAll(filter);
  }
}