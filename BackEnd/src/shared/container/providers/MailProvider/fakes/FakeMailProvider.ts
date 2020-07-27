import IMailproviders from "../models/IMailproviders";

interface IMessage {
    to: string;
    body: string;
}

export default class FakeMailProvider implements IMailproviders {
    private messagens: IMessage[] = [];

    public async sendMail(to: string, body: string): Promise<void> {
        this.messagens.push({
            to,
            body
        });
    }
}