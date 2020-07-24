import CreateAppointmentService from "./CreateAppointmentService";
import fakeAppointmentsRepo from "../repositories/fakes/fakeAppointmentsRepo";

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
        expect(appointment).toBe('123123');
    })
})