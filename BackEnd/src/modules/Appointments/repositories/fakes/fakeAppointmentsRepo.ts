import { uuid } from "uuidv4";
import AppointmentModel from "@modules/Appointments/infra/typeorm/entities/Appointment";
import IAppointmentsRepo from "@modules/Appointments/repositories/IAppointmentsRepo";
import ICreateAppointmentDTO from "@modules/Appointments/dtos/ICreateAppointmentDTO";

class AppointmentsRepo implements IAppointmentsRepo{

    private appointmentsArray: AppointmentModel[] = [];

    public async findByDate(date: Date): Promise<AppointmentModel | undefined> {
        const findAppointment = this.appointmentsArray.find(appt => 
            appt.date === date);

            return findAppointment
    };

    public async create({ date, provider_id }: ICreateAppointmentDTO): Promise<AppointmentModel> {
        const appointment = new AppointmentModel();

        Object.assign(appointment, { id: uuid(), date, provider_id });

        this.appointmentsArray.push(appointment)

        return appointment
    }
};

export default AppointmentsRepo;

