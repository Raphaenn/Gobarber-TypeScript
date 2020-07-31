import fakeAppointmentsRepo from "../repositories/fakes/fakeAppointmentsRepo";
import CreateAppointmentService from "./CreateAppointmentService";
import AppError from "@shared/errors/AppError";
import FakeNotificationsRepo from "@modules/Notifications/repositories/fakes/FakeNotificationsRepo";
import FakeCacheProvider from "@shared/container/providers/CacheProvider/fakes/FakeCacheProvider";

let fakeApptRepo: fakeAppointmentsRepo;
let createappt: CreateAppointmentService;
let fakeNotifications: FakeNotificationsRepo;
let fakeCache: FakeCacheProvider;

// describe serve para caracterizar os tester
describe('CreateApppointment', () => {
    beforeEach(() => {
        fakeApptRepo = new fakeAppointmentsRepo();
        fakeNotifications = new FakeNotificationsRepo();
        fakeCache = new FakeCacheProvider()
        
        createappt = new CreateAppointmentService(fakeApptRepo, fakeNotifications, fakeCache);
    })

    it('should be able to create a new appointment', async () => {

        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 6, 28, 12).getTime()
        });

        const appointment = await createappt.execute({
            date: new Date(2020, 6, 28, 13),
            user_id: 'user_id',
            provider_id: "provider_id"
        });

        expect(appointment).toHaveProperty('id');
        expect(appointment.provider_id).toBe('provider_id');
    });

    it('should not be able to create two appointments on the same time', async () => {
        const apptDate = new Date(2021, 4, 10, 11);

        await createappt.execute({
            provider_id: "provider_id",
            user_id: 'user_id',
            date: apptDate
        });

        await expect(
            createappt.execute({
              provider_id: 'provider_id',
              user_id: 'user_id',
              date: apptDate,
            }),
          ).rejects.toBeInstanceOf(AppError);
    })

    it("should not be able to create an appointment on a past date", async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 6, 28, 14).getTime()
        });

        await expect(createappt.execute({
            date: new Date(2020, 6, 28, 9),
            user_id: 'user_id',
            provider_id: "provider_id"
        })).rejects.toBeInstanceOf(AppError)
    });

    it("should not be able to create an appointment with same users as provider", async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 6, 28, 12).getTime()
        });

        await expect(createappt.execute({
            date: new Date(2020, 6, 28, 13),
            user_id: '123',
            provider_id: "123"
        })).rejects.toBeInstanceOf(AppError)
    });

    it("should not be able to create an appointment before 8am and after 17pm", async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 6, 29, 12).getTime()
        });

        await expect(createappt.execute({
            date: new Date(2020, 6, 30, 7),
            user_id: 'user_id',
            provider_id: "provider_id"
        })).rejects.toBeInstanceOf(AppError)
    });

})