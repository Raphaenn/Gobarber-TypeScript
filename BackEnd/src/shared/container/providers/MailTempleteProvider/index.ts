import { container } from "tsyringe";

import IMailTempleteP from "./models/IMailTempleteP";
import handlebarsMailTemplate from "./implementations/handlebarsMailTemplate";

const providers =  {
    handlebars: handlebarsMailTemplate
};

container.registerSingleton<IMailTempleteP>("MailTempleteP", providers.handlebars);

