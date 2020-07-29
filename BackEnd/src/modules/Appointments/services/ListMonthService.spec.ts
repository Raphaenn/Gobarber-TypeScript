import AppError from "@shared/errors/AppError";

import FakeAppointmentsRepo from "@modules/Appointments/repositories/fakes/fakeAppointmentsRepo";
import ListMonthService from "./ListMonthService";

let fakeAppointmentsRepo: FakeAppointmentsRepo;
let listMonthService: ListMonthService;

describe('ListMonthAvailability', () => {
    beforeEach(() => {
        fakeAppointmentsRepo = new FakeAppointmentsRepo();
        listMonthService = new ListMonthService(fakeAppointmentsRepo);
    });

    it('Should be abre to list the month availabiity from provider', async () => {
        await fakeAppointmentsRepo.create({
            provider_id: 'user',
            user_id: '23123',
            date: new Date(2020, 6, 27, 8, 0, 0)
        });

        await fakeAppointmentsRepo.create({
            provider_id: 'user',
            user_id: '23123',
            date: new Date(2020, 6, 27, 9, 0, 0)
        });

        await fakeAppointmentsRepo.create({
            provider_id: 'user',
            user_id: '23123',
            date: new Date(2020, 6, 27, 10, 0, 0)
        });

        await fakeAppointmentsRepo.create({
            provider_id: 'user',
            user_id: '23123',
            date: new Date(2020, 6, 27, 11, 0, 0)
        });

        await fakeAppointmentsRepo.create({
            provider_id: 'user',
            user_id: '23123',
            date: new Date(2020, 6, 27, 12, 0, 0)
        });

        await fakeAppointmentsRepo.create({
            provider_id: 'user',
            user_id: '23123',
            date: new Date(2020, 6, 27, 13, 0, 0)
        });

        await fakeAppointmentsRepo.create({
            provider_id: 'user',
            user_id: '23123',
            date: new Date(2020, 6, 27, 14, 0, 0)
        });

        await fakeAppointmentsRepo.create({
            provider_id: 'user',
            user_id: '23123',
            date: new Date(2020, 6, 27, 15, 0, 0)
        });

        await fakeAppointmentsRepo.create({
            provider_id: 'user',
            user_id: '23123',
            date: new Date(2020, 6, 27, 16, 0, 0)
        });

        await fakeAppointmentsRepo.create({
            provider_id: 'user',
            user_id: '23123',
            date: new Date(2020, 6, 27, 17, 0, 0)
        });

        await fakeAppointmentsRepo.create({
            provider_id: 'user',
            user_id: '23123',
            date: new Date(2020, 6, 28, 8, 0, 0)
        });

        const availabiity = await listMonthService.execute({
            provider_id: 'user',
            year: 2020,
            month: 7
        });

        expect(availabiity).toEqual(expect.arrayContaining([
            { day: 27, available: false },
            { day: 28, available: true },
        ]))

    })
})