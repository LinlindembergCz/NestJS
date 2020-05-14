import {MigrationInterface, QueryRunner} from "typeorm";

export class Migracao41589393259618 implements MigrationInterface {
    name = 'Migracao41589393259618'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "email" character varying(100)`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "email"`, undefined);
    }

}
