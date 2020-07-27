import { container } from "tsyringe";

import IStorageProvider from "../providers/StorageProvider/models/IStorageProvider";
import DiskStorageProvider from "../providers/StorageProvider/implementations/DiskStorageProvider";

import IMailproviders from "../providers/MailProvider/models/IMailproviders";
import EtherealMail from "../providers/MailProvider/Implementations/EtherealMail";

container.registerSingleton<IStorageProvider>("StorageProvider", DiskStorageProvider);
container.registerInstance<IMailproviders>("Mailproviders", new EtherealMail());