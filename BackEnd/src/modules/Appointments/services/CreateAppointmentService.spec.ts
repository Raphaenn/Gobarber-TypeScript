import fakeAppointmentsRepo from "../repositories/fakes/fakeAppointmentsRepo";
import CreateAppointmentService from "./CreateAppointmentService";
import AppError from "@shared/errors/AppError";

// describe serve para caracterizar os tester
describe('CreateApppointment', () => {
    it('should be able to create a new appointment', async () => {
        const fakeApptRepo = new fakeAppointmentsRepo();
        const createappt = new CreateAppointmentService(fakeApptRepo);

        const appointment = await createappt.execute({
            date: new Date(),
            provider_id: "123123"
        });

        expect(appointment).toHaveProperty('id');
        expect(appointment.provider_id).toBe('123123');
    });

    it('should be able to create a new appointment in the same date', async () => {
        const fakeApptRepo = new fakeAppointmentsRepo();
        const createappt = new CreateAppointmentService(fakeApptRepo);

        const apptDate = new Date(2020, 6, 24);

        await createappt.execute({
            date: apptDate,
            provider_id: "123123"
        });

        expect(createappt.execute({
            date: apptDate,
            provider_id: "123123"
        })).rejects.toBeInstanceOf(AppError)
    })
})