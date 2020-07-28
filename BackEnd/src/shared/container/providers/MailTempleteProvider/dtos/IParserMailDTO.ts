
// Parta typar uma váriável que pode ser uma objeto com diferentes keys, é só usar o padrão abaixo. Nele a gente define que a interface é uma objeto onde sua chave é um objeto e seu valor pode ser uma string ou number
interface ITemplateVariables {
    [key: string]: string | number;
}

export default interface IParserMailDTO {
    file: string;
    variables: ITemplateVariables;
}