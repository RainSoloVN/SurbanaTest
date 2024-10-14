import { Building } from "src/building/entities/building.entity";
import { BaseEntity } from "src/utils/entities/base-entity";
import { Column, Entity, JoinColumn, ManyToOne, Tree, TreeChildren, TreeParent } from "typeorm";

@Entity()
@Tree("closure-table")
export class Location extends BaseEntity {
  @Column({ type: 'varchar', length: 200, nullable: false })
  code: string;

  @Column({ type: 'varchar', length: 200, nullable: false })
  name: string;

  @Column({ nullable: true })
  area: number

  @Column({ type: 'number', nullable: true })
  buildingId: number;

  @ManyToOne((type) => Building, (building) => building.locations, { nullable: true })
  @JoinColumn({ name: 'buildingId' })
  building!: Building

  @TreeChildren()
  children!: Location[]

  @TreeParent()
  parent!: Location

  path!: string;
}
