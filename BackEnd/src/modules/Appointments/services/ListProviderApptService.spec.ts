import AppError from "@shared/errors/AppError";

import FakeAppointmentsRepo from "@modules/Appointments/repositories/fakes/fakeAppointmentsRepo";
import ListProviderApptService from "./ListProviderApptService";
import FakeCacheProvider from "@shared/container/providers/CacheProvider/fakes/FakeCacheProvider";

let fakeAppointmentsRepo: FakeAppointmentsRepo;
let listProviderAppt: ListProviderApptService;
let fakeCache: FakeCacheProvider

describe('ListMonthAvailability', () => {
    beforeEach(() => {
        fakeAppointmentsRepo = new FakeAppointmentsRepo();
        fakeCache = new FakeCacheProvider()
        listProviderAppt = new ListProviderApptService(fakeAppointmentsRepo, fakeCache);
    });

    it('Should be able to list the appointments on a specific day', async () => {
        const appt1 = await fakeAppointmentsRepo.create({
            provider_id: 'provider',
            user_id: 'user',
            date: new Date(2020, 6, 30, 10, 0, 0)
        });

        const appt2 = await fakeAppointmentsRepo.create({
            provider_id: 'provider',
            user_id: 'user',
            date: new Date(2020, 6, 30, 12, 0, 0)
        });

        const appointment = await listProviderAppt.execute({
            provider_id: 'provider',
            day: 30,
            month: 7,
            year: 2020
        });

        expect(appointment).toEqual([
            appt1,
            appt2
        ])

    })
})