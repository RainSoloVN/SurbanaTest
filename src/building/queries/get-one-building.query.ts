import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { Building } from "../entities/building.entity";
import { GetOneBuildingFilter } from "../filters/get-one-builder.filter";
import { BuildingService } from "../building.service";

export class GetOneBuildingQuery {
  constructor(
    public readonly filter: GetOneBuildingFilter,
  ) {

  }
}

@QueryHandler(GetOneBuildingQuery)
export class GetOneBuildingHandler implements IQueryHandler<GetOneBuildingQuery> {
  constructor(
    private readonly buildingService: BuildingService,
  ) {

  }

  async execute(execution: GetOneBuildingQuery): Promise<Building> {
    const { filter } = execution;

    const building = await this.buildingService.findOne(filter.id);

    if(!building) {
      throw new Error(`These is not valid building`);
    }

    return building;
  }
}