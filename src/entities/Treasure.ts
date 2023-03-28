import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { MoneyValue } from "./MoneyValue";

@Entity("treasures")
export class Treasure {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => MoneyValue, (moneyValues) => moneyValues.treasure)
  money_values: MoneyValue[];

  @Column()
  latitude: string;

  @Column()
  longitude: string;

  @Column()
  name: string;
}
