import { IsNotEmpty } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity('veicule')
@Unique(['plate'])
export class Veicule {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty({ message: 'Placa é obrigatória' })
  @Column()
  plate: string;

  @Column()
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  proprietary: string;

  @Column()
  @IsNotEmpty({ message: 'Cor é obrigatória' })
  color: string;

  @Column()
  @IsNotEmpty({ message: 'Fabricante é obrigatória' })
  fabricant: string;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'createDate',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createDate: string;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'updateDate',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  updateDate: string;
}
