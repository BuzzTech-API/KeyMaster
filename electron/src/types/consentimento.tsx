export interface ConsentimentoInterface {
  id: number,
  text: string,
  isOptional: boolean,
  termosCondicao_id: number,
}

export default class Consentimento {
  private _id: number;
  private _content: string;
  private _isOptional: boolean;
  private _termosCondicao_id: number;

  public get id(): number {
    return this._id;
  }
  public set id(value: number) {
    this._id = value;
  }

  public get content(): string {
    return this._content;
  }
  public set content(value: string) {
    this._content = value;
  }
  public get isOptional(): boolean {
    return this._isOptional;
  }
  public set isOptional(value: boolean) {
    this._isOptional = value;
  }
  public get termosCondicao_id(): number {
    return this._termosCondicao_id;
  }
  public set termosCondicao_id(value: number) {
    this._termosCondicao_id = value;
  }

  constructor(id: number, text: string, isOptional: boolean, termosCondicao_id: number)
  constructor()
  constructor(id?: number, text?: string, isOptional?: boolean, termosCondicao_id?: number) {
    if (id && text &&  isOptional && termosCondicao_id) {
      this.id = id
      this.content = text
      this.isOptional = isOptional
      this.termosCondicao_id = termosCondicao_id
    }else{
      this.id=0
      this.content=''
      this.isOptional=true
      this.termosCondicao_id=0
    }
  }

  public preencherPelaInterface(params:ConsentimentoInterface) {
      this.id = params.id
      this.content = params.text
      this.isOptional = params.isOptional
      this.termosCondicao_id = params.termosCondicao_id
  }
}
