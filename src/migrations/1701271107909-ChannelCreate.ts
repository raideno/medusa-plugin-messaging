import { MigrationInterface, QueryRunner } from "typeorm";

export class ChannelCreate1701271107909 implements MigrationInterface {
    name = 'ChannelCreate1701271107909'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "medusa_plugin_messaging_channel" (
                "id" character varying NOT NULL,
                
                "customerId" character varying NOT NULL,
                
                "metadata" jsonb,
                
                "version" integer NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP,
                
                CONSTRAINT "UQ_1f05926126a2237dcddb44ace43" UNIQUE ("customerId"),
                CONSTRAINT "PK_5791a1079a32274853a994cfa29" PRIMARY KEY ("id")
            )
        `);

        await queryRunner.query(
            `ALTER TABLE "medusa_plugin_messaging_channel" ADD CONSTRAINT "FK_dqd494ghiouy49eacdqdf49hgfv" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "medusa_plugin_messaging_channel" DROP CONSTRAINT "FK_dqd494ghiouy49eacdqdf49hgfv"`);

        await queryRunner.query(`DROP TABLE "medusa_plugin_messaging_channel"`);
    }

}
