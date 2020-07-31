export default interface ICacheProvider {
    save(key: string, value: any): Promise<void>;
    // <T> siginifica que a função recebe um parametro e retorna uma valor no mesmo formato
    recover<T>(key: string): Promise<T | null>;
    invalidate(key: string): Promise<void>;
    invalidatePrefix(prefix: string): Promise<void>;
}