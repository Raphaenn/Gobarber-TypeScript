import ISendMailDTO from "../dtos/ISendMailDTO";

export default interface IMailproviders {
    sendEMail(data: ISendMailDTO): Promise<void>;
}