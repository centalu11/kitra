import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Treasure } from "./Treasure";

@Entity("money_values")
export class MoneyValue {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Treasure, (treasure) => treasure.id)
  @JoinColumn({ name: "treasure_id" })
  treasure: Treasure | number;

  @Column()
  amt: number;
}
