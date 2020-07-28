import AppError from "@shared/errors/AppError";

import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository";
import FakeHashProvider from "@modules/Users/providers/HashProvider/fakes/FakeHashProvider";

import UpdateProfileService from "./UpdateProfileService";

let fakeUserRepo: FakeUsersRepository;
let fakeHashProv: FakeHashProvider;
let updateProfileService: UpdateProfileService;


describe("SendForgotPasseEmail", () => {
    beforeEach(() => {
        fakeUserRepo = new FakeUsersRepository();
        fakeHashProv = new FakeHashProvider();

        updateProfileService = new UpdateProfileService(fakeUserRepo, fakeHashProv)
    });
    
    it("Should not be able to update the profile", async () => {
        const user = await fakeUserRepo.create({
            name: 'Test Name',
            email: 'test@hotmail.com',
            password: '321993'
        })

        const updatedUser = await updateProfileService.execute({
            user_id: user.id,
            name: "Test Tre",
            email: "test@hotmail.com"
        });

        expect(updatedUser.name).toBe('Test Tre')
    });

    it("Should not be able to update the profile", async () => {
        await fakeUserRepo.create({
            name: 'Obama',
            email: 'obama@hotmail.com',
            password: '321993'
        });

        const user = await fakeUserRepo.create({
            name: 'Test Name',
            email: 'test@hotmail.com',
            password: '321993'
        })

        await expect(updateProfileService.execute({
            user_id: user.id,
            name: "Obama",
            email: "obama@hotmail.com"
        })).rejects.toBeInstanceOf(AppError)

    });

    it("Should not be able to update the password profile without the oldpassword", async () => {
        const user = await fakeUserRepo.create({
            name: 'Test Name',
            email: 'test@hotmail.com',
            password: '321993'
        });

        const updatedUser = await updateProfileService.execute({
            user_id: user.id,
            name: "Test Name",
            email: "test@hotmail.com",
            oldpassword: '321993',
            password: '123123'
        });

        expect(updatedUser.password).toBe('123123')
    });

    it("Should not be able to update the password profile with the wrong oldpassword", async () => {
        const user = await fakeUserRepo.create({
            name: 'Test Name',
            email: 'test@hotmail.com',
            password: '321993'
        });

        await expect(updateProfileService.execute({
            user_id: user.id,
            name: "Test Name",
            email: "test@hotmail.com",
            oldpassword: '32322',
            password: '123123'
        })).rejects.toBeInstanceOf(AppError)
    });
});