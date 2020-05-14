import {MigrationInterface, QueryRunner} from "typeorm";

export class Migracao31589223556787 implements MigrationInterface {
    name = 'Migracao31589223556787'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_details" ALTER COLUMN "name" DROP NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "user_details" ALTER COLUMN "lastname" DROP NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "user_details" ALTER COLUMN "create_at" DROP NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "user_details" ALTER COLUMN "create_up" DROP NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_details" ALTER COLUMN "create_up" SET NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "user_details" ALTER COLUMN "create_at" SET NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "user_details" ALTER COLUMN "lastname" SET NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "user_details" ALTER COLUMN "name" SET NOT NULL`, undefined);
    }

}
