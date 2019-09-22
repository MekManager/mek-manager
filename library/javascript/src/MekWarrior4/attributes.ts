import { Experience } from '../interfaces';
import { Attribute } from './attribute';
import { AttributeValues } from './attributeValues';

export class Attributes implements Experience {
  private _strength: AttributeValues;
  private _body: AttributeValues;
  private _reflexes: AttributeValues;
  private _dexterity: AttributeValues;
  private _intelligence: AttributeValues;
  private _willpower: AttributeValues;
  private _charisma: AttributeValues;
  private _edge: AttributeValues;

  constructor (attrs?: Attributes) {
    // I don't like how this looks at all, but everything else I can think of
    // seems even worse.
    if (attrs) {
      this._strength = new AttributeValues(attrs._strength);
      this._body = new AttributeValues(attrs._body);
      this._reflexes = new AttributeValues(attrs._reflexes);
      this._dexterity = new AttributeValues(attrs._dexterity);
      this._intelligence = new AttributeValues(attrs._intelligence);
      this._willpower = new AttributeValues(attrs._willpower);
      this._charisma = new AttributeValues(attrs._charisma);
      this._edge = new AttributeValues(attrs._edge);
    } else {
      this._strength = new AttributeValues();
      this._body = new AttributeValues();
      this._reflexes = new AttributeValues();
      this._dexterity = new AttributeValues();
      this._intelligence = new AttributeValues();
      this._willpower = new AttributeValues();
      this._charisma = new AttributeValues();
      this._edge = new AttributeValues();
    }
  }

  /**
   * Gets the corresponding `AttributeValue` set for an `Attribute`.
   *
   * @param attr The attribute to find the values of
   */
  public getValues (attr: Attribute) {
    switch (attr) {
      case Attribute.STR: return this._strength;
      case Attribute.BOD: return this._body;
      case Attribute.RFL: return this._reflexes;
      case Attribute.DEX: return this._dexterity;
      case Attribute.INT: return this._intelligence;
      case Attribute.WIL: return this._willpower;
      case Attribute.CHA: return this._charisma;
      case Attribute.EDG: return this._charisma;
      default: return undefined;
    }
  }

  /**
   * Adds the given amount of XP to an `Attribute`'s `AttributeValues`, and
   * recalculates it's `score` and `link` values based on the new XP.
   *
   * @param xp The amount of XP to be added
   * @param attr The attribute to have XP added to
   */
  public addXP (xp: number, attr: Attribute): void {
    const values = this.getValues(attr);
    if (values) {
      values.addXP(xp);
    }
  }

  /**
   * Removes the given amount of XP from an `Attribute`'s `AttributeValues`,
   * and recalculates it's `score` and `link` values based on the new XP.
   *
   * @param xp The amount of XP to be added
   * @param attr The attribute to have XP added to
   */
  public removeXP (xp: number, attr: Attribute): void {
    const values = this.getValues(attr);
    if (values) {
      values.removeXP(xp);
    }
  }

  /**
   * Sets the XP of an `Attribute`'s `AttributeValues` directly to the given
   * amount and recalculates it's `score` and `link` values based on the new
   * XP. This is provided "just in case"; you probably want `addXP` or
   * `removeXP`.
   *
   * @param xp The amount of XP to be added
   * @param attr The attribute to have XP added to
   */
  public setXP (xp: number, attr: Attribute): void {
    const values = this.getValues(attr);
    if (values) {
      values.setXP(xp);
    }
  }
}
