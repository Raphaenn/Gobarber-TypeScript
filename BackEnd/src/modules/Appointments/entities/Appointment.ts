// Conceito de entidade / model é usado sempre que vamos usar dados que vao ser armazenados na aplicação
// Arquivo usado para descrever uma appointment
// Responsavel pela formatacão dos dados

import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";

import UserModel from "../../Users/entities/UserModel";

@Entity('appointments')
class AppointmentModel {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    provider_id: string;

    // Parte de relacionamento entre users and appointments
    @ManyToOne(() => UserModel)
    @JoinColumn({ name: 'provider_id' })
    provider: UserModel;

    @Column('timestamp with time zone')
    date: Date;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
};

export default AppointmentModel;
