// Arquivo de interface

import AppointmentModel from "../infra/typeorm/entities/Appointment";
import ICreateAppointmentDTO from "../dtos/ICreateAppointmentDTO";
import IFindAllInMonthDTO from "../dtos/IFindAllInMonthDTO";
import IFindAllInDayDTO from "../dtos/IFindAllInDayDTO";


export default interface IAppointmentsRepo {
    create(data: ICreateAppointmentDTO): Promise<AppointmentModel>;
    findByDate(date: Date): Promise<AppointmentModel | undefined>;
    findAllInMonth(data: IFindAllInMonthDTO): Promise<AppointmentModel[]>;
    findAllInDay(data: IFindAllInDayDTO): Promise<AppointmentModel[]>
}