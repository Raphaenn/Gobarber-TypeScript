import { MongoRepository, getMongoRepository } from "typeorm";

import INotificationsRepository from "@modules/Notifications/repositories/INotificationsRepository";
import ICreateNotificationsDTO from "@modules/Notifications/dtos/ICreateNotificationsDTO";
import Notifications from "../schemas/Notification";

class NotificationsRepository implements INotificationsRepository{
    private ormRepository: MongoRepository<Notifications>

    constructor() {
        // mongo é o nome da conexão do mogno no ormconfig
        this.ormRepository = getMongoRepository(Notifications, 'mongo');
    };

    public async create({ content, recipient_id }: ICreateNotificationsDTO): Promise<Notifications> {
        const notifications = this.ormRepository.create({
            content,
            recipient_id
        });

        await this.ormRepository.save(notifications);

        return notifications;
    }
}

export default NotificationsRepository;