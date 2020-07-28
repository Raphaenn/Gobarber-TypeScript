import nodemailer, { Transporter } from "nodemailer"; 
import { injectable, inject } from "tsyringe";
import IMailproviders from "../models/IMailproviders";
import ISendMailDTO from "../dtos/ISendMailDTO";
import IMailTempleteP from "@shared/container/providers/MailTempleteProvider/models/IMailTempleteP";


@injectable()
export default class EtherealMail implements IMailproviders {
    private client: Transporter;

    constructor(
      @inject('MailTempleteP')
      private mailTempleteP: IMailTempleteP
    ) {
      nodemailer.createTestAccount().then(account => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        }
      })
        this.client = transporter;
    });
    }

    public async sendEMail({from, to, subject, templateData}: ISendMailDTO): Promise<void> {
        const message = await this.client.sendMail({
            from: {
              name: from?.name || "Equipe Gobarber",
              address: from?.email || "equipe@gobarber.com.br"
            },
            to: {
              name: to.name,
              address: to.email
            },
            subject,
            html: await this.mailTempleteP.parse(templateData),
        });
        console.log('Preview URL: ' + nodemailer.getTestMessageUrl(message));
    }
}