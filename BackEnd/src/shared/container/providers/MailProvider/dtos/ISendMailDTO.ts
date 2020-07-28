import IParserMailDTO from "@shared/container/providers/MailTempleteProvider/dtos/IParserMailDTO";

interface IMailContact { 
    name: string;
    email: string;
}

export default interface ISendMailDTO {
    to: IMailContact;
    from?: IMailContact;
    subject: string;
    templateData: IParserMailDTO;
}