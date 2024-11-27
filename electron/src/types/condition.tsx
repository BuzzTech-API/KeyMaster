import Consentimento from "./consentimento";

export default class Condition {

  private _consentimento: Consentimento;
  private _checked: boolean;

  public get consentimento(): Consentimento {
    return this._consentimento;
  }
  public set consentimento(value: Consentimento) {
    this._consentimento = value;
  }
  public get checked(): boolean {
    return this._checked;
  }
  public set checked(value: boolean) {
    this._checked = value;
  }

  constructor(consentimento: Consentimento) {
    this.consentimento = consentimento
    this.checked = false
  }
}
