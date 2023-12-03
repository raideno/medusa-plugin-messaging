import { MigrationInterface, QueryRunner } from "typeorm";

export class NoteCreate1701271107913 implements MigrationInterface {
    name = 'NoteCreate1701271107913'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "medusa_plugin_messaging_note" (
                "id" character varying NOT NULL,
                "authorId" character varying NOT NULL,
                "content" character varying NOT NULL,
                "title" character varying NOT NULL DEFAULT "untitled",
                "metadata" jsonb,
                "targetId" character varying NOT NULL,
                "version" integer NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP,
                "parentId" character varying,
                CONSTRAINT "PK_536230d231711ee77854ea430ed" PRIMARY KEY ("id")
            )
        `);

        await queryRunner.query(`
            CREATE TABLE "medusa_plugin_messaging_note_closure"(
                "id_ancestor" character varying NOT NULL,
                "id_descendant" character varying NOT NULL,
                CONSTRAINT "PK_6ee0230d6e80350883843d4ed87" PRIMARY KEY ("id_ancestor", "id_descendant")
            )
        `);

        await queryRunner.query(`
            CREATE INDEX "IDX_c9cf7a5d86081b7c78b1dbfbee" ON "medusa_plugin_messaging_note_closure" ("id_ancestor")
        `);

        await queryRunner.query(`
            CREATE INDEX "IDX_7c368ee7f70543527856f90a71" ON "medusa_plugin_messaging_note_closure" ("id_descendant")
        `);

        await queryRunner.query(
            `ALTER TABLE "medusa_plugin_messaging_note" ADD CONSTRAINT "FK_10e0d8bc0022435d3c7663f4983" FOREIGN KEY ("parentId") REFERENCES "medusa_plugin_messaging_note"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);

        await queryRunner.query(
            `ALTER TABLE "medusa_plugin_messaging_note" ADD CONSTRAINT "FK_dsqdq49498g4qqgfd4hdg4fafav" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);

        /**ERROR FROM HERE */
        // await queryRunner.query(
        //     `ALTER TABLE "medusa_plugin_messaging_note" ADD CONSTRAINT "FK_644468cfcba85488b9b915c244d" FOREIGN KEY ("targetId") REFERENCES "medusa_plugin_messaging_channel"("id") ON DELETE CASCADE ON UPDATE CASCADE
        // `);

        // await queryRunner.query(
        //     `ALTER TABLE "medusa_plugin_messaging_note" ADD CONSTRAINT "FK_644468cfcba85488b9b915c244d" FOREIGN KEY ("targetId") REFERENCES "medusa_plugin_messaging_source"("id") ON DELETE CASCADE ON UPDATE CASCADE
        // `);

        // await queryRunner.query(
        //     `ALTER TABLE "medusa_plugin_messaging_note" ADD CONSTRAINT "FK_644468cfcba85488b9b915c244d" FOREIGN KEY ("targetId") REFERENCES "medusa_plugin_messaging_message"("id") ON DELETE CASCADE ON UPDATE CASCADE
        // `);
        /**ERROR TO HERE */

        await queryRunner.query(
            `ALTER TABLE "medusa_plugin_messaging_note_closure" ADD CONSTRAINT "FK_c9cf7a5d86081b7c78b1dbfbeef" FOREIGN KEY ("id_ancestor") REFERENCES "medusa_plugin_messaging_note"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);

        await queryRunner.query(
            `ALTER TABLE "medusa_plugin_messaging_note_closure" ADD CONSTRAINT "FK_7c368ee7f70543527856f90a71b" FOREIGN KEY ("id_descendant") REFERENCES "medusa_plugin_messaging_note"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "medusa_plugin_messaging_note_closure" DROP CONSTRAINT "FK_7c368ee7f70543527856f90a71b"`);

        await queryRunner.query(`ALTER TABLE "medusa_plugin_messaging_note_closure" DROP CONSTRAINT "FK_dsqdq49498g4qqgfd4hdg4fafav"`);

        await queryRunner.query(`ALTER TABLE "medusa_plugin_messaging_note_closure" DROP CONSTRAINT "FK_c9cf7a5d86081b7c78b1dbfbeef"`);

        await queryRunner.query(`ALTER TABLE "medusa_plugin_messaging_note" DROP CONSTRAINT "FK_644468cfcba85488b9b915c244d"`);

        await queryRunner.query(`ALTER TABLE "medusa_plugin_messaging_note" DROP CONSTRAINT "FK_644468cfcba85488b9b915c244d"`);

        await queryRunner.query(`ALTER TABLE "medusa_plugin_messaging_note" DROP CONSTRAINT "FK_644468cfcba85488b9b915c244d"`);

        await queryRunner.query(`ALTER TABLE "medusa_plugin_messaging_note" DROP CONSTRAINT "FK_10e0d8bc0022435d3c7663f4983"`);

        await queryRunner.query(`DROP INDEX "public"."IDX_7c368ee7f70543527856f90a71"`);

        await queryRunner.query(`DROP INDEX "public"."IDX_c9cf7a5d86081b7c78b1dbfbee"`);

        await queryRunner.query(`DROP TABLE "medusa_plugin_messaging_note_closure"`);

        await queryRunner.query(`DROP TABLE "medusa_plugin_messaging_note"`);
    }

}
