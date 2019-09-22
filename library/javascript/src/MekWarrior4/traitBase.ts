export class TraitBase {
  /** The name of the `Trait` */
  public readonly name: string;
  /** If a character is allowed to have multiple of this trait. */
  public readonly multipleAllowed: boolean;
  /** The maximum `points` this trait can have. */
  public readonly max?: number;
  /** The minimum `points` this trait can have. */
  public readonly min?: number;

  constructor (data: Object) {
    this.name = data['name'] || '';
    this.multipleAllowed = data['multipleAllowed'] || false;
    this.max = data['max'];
    this.min = data['min'];
  }
}
