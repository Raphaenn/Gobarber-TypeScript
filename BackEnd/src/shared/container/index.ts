import { container } from "tsyringe";

import "@modules/Users/providers";
import "./providers";

import IAppointmentsRepo from "@modules/Appointments/repositories/IAppointmentsRepo";
import AppointmentsRepo from "@modules/Appointments/infra/typeorm/repositories/AppointmentsRepo";

import IUsersRepository from "@modules/Users/repositories/IUsersRepository";
import UserRepo from "@modules/Users/infra/typeorm/repositories/UsersRepository";

container.registerSingleton<IAppointmentsRepo>("AppointmentsRepo", AppointmentsRepo);
container.registerSingleton<IUsersRepository>("UserRepo", UserRepo);