import nodemailer, { Transporter } from "nodemailer"; 
import IMailproviders from "../models/IMailproviders";

export default class EtherealMail implements IMailproviders {
    private client: Transporter;

    constructor() {
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

    public async sendEMail(to: string, body: string): Promise<void> {
        const message = await this.client.sendMail({
            from: '"Equipe Gobarber',
            to,
            subject: "Recuperação de senha ✔",
            text: body,
        });
        console.log('Preview URL: ' + nodemailer.getTestMessageUrl(message));
    }
}