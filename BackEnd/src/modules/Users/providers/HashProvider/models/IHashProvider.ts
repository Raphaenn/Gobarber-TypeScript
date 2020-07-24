export default interface IHashProvider {
    generateHash(payload: string): Promise<string>;
    compareHash(payload: string, hashad: string): Promise<boolean>
};