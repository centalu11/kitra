import { MigrationInterface, QueryRunner } from "typeorm";

export class generatedMigration1680034921244 implements MigrationInterface {
    name = 'generatedMigration1680034921244'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`treasures\` (\`id\` int NOT NULL AUTO_INCREMENT, \`latitude\` varchar(255) NOT NULL, \`longitude\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`money_values\` (\`id\` int NOT NULL AUTO_INCREMENT, \`amt\` int NOT NULL, \`treasure_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`age\` int NOT NULL, \`password\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`money_values\` ADD CONSTRAINT \`FK_9d324c9102885a309079979da15\` FOREIGN KEY (\`treasure_id\`) REFERENCES \`treasures\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`money_values\` DROP FOREIGN KEY \`FK_9d324c9102885a309079979da15\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`money_values\``);
        await queryRunner.query(`DROP TABLE \`treasures\``);
    }

}
