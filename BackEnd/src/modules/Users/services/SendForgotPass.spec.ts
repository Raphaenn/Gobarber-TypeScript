import AppError from "@shared/errors/AppError";

import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository";
import FakeUserTokenRepo from "@modules/Users/repositories/fakes/FakeUserTokenRepo";
import FakeMailProvider from "@shared/container/providers/MailProvider/fakes/FakeMailProvider";
import SendForgotPassService from "./SendForgotPassService";

let fakeUserRepo: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeTokenRepo: FakeUserTokenRepo;
let sendForgotPasswordEmail: SendForgotPassService;


describe("SendForgotPasseEmail", () => {
    
    // função que cria gatilhos de forma automatica. O objetivo é preencher os let com as instancias que elas devem chamar. 
    beforeEach(() => {
        fakeUserRepo = new FakeUsersRepository();
        fakeMailProvider = new FakeMailProvider();
        fakeTokenRepo = new FakeUserTokenRepo();

        sendForgotPasswordEmail = new SendForgotPassService(
            fakeUserRepo,
            fakeMailProvider,
            fakeTokenRepo
        )
    });

    it("Should be able to send a email, to recovery the password", async () => {
        const sendmail = jest.spyOn(fakeMailProvider, 'sendEMail');

        await fakeUserRepo.create({
            name: "Raphael Neves",
            email: "raphaelnn@hotmail.com",
            password: '321993'
        });

        await sendForgotPasswordEmail.execute({
            email: 'raphaelnn@hotmail.com'
        });

        expect(sendmail).toHaveBeenCalled();
    });

    it("Should not be able to recover a non-exists user", async () => {
        await expect(sendForgotPasswordEmail.execute({
            email: 'raphaelnn@hotmail.com'
        })).rejects.toBeInstanceOf(AppError)
    });

    it("Should generate a forgot password token", async () => {
        const generateToken = jest.spyOn(fakeTokenRepo, 'generate');

        const user = await fakeUserRepo.create({
            name: "Raphael Neves",
            email: "raphaelnn@hotmail.com",
            password: '321993'
        });

        await sendForgotPasswordEmail.execute({
            email: 'raphaelnn@hotmail.com'
        });


        expect(generateToken).toBeCalledWith(user.id);
    });
});