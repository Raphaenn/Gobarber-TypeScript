import { ObjectID } from "mongodb";

import INotificationsRepository from "@modules/Notifications/repositories/INotificationsRepository";
import ICreateNotificationsDTO from "@modules/Notifications/dtos/ICreateNotificationsDTO";
import Notifications from "../../infra/typeorm/schemas/Notification";

class FakeNotificationsRepo implements INotificationsRepository{
    private notifications: Notifications[] = [];

    public async create({ content, recipient_id }: ICreateNotificationsDTO): Promise<Notifications> {
        const notific = new Notifications();

        Object.assign(notific, { id: new ObjectID(), content, recipient_id });

        this.notifications.push(notific);

        return notific
    }
}

export default FakeNotificationsRepo;