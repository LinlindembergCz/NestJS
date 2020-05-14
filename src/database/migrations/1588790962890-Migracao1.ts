import {MigrationInterface, QueryRunner} from "typeorm";

export class Migracao11588790962890 implements MigrationInterface {
    name = 'Migracao11588790962890'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "permissions" ("id" SERIAL NOT NULL, "description" character varying(100) NOT NULL, "create_at" TIMESTAMP NOT NULL, "create_up" TIMESTAMP NOT NULL, CONSTRAINT "UQ_94b0c1df9c647ac7f26e989318a" UNIQUE ("description"), CONSTRAINT "PK_920331560282b8bd21bb02290df" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "user_details" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, "lastname" character varying NOT NULL, "cpf" character varying, "status" character varying(8) NOT NULL DEFAULT 'Active', "create_at" TIMESTAMP NOT NULL, "create_up" TIMESTAMP NOT NULL, CONSTRAINT "UQ_0824512eb9ccb661310daa1601b" UNIQUE ("name"), CONSTRAINT "PK_fb08394d3f499b9e441cab9ca51" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "username" character varying(25) NOT NULL, "password" character varying(15) NOT NULL, "status" character varying(8) NOT NULL DEFAULT 'Active', "create_at" TIMESTAMP NOT NULL, "create_up" TIMESTAMP NOT NULL, "detail_id" integer NOT NULL, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "REL_9fc134ca20766e165ad650ee74" UNIQUE ("detail_id"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "roles" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "description" character varying(100) NOT NULL, "create_at" TIMESTAMP NOT NULL, "create_up" TIMESTAMP NOT NULL, CONSTRAINT "UQ_648e3f5447f725579d7d4ffdfb7" UNIQUE ("name"), CONSTRAINT "UQ_6521db71370e3fecb07064ce930" UNIQUE ("description"), CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "user_roles" ("usersId" integer NOT NULL, "rolesId" integer NOT NULL, CONSTRAINT "PK_38ffcfb865fc628fa337d9a0d4f" PRIMARY KEY ("usersId", "rolesId"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_99b019339f52c63ae615358738" ON "user_roles" ("usersId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_13380e7efec83468d73fc37938" ON "user_roles" ("rolesId") `, undefined);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_9fc134ca20766e165ad650ee740" FOREIGN KEY ("detail_id") REFERENCES "user_details"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "user_roles" ADD CONSTRAINT "FK_99b019339f52c63ae6153587380" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "user_roles" ADD CONSTRAINT "FK_13380e7efec83468d73fc37938e" FOREIGN KEY ("rolesId") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_roles" DROP CONSTRAINT "FK_13380e7efec83468d73fc37938e"`, undefined);
        await queryRunner.query(`ALTER TABLE "user_roles" DROP CONSTRAINT "FK_99b019339f52c63ae6153587380"`, undefined);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_9fc134ca20766e165ad650ee740"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_13380e7efec83468d73fc37938"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_99b019339f52c63ae615358738"`, undefined);
        await queryRunner.query(`DROP TABLE "user_roles"`, undefined);
        await queryRunner.query(`DROP TABLE "roles"`, undefined);
        await queryRunner.query(`DROP TABLE "users"`, undefined);
        await queryRunner.query(`DROP TABLE "user_details"`, undefined);
        await queryRunner.query(`DROP TABLE "permissions"`, undefined);
    }

}
