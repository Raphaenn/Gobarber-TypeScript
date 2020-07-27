export default interface IMailproviders {
    sendEMail(to: string, body: string): Promise<void>;
}