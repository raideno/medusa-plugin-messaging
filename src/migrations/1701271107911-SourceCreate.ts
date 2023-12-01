import { MigrationInterface, QueryRunner } from "typeorm";

export class SourceCreate1701271107911 implements MigrationInterface {
    name = 'SourceCreate1701271107911'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "medusa_plugin_messaging_source" (
                "id" character varying NOT NULL,
                
                "name" character varying NOT NULL DEFAULT 'untitled',
                "channelId" character varying NOT NULL,
                "handlerId" character varying DEFAULT 'default-handler',
                "context" character varying NOT NULL,
                "externalId" character varying,
                
                "metadata" jsonb,

                "version" integer NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP,

                CONSTRAINT "PK_9498ac59e89020a4023938e5fd4" PRIMARY KEY ("id")
            )
        `);


        await queryRunner.query(`
            ALTER TABLE "medusa_plugin_messaging_source" ADD CONSTRAINT "FK_7508a2e0c133683268ef3aec691" FOREIGN KEY ("channelId") REFERENCES "medusa_plugin_messaging_channel"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "medusa_plugin_messaging_source" DROP CONSTRAINT "FK_7508a2e0c133683268ef3aec691"`);

        await queryRunner.query(`DROP TABLE "medusa_plugin_messaging_source"`);
    }

}
