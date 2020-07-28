import IMailproviders from "../models/IMailproviders";
import ISendMailDTO from "../dtos/ISendMailDTO";

export default class FakeMailProvider implements IMailproviders {
    private messagens: ISendMailDTO[] = [];

    public async sendEMail(message: ISendMailDTO): Promise<void> {
        this.messagens.push(message);
    }
}