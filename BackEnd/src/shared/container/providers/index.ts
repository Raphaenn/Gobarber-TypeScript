import { container } from "tsyringe";

import IStorageProvider from "../providers/StorageProvider/models/IStorageProvider";
import DiskStorageProvider from "../providers/StorageProvider/implementations/DiskStorageProvider";

import IMailproviders from "../providers/MailProvider/models/IMailproviders";
import EtherealMail from "../providers/MailProvider/Implementations/EtherealMail";

import IMailTempleteP from "../providers/MailTempleteProvider/models/IMailTempleteP";
import handlebarsMailTemplate from "../providers/MailTempleteProvider/implementations/handlebarsMailTemplate"

container.registerSingleton<IStorageProvider>("StorageProvider", DiskStorageProvider);
container.registerSingleton<IMailTempleteP>("MailTempleteP", handlebarsMailTemplate);

// Como fazermos uma nova inject de dependencia, precisamos passar o container
container.registerInstance<IMailproviders>("Mailproviders",  container.resolve(EtherealMail));