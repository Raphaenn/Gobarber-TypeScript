import { container } from "tsyringe";

import mailConfig from "@config/mail";

import IMailproviders from "./models/IMailproviders";

import EtherealMail from "./Implementations/EtherealMail";
import SESMailProvider from "./Implementations/SESMailProvider";


const providers =  {
    ethereal: container.resolve(EtherealMail),
    ses: container.resolve(SESMailProvider)
};

// Como fazermos uma nova inject de dependencia, precisamos passar o container
container.registerInstance<IMailproviders>("Mailproviders", providers[mailConfig.driver]);