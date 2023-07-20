import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class ArtWorks extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    photo!: string;

    @Column()
    title!: string;

    @Column()
    creator!: string;

    @Column("varchar", { length: 1000 })
    description!: string;

    @Column()
    visible!: string;
}