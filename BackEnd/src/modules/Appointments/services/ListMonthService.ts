import { injectable, inject } from "tsyringe";
import { getDaysInMonth, getDate } from "date-fns";

import IAppointmentsRepo from "../repositories/IAppointmentsRepo";

interface IRequest {
    provider_id: string;
    month: number;
    year: number;
}

// Transformar o interface em uma array
type IResponse = Array<{
    day: number;
    available: boolean;
}>;

@injectable()
class ListMonthService {

    constructor(
        @inject("AppointmentsRepo")
        private appointmentsRepository: IAppointmentsRepo
    ) {};

    public async execute({ provider_id, month, year }: IRequest): Promise<IResponse> {
        const appointments = await this.appointmentsRepository.findAllInMonth({
            provider_id,
            month,
            year
        });

        // numeros de dias do mes atual desse ano
        const numberDaysInMonth = getDaysInMonth(new Date(year, month -1));
        // Criar array [1, 2, 3, 4... até o ultimo dia do mês atual]
        const eachDayArray = Array.from(
            {length: numberDaysInMonth},
            (value, index) => index + 1,
        );

        const availability = eachDayArray.map(day => {
            const appointmentsInDay = appointments.filter(appt => {
                return getDate(appt.date) === day
            });
            return {
                day,
                available: appointmentsInDay.length < 10,
            }
        })

        return availability;
    }

}

export default ListMonthService;