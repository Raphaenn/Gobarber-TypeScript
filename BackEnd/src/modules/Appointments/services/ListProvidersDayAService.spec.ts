import AppError from "@shared/errors/AppError";

import FakeAppointmentsRepo from "@modules/Appointments/repositories/fakes/fakeAppointmentsRepo";
import ListProvidersDayAService from "./ListProvidersDayAService";

let fakeAppointmentsRepo: FakeAppointmentsRepo;
let listProvidersDayAService: ListProvidersDayAService;

describe('ListDayAvailability', () => {
    beforeEach(() => {
        fakeAppointmentsRepo = new FakeAppointmentsRepo();
        listProvidersDayAService = new ListProvidersDayAService(fakeAppointmentsRepo);
    });

    it('Should be abre to list the day availabiity from provider', async () => {
        await fakeAppointmentsRepo.create({
            provider_id: 'user',
            user_id: '23123',
            date: new Date(2020, 6, 28, 11, 0, 0)
        });
        
        await fakeAppointmentsRepo.create({
            provider_id: 'user',
            user_id: '23123',
            date: new Date(2020, 6, 28, 12, 0, 0)
        });

        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 6, 28, 10).getTime()
        })

        const availabiity = await listProvidersDayAService.execute({
            provider_id: 'user',
            year: 2020,
            month: 7,
            day: 28
        });

        expect(availabiity).toEqual(expect.arrayContaining([
            { hour: 8, available: false },
            { hour: 9, available: false },
            { hour: 10, available: false },
            { hour: 11, available: false },
            { hour: 12, available: false },
            { hour: 13, available: true },
        ]))

    })
})