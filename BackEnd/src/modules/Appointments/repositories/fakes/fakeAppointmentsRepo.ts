import { uuid } from "uuidv4";
import { getMonth, getDate, getYear, isEqual } from "date-fns";
import AppointmentModel from "@modules/Appointments/infra/typeorm/entities/Appointment";
import IAppointmentsRepo from "@modules/Appointments/repositories/IAppointmentsRepo";
import ICreateAppointmentDTO from "@modules/Appointments/dtos/ICreateAppointmentDTO";
import IFindAllInMonthDTO from "@modules/Appointments/dtos/IFindAllInMonthDTO";
import IFindAllInDayDTO from "@modules/Appointments/dtos/IFindAllInDayDTO";

class FakeAppointmentsRepo implements IAppointmentsRepo{

    private appointmentsArray: AppointmentModel[] = [];

    public async findAllInDay({provider_id, month, year, day}: IFindAllInDayDTO): Promise<AppointmentModel[]> {
        const appointments = this.appointmentsArray.filter(appt => appt.provider_id === provider_id && getMonth(appt.date) + 1 === month && getYear(appt.date) === year && getDate(appt.date) === day);

            return appointments
    };

    public async findAllInMonth({provider_id, month, year}: IFindAllInMonthDTO): Promise<AppointmentModel[]> {
        const appointments = this.appointmentsArray.filter(appt => appt.provider_id === provider_id && getMonth(appt.date) + 1 === month && getYear(appt.date) === year);

            return appointments
    };

    public async findByDate(date: Date): Promise<AppointmentModel | undefined> {
        const findAppointment = this.appointmentsArray.find(appt => 
            isEqual(appt.date, date));

            return findAppointment
    };

    public async create({ date, provider_id }: ICreateAppointmentDTO): Promise<AppointmentModel> {
        const appointment = new AppointmentModel();

        Object.assign(appointment, { id: uuid(), date, provider_id });

        this.appointmentsArray.push(appointment)

        return appointment
    }
};

export default FakeAppointmentsRepo;

