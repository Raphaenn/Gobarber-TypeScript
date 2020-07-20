// Conceito de entidade / model é usado sempre que vamos usar dados que vao ser armazenados na aplicação
// Arquivo usado para descrever uma appointment
// Responsavel pela formatacão dos dados

import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity('appointments')
class AppointmentModel {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    provider: string;

    @Column('timestamp with time zone')
    date: Date;
};

export default AppointmentModel;
