/**
 * A class representing the name of a person.
 */
export class Name {
  /**
   * A collection of anything that should appear before this person's name.
   */
  public prefixes: string[];
  /**
   * The name given to this person. In the English speaking work this is more
   * commonly known as a "first name".
   */
  public givenName: string;
  /**
   * Any extra names this character is identified. These are conventionally
   * listed between the given and family name.
   */
  public middleNames: string[];
  /**
   * The name of the family of this person. In the English speaking world this
   * is commonly known as a "last name".
   */
  public familyName: string;
  /**
   * A collection of anything that should appear after this characters name.
   */
  public suffixes: string[];
  /**
   * TODO: Make a type signature for this.
   *
   * Meta data about this character that would be necessary to determine how
   * their name should be formatted.
   */
  private _config: object;

  constructor (data: object = {}) {
    this.prefixes = data['prefixes'] || [];
    this.givenName = data['givenName'] || '';
    this.middleNames = data['middleNames'] || [];
    this.familyName = data['familyName'] || '';
    this.suffixes = data['suffixes'] || [];
    this._config = data['config'] || {};
  }

  /**
   * This character's full, formal name. Including all values with prefixes and
   * suffixes appended.
   *
   * @example
   * "Dr. John Quincy Doe Esq."
   */
  get fullName (): string {
    const str = this._config['familyNameFirst']
    ? `${this.familyName} ${this.middleName} ${this.givenName}`
    : `${this.givenName} ${this.middleName} ${this.familyName}`;

    return `${this.prefix} ${str} ${this.suffix}`.trim();
  }

  /**
   * All middle name values concatonated with spaces.
   */
  get middleName (): string {
    return this.middleNames.join(' ').trim();
  }

  /**
   * This character's name as anyone modestly familiar with them would address
   * them.
   *
   * @example
   * "John Doe"
   */
  get name (): string {
    if (this._config['familyNameFirst']) {
      return `${this.familyName} ${this.givenName}`;
    } else {
      if (this._config['familyNameIsFormal']) {
        return `${this.givenName} ${this.middleName}`;
      } else {
        return `${this.givenName} ${this.familyName}`;
      }
    }
  }

  /**
   * All prefix values concatonated with spaces.
   */
  get prefix (): string {
    return this.prefixes.join(' ').trim();
  }

  /**
   * How this characters name would appear on a formal roll or listing.
   *
   * @example
   * "Doe, John"
   */
  get rollName (): string {
    return `${this.familyName}, ${this.givenName}`;
  }

  /**
   * All suffix values concatonated with spaces.
   */
  get suffix (): string {
    return this.suffixes.join(' ').trim();
  }
}
