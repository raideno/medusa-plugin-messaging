import { MigrationInterface, QueryRunner } from "typeorm";

export class MessageCreate1701271107912 implements MigrationInterface {
    name = 'MessageCreate1701271107912'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TYPE "public"."medusa_plugin_messaging_message_authortype_enum" 
            AS ENUM(
                'SYSTEM',
                'STAFF',
                'AUTOMATIC',
                'CUSTOMER',
                'UNKNOWN'
            )
        `);

        await queryRunner.query(`
            CREATE TABLE "medusa_plugin_messaging_message" (
                "id" character varying NOT NULL,
                "content" character varying NOT NULL,
                "sourceId" character varying NOT NULL,
                "metadata" jsonb,
                
                "authorType" "public"."medusa_plugin_messaging_message_authortype_enum" NOT NULL DEFAULT 'UNKNOWN',
                "authorUserId" character varying,
                "authorName" character varying,
                "authorDescription" character varying,
                "authorAvatarurl" character varying,

                "version" integer NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP, 

                CONSTRAINT "PK_d47576d20b4567fdd8a447e4d59" PRIMARY KEY ("id")
            )
        `);

        await queryRunner.query(`
            ALTER TABLE "medusa_plugin_messaging_message" ADD CONSTRAINT "FK_gdhgf47884da1651dsqujioopa8" FOREIGN KEY ("sourceId") REFERENCES "medusa_plugin_messaging_source"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);

        await queryRunner.query(`
            ALTER TABLE "medusa_plugin_messaging_message" ADD CONSTRAINT "FK_dsq494ghjegz489bda4984dshtf" FOREIGN KEY ("authorUserId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE SET NULL
        `);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "medusa_plugin_messaging_message" DROP CONSTRAINT "FK_gdhgf47884da1651dsqujioopa8"`);

        await queryRunner.query(`ALTER TABLE "medusa_plugin_messaging_message" DROP CONSTRAINT "FK_dsq494ghjegz489bda4984dshtf"`);

        await queryRunner.query(`DROP TABLE "medusa_plugin_messaging_message"`);

        await queryRunner.query(`DROP TYPE "public"."medusa_plugin_messaging_message_authortype_enum"`);
    }

}
