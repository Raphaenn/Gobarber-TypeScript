import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";
import { query } from "express";

export class AddUserIdAppointments1596038433359 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('appointments', new TableColumn({
            name: 'user_id',
            type: 'uuid',
            isNullable: true,
        }));

        await queryRunner.createForeignKey('appointments', new TableForeignKey({
            name: 'AppointmentsUser',
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('appointments', 'AppointmentsUser');

        await queryRunner.dropColumn('appointments', 'user_id')
    }

}
