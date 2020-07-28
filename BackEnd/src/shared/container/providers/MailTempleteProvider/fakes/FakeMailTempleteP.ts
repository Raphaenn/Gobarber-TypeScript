import IMailTempleteP from "../models/IMailTempleteP";

class FakeMailTempleteP implements IMailTempleteP {
    public async parse() {
        return 'Mail content'
    }
}

export default FakeMailTempleteP;