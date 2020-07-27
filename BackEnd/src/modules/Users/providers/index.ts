// vai fazer a gestao de dependencias apenas do modulo de usuário

import { container } from "tsyringe";

import IHashProvider from "../providers/HashProvider/models/IHashProvider";

// BCryptHashProvider funciona como uma "repository"
import BCryptHashProvider from "../providers/HashProvider/implementations/BCryptHashProvider";

container.registerSingleton<IHashProvider>('hashProvider', BCryptHashProvider)