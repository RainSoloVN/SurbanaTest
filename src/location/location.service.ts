import { Injectable } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { Location } from './entities/location.entity';
import { common } from 'src/utils/common';
import { Building } from 'src/building/entities/building.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, TreeRepository } from 'typeorm';
import { GetAllLocationFilter } from './filters/get-all-location.filter';
import { GetTreeLocationFilter } from './filters/get-tree-location.filter';
import { GetRootLocationFilter } from './filters/get-root-location.filter';

@Injectable()
export class LocationService {

  constructor(
    @InjectRepository(Location) private readonly locationRepository: TreeRepository<Location>,
    @InjectRepository(Building) private readonly buildingRepository: Repository<Building>,
  ) {
    
  }

  // Find function
  async findAll(filter: GetAllLocationFilter): Promise<Location[]> {
    const locations = await this.locationRepository.find({ where: filter, relations: ['building'], order: {
      building: {
        name: 'ASC'
      },
      id: 'asc',
    }});

    if(locations && locations.length) {
      for(const item of locations) {
        const parents = await this.locationRepository.findAncestors(item);
        item.path = `${item.building.name}-${parents.map(a => a.code).join('-')}`;
        item.building = undefined;
      }
    }

    return locations;
  }

  findOne(id: number) {
    return this.locationRepository.findOneBy({ id });
  }

  findRoots(filter: GetRootLocationFilter): Promise<Location[]> {
    return this.locationRepository.findRoots();
  }

  findTree(filter: GetTreeLocationFilter): Promise<Location[]> {
    const { depth } = filter;
    return this.locationRepository.findTrees({ depth: depth });
  }

  // Modify Function
  async create(createLocationDto: CreateLocationDto) {
    const dateNow = common.dateNow();

    let location = new Location();
    location.code = createLocationDto.code.trim();
    location.name = createLocationDto.name.trim();
    location.area = createLocationDto.area || 0;
    location.createDate = dateNow;
    location.id = null;

    location = await this.setBuilding(location, createLocationDto.buildingId);
    location = await this.setParentLocation(location, createLocationDto.parentId);

    return this.locationRepository.save(location);
  }
  // A cha của B, B cha của C, C là cha của D
  // update A có parent là D
  async update(id: number, updateLocationDto: UpdateLocationDto): Promise<Location> {
    const dateNow = common.dateNow();

    let location = await this.locationRepository.findOne({ where: { id: id } });
    if (!location) {
      throw new Error('Location not found.');
    }

    location.code = updateLocationDto.code.trim();
    location.name = updateLocationDto.name.trim();
    location.area = updateLocationDto.area || 0;
    location.updateDate = dateNow;

    location = await this.setBuilding(location, updateLocationDto.buildingId);
    location = await this.setParentLocation(location, updateLocationDto.parentId);

    return this.locationRepository.save(location);
  }

  async remove(id: number) {
    const location = await this.locationRepository.findOne({ where: { id: id }, relations: ['children'] });
    
    if (!location) {
      throw new Error('Location not found');
    }

    if (location.children && location.children.length > 0) {
      throw new Error('Cannot delete location with children. Handle children first.');
    }

    await this.locationRepository.remove(location);
  }

  // Private
  setBuilding = async (location: Location, buildingId: number): Promise<Location> => {
    if(buildingId) {
      const building = await this.buildingRepository.findOne({ where: { id: buildingId } });
      if (!building) {
        throw new Error('Building not found');
      }
      location.building = building;
    } else {
      location.building = null;
    }

    return location;
  }

  setParentLocation = async (location: Location, parentId: number): Promise<Location> => {
    if (parentId) {
      const parent = await this.locationRepository.findOne({ where: { id: parentId } });
      if (!parent) {
        throw new Error('Parent location not found');
      }

      // const ancestors = await this.locationRepository.findAncestors(location);
      // const isAncestor = ancestors.find(a => a.id == parent.id);
      
      // if(isAncestor) {
      //   throw new Error('The parenId is not valid. It was a ancestor bafore');
      // }

      const ancestors: Location[] = [];
      await this.findAncestors(location, ancestors);

      const isAncestor = ancestors?.find(a => a.id == parent.id);
      
      if(isAncestor) {
        throw new Error('The parenId is not valid. It was a ancestor bafore');
      }

      location.parent = parent;
    } else {
      location.parent = null;
    }

    return location;
  }

  findAncestors = async(location: Location, ancestors: Location[]) => {
    if(location && location.parent) {
      ancestors.push(location.parent);
      this.findAncestors(location.parent, ancestors);
    }
  }
}
