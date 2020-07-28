import IParserMailDTO from "../dtos/IParserMailDTO";

export default interface IMailTempleteP {
    parse(data: IParserMailDTO): Promise<string>;
}

// sempre que tiver algo dentro do interface que recebe uma informação composta, o ideal é criar um DTO