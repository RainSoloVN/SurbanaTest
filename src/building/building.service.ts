import { Injectable } from '@nestjs/common';
import { CreateBuildingDto } from './dto/create-building.dto';
import { UpdateBuildingDto } from './dto/update-building.dto';
import { Building } from './entities/building.entity';
import { common } from 'src/utils/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetAllBuildingFilter } from './filters/get-all-building.filter';

@Injectable()
export class BuildingService {
  constructor(
    @InjectRepository(Building) private readonly buildingRepository: Repository<Building>,
  ) {
    
  }

  // Find function
  findAll(filter: GetAllBuildingFilter): Promise<Building[]> {
    return this.buildingRepository.find({ where: filter });
  }

  findOne(id: number): Promise<Building> {
    return this.buildingRepository.findOneBy({ id });
  }

  // Modify function
  create(createBuildingDto: CreateBuildingDto): Promise<Building> {
    const dateNow = common.dateNow();

    const building: Building = new Building();

    building.name = createBuildingDto.name;
    building.createDate = dateNow;

    return this.buildingRepository.save(building);
  }

  async update(id: number, updateBuildingDto: UpdateBuildingDto): Promise<Building> {
    const dateNow = common.dateNow();

    let building = await this.buildingRepository.findOne({ where: { id: id } });
    if (!building) {
      throw new Error('Building not found.');
    }

    building.name = updateBuildingDto.name;
    building.updateDate = dateNow;

    return this.buildingRepository.save(building);
  }

  async remove(id: number): Promise<number> {
    const building = await this.buildingRepository.findOne({ where: { id: id }, relations: ['locations'] });
    
    if (!building) {
      throw new Error('Building not found');
    }

    if (building.locations && building.locations.length > 0) {
      throw new Error('Cannot delete building with locations. Handle locations first.');
    }

    await this.buildingRepository.delete(id);
    return id;
  }
}
