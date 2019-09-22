import { deepCopy } from '../Utils/objects';
import { Attribute } from './attribute';
import { AttributeValues } from './attributeValues';

export class Attributes {
  private _strength: AttributeValues;
  private _body: AttributeValues;
  private _reflexes: AttributeValues;
  private _dexterity: AttributeValues;
  private _intelligence: AttributeValues;
  private _willpower: AttributeValues;
  private _charisma: AttributeValues;
  private _edge: AttributeValues;

  constructor (attrs?: Attributes) {
    const empty = (): AttributeValues => ({
      xp: 0,
      score: this._calculateScore(0),
      link: this._calculateLinkScore(0),
    });

    if (attrs) {
      this._strength = deepCopy(attrs._strength);
      this._body = deepCopy(attrs._body);
      this._reflexes = deepCopy(attrs._reflexes);
      this._dexterity = deepCopy(attrs._dexterity);
      this._intelligence = deepCopy(attrs._intelligence);
      this._willpower = deepCopy(attrs._willpower);
      this._charisma = deepCopy(attrs._charisma);
      this._edge = deepCopy(attrs._edge);
    } else {
      this._strength = empty();
      this._body = empty();
      this._reflexes = empty();
      this._dexterity = empty();
      this._intelligence = empty();
      this._willpower = empty();
      this._charisma = empty();
      this._edge = empty();
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
   * @param attr The attribute to have XP added to
   * @param xp The amount of XP to be added
   */
  public addXP (attr: Attribute, xp: number) {
    this._changeXP(attr, xp, 'add');
  }

  /**
   * Removes the given amount of XP from an `Attribute`'s `AttributeValues`,
   * and recalculates it's `score` and `link` values based on the new XP.
   *
   * @param attr The attribute to have XP added to
   * @param xp The amount of XP to be added
   */
  public removeXP (attr: Attribute, xp: number) {
    this._changeXP(attr, xp, 'remove');
  }

  /**
   * Sets the XP of an `Attribute`'s `AttributeValues` directly to the given
   * amount and recalculates it's `score` and `link` values based on the new
   * XP. This is provided "just in case"; you probably want `addXP` or
   * `removeXP`.
   *
   * @param attr The attribute to have XP added to
   * @param xp The amount of XP to be added
   */
  public setXP (attr: Attribute, xp: number) {
    this._changeXP(attr, xp, 'set');
  }

  /**
   * An internal method to cut down on repetition between setting, adding, and
   * removing XP from attributes.
   *
   * @param attr The attribute that's XP is changing
   * @param xp The XP the attribute is changing by
   * @param mod How the XP is changing the attribute
   */
  private _changeXP (attr: Attribute, xp: number, mod: string) {
    const values = this.getValues(attr);
    if (!values) {
      return;
    }

    // TODO: If this pattern keeps repeating throughout the code then it might
    // make sense to create an enum for it.
    switch (mod) {
      case 'set':
        values.xp = xp;
        break;
      case 'add':
        values.xp += xp;
        break;
      case 'remove':
        values.xp -= xp;
        break;
      default:
        // Something went wrong, bail out
        return undefined;
    }
    values.score = this._calculateScore(values.xp);
    values.link = this._calculateLinkScore(values.score);

    this._setValues(attr, values);
  }

  /**
   * Takes an `Attribute` and assigns it a new set of `AttributeValues`.
   *
   * @param attr The `Attribute` to have it's `AttributeValues` set
   * @param values The values to use
   */
  private _setValues (attr: Attribute, values: AttributeValues) {
    switch (attr) {
      case Attribute.STR:
        this._strength = values;
        break;
      case Attribute.BOD:
        this._body = values;
        break;
      case Attribute.RFL:
        this._reflexes = values;
        break;
      case Attribute.DEX:
        this._dexterity = values;
        break;
      case Attribute.INT:
        this._intelligence = values;
        break;
      case Attribute.WIL:
        this._willpower = values;
        break;
      case Attribute.CHA:
        this._charisma = values;
        break;
      case Attribute.EDG:
        this._charisma = values;
        break;
      default: return undefined;
    }
  }

  /**
   * This method exists to give a name to what's being done, the calculation
   * is obviously nothing major.
   *
   * @param xp The XP of the `AttributeValue` set
   */
  private _calculateScore (xp: number): number {
    return Math.floor(xp / 100);
  }

  /**
   * Calculates the link score for an `AttributeValue` set based on it's score
   * value.
   *
   * @param score The score of the `AttributeValue` set
   */
  private _calculateLinkScore (score: number): number {
    if (score === 0) { return -4; }
    else if (score === 1) { return -2; }
    else if (score >= 2 && score <= 3) { return -1; }
    else if (score >= 4 && score <= 6) { return 0; }
    else if (score >= 7 && score <= 9) { return 1; }
    else if (score === 10) { return 2; }
    else {
      const buff = Math.floor(score / 3);

      return buff > 5 ? 5 : buff;
    }
  }
}
