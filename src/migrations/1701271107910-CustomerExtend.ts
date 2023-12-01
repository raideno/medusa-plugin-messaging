import { MigrationInterface, QueryRunner } from "typeorm";

export class CustomerExtend1701271107910 implements MigrationInterface {
    name = 'CustomerExtend1701271107910'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "customer" ADD COLUMN "channelId" character varying
        `);

        await queryRunner.query(
            `ALTER TABLE "customer" ADD CONSTRAINT "FK_47dsfsaa4khplpa474dq1616nc8" FOREIGN KEY ("channelId") REFERENCES "medusa_plugin_messaging_channel"("id") ON DELETE SET NULL ON UPDATE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customer" DROP CONSTRAINT "FK_47dsfsaa4khplpa474dq1616nc8"`);

        await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "channelId"`);
    }

}
