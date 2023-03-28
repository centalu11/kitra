import dataSource from "../data-source";
import { SeederInterface } from "./SeederInterface";
import { UserSeeder } from "./UserSeeder";
import { TreasureSeeder } from "./TreasureSeeder";
import { MoneyValueSeeder } from "./MoneyValueSeeder";

const seeders = [
  new UserSeeder(),
  new TreasureSeeder(),
  new MoneyValueSeeder(),
];

const runSeeders = async () => {
  for (let index = 0; index < seeders.length; index++) {
    const seeder: SeederInterface = seeders[index];

    console.log("\r\nSeeding " + seeder.name + " table");
    try {
      await seeder.run();
      console.log(seeder.name + " table successfuly seeded");
    } catch (error: any) {
      console.log("Error while running " + seeder.name + " seeder", error);
    }
  }
};

dataSource
  .initialize()
  .then(async () => {
    console.log("Data Source has been initialized");

    await runSeeders();

    process.exit();
  })
  .catch((error) => {
    console.log("Error during Data Source initialization during", error);
    process.exit();
  });
