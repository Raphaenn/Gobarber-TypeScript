import nodemailer, { Transporter } from "nodemailer"; 
import aws from "aws-sdk";
import { injectable, inject } from "tsyringe";

import IMailproviders from "../models/IMailproviders";
import ISendMailDTO from "../dtos/ISendMailDTO";
import IMailTempleteP from "@shared/container/providers/MailTempleteProvider/models/IMailTempleteP";
import mailConfig from "@config/mail";


@injectable()
export default class SESMailProvider implements IMailproviders {
    private client: Transporter;

    constructor(
      @inject('MailTempleteP')
      private mailTempleteP: IMailTempleteP
    ) {
        this.client = nodemailer.createTransport({
            SES: new aws.SES({
                apiVersion: '2010-12-01',
                region: 'us-east-2'
            })
        })
    };

    public async sendEMail({from, to, subject, templateData}: ISendMailDTO): Promise<void> {
        const { name, email } = mailConfig.defaults.from;
 
        const message = await this.client.sendMail({
            from: {
              name: name,
              address: email
            },
            to: {
              name: to.name,
              address: to.email
            },
            subject,
            html: await this.mailTempleteP.parse(templateData),
        });
    }
}