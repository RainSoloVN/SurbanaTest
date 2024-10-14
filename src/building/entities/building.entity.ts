import { BaseEntity } from "src/utils/entities/base-entity";
import { Column, Entity, OneToMany } from "typeorm";
import { Location } from 'src/location/entities/location.entity';

@Entity()
export class Building extends BaseEntity {
  @Column({ type: 'varchar', length: 200, nullable: false })
  name: string;

  @OneToMany((type) => Location, (location) => location.building, { nullable: true })
  locations!: Location[]
}
