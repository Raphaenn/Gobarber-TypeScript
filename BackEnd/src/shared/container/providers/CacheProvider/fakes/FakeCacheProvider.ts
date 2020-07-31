import ICacheProvider from "../models/ICacheProvider";
import { object } from "@hapi/joi";

interface ICacheData {
    [key: string]: string
};

export default class FakeCacheProvider implements ICacheProvider{
    private cache: ICacheData = {};
 
    public async save(key: string, value: any): Promise<void> {
        this.cache[key] = JSON.stringify(value)
    };

    public async recover<T>(key: string): Promise<T | null> {
        const data = this.cache[key];

        if(!data) {
            return null
        }

        // parse data 
        const parsedData = JSON.parse(data) as T;

        return parsedData
    };

    public async invalidate(key: string): Promise<void> {
        delete this.cache[key]
    }; 

    public async invalidatePrefix(prefix: string): Promise<void> {
        // buscar todas chaves que começa com prefix
        const keys = Object.keys(this.cache).filter(key => key.startsWith(`${prefix}:`));

        keys.forEach(key => {
            delete this.cache[key]
        })

    }; 
}