import { container } from "tsyringe";

import IStorageProvider from "../providers/StorageProvider/models/IStorageProvider";
import DiskStorageProvider from "../providers/StorageProvider/implementations/DiskStorageProvider";

container.registerSingleton<IStorageProvider>("StorageProvider", DiskStorageProvider);