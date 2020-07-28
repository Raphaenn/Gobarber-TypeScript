import handlebars from "handlebars"
import fs from "fs";
import IMailTempleteP from "../models/IMailTempleteP";
import IParserMailDTO from "../dtos/IParserMailDTO"

class handlebarsMailTemplate implements IMailTempleteP {
    public async parse({ file, variables }: IParserMailDTO): Promise<string> {
        const templateFile = await fs.promises.readFile(file, {
            encoding: 'utf-8',
        })
        const parseTamplate = handlebars.compile(templateFile);

        return parseTamplate(variables);
    }
}

export default handlebarsMailTemplate;