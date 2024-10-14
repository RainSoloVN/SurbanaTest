import { Column, PrimaryGeneratedColumn } from "typeorm";

export class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamptz', nullable: true })
  createDate!: Date;

  @Column({ type: 'timestamptz', nullable: true })
  updateDate!: Date;
}