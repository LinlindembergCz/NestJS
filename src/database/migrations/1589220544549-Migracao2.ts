import {MigrationInterface, QueryRunner} from "typeorm";

export class Migracao21589220544549 implements MigrationInterface {
    name = 'Migracao21589220544549'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "create_at" SET DEFAULT now()`, undefined);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "create_up" SET DEFAULT now()`, undefined);
        await queryRunner.query(`ALTER TABLE "roles" ALTER COLUMN "create_at" SET DEFAULT now()`, undefined);
        await queryRunner.query(`ALTER TABLE "roles" ALTER COLUMN "create_up" SET DEFAULT now()`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "roles" ALTER COLUMN "create_up" DROP DEFAULT`, undefined);
        await queryRunner.query(`ALTER TABLE "roles" ALTER COLUMN "create_at" DROP DEFAULT`, undefined);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "create_up" DROP DEFAULT`, undefined);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "create_at" DROP DEFAULT`, undefined);
    }

}
