import AppError from "@shared/errors/AppError";

import FakeUsersRepository from "@modules/Users/repositories/fakes/FakeUsersRepository";
import ListProvidersService from "./ListProvidersService";
import FakeCacheProvider from "@shared/container/providers/CacheProvider/fakes/FakeCacheProvider";

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProvidersService;
let fakeCache: FakeCacheProvider;

describe('ListProvider', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeCache = new FakeCacheProvider();
        listProviders = new ListProvidersService(fakeUsersRepository, fakeCache);
    });

    it('Should be abre to list the providers', async () => {
        const user1 = await fakeUsersRepository.create({
            name: "Test 1",
            email: 'test1@gmail.com',
            password: '123123'
        });

        const user2 = await fakeUsersRepository.create({
            name: "Test 2",
            email: 'test2@gmail.com',
            password: '123123'
        });

        const loggedUser = await fakeUsersRepository.create({
            name: "Test 4",
            email: 'test4@gmail.com',
            password: '123123'
        });

        const list = await listProviders.execute({
            user_id: loggedUser.id
        });

        // Para comparar arrays deve ser toEqual
        expect(list).toEqual([user1, user2])
    })
})