import AppError from "@shared/errors/AppError";

import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository";
import FakeUserTokenRepo from "@modules/Users/repositories/fakes/FakeUserTokenRepo";
import FakeHashProvider from "@modules/Users/providers/HashProvider/fakes/FakeHashProvider";

import ResetPassService from "./ResetPassService";

let fakeUserRepo: FakeUsersRepository;
let fakeTokenRepo: FakeUserTokenRepo;
let resetPassService: ResetPassService;
let fakeHashProv: FakeHashProvider;


describe("SendForgotPasseEmail", () => {
    beforeEach(() => {
        fakeUserRepo = new FakeUsersRepository();
        fakeTokenRepo = new FakeUserTokenRepo();
        fakeHashProv = new FakeHashProvider();

        resetPassService = new ResetPassService(
            fakeUserRepo,
            fakeTokenRepo,
            fakeHashProv
        )
    });

    it("Should not be able to reset the password", async () => {
        const user = await fakeUserRepo.create({
            name: "Raphael Neves",
            email: "raphaelnn@hotmail.com",
            password: "321993"
        });

        const userToken = await fakeTokenRepo.generate(user.id);

        const generateHash = jest.spyOn(fakeHashProv, 'generateHash');

        await resetPassService.execute({
            password: "123123",
            token: userToken.token
        });

        const updateUser = await fakeUserRepo.findById(user.id);

        // interrogacão é pra ver se não está nulo
        expect(generateHash).toHaveBeenCalledWith("123123");
        expect(updateUser?.password).toBe("123123");

    });
    

    it("Should not be able to reset the password with non-existing token", async () => {
        expect(
            resetPassService.execute({
                token: "unknow",
                password: "1233456"
            })
        ).rejects.toBeInstanceOf(AppError)
    });

    it("Should not be able to reset the password with non-existing user", async () => {

        const { token } = await fakeTokenRepo.generate('non-existing-user');

        expect(
            resetPassService.execute({
                token,
                password: "1233456"
            })
        ).rejects.toBeInstanceOf(AppError)
    });

    it("Should not be able to reset the password after two hours token", async () => {

        const { token } = await fakeTokenRepo.generate('non-existing-user');

        // Sempre que eu usar essa funcão nativa do Js, ele executa uma funcão minha dentro do mock
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            const customDate = new Date();

            return customDate.setHours(customDate.getHours() + 3)
        })

        await expect(
            resetPassService.execute({
                password: "1233456",
                token
            })
        ).rejects.toBeInstanceOf(AppError)
    });
});