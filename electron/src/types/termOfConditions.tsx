import Consentimento from "./consentimento";

export class TermOfConditions {
    
    private _id: number;
    public get id(): number {
        return this._id;
    }
    public set id(value: number) {
        this._id = value;
    }
    private _pdfLink: string;
    public get pdfLink(): string {
        return this._pdfLink;
    }
    public set pdfLink(value: string) {
        this._pdfLink = value;
    }
    private _aplicationDate: Date;
    public get aplicationDate(): Date {
        return this._aplicationDate;
    }
    public set aplicationDate(value: Date) {
        this._aplicationDate = value;
    }
    private _isValid: boolean;
    public get isValid(): boolean {
        return this._isValid;
    }
    public set isValid(value: boolean) {
        this._isValid = value;
    }
    
    private _consents: Consentimento[];


    public get consents(): Consentimento[] {
        return this._consents;
    }
    public set consents(value: Consentimento[]) {
        this._consents = value;
    }
    constructor() {
       this.consents = new Array<Consentimento>() 
    }
}
