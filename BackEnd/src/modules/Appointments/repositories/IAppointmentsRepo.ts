// Arquivo de interface

import AppointmentModel from "../infra/typeorm/entities/Appointment";
import ICreateAppointmentDTO from "../dtos/ICreateAppointmentDTO";

export default interface IAppointmentsRepo {
    create(data: ICreateAppointmentDTO): Promise<AppointmentModel>;
    findByDate(date: Date): Promise<AppointmentModel | undefined>;
}