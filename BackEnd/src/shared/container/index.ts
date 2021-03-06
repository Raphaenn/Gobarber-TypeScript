import { container } from "tsyringe";

import "@modules/Users/providers";
import "./providers";

import IAppointmentsRepo from "@modules/Appointments/repositories/IAppointmentsRepo";
import AppointmentsRepo from "@modules/Appointments/infra/typeorm/repositories/AppointmentsRepo";

import IUsersRepository from "@modules/Users/repositories/IUsersRepository";
import UserRepo from "@modules/Users/infra/typeorm/repositories/UsersRepository";

import IUserTokenRepository from "@modules/Users/repositories/IUserTokenRepository";
import UsersTokensRepo from "@modules/Users/infra/typeorm/repositories/UsersTokensRepository";

import INotificationsRepository from "@modules/Notifications/repositories/INotificationsRepository";
import NotificationsRepository from "@modules/Notifications/infra/typeorm/repositories/NotificationsRepository";

container.registerSingleton<IAppointmentsRepo>("AppointmentsRepo", AppointmentsRepo);
container.registerSingleton<IUsersRepository>("UserRepo", UserRepo);
container.registerSingleton<IUserTokenRepository>("UsersTokensRepo", UsersTokensRepo);
container.registerSingleton<INotificationsRepository>("NotificationsRepo", NotificationsRepository);