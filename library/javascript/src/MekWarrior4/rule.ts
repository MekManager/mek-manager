import { RuleName } from './ruleName';

/**
 * A `Rule` represents a character validation rule, and any associated config
 * that's required to enforce that rule.
 */
export class Rule {
  public name: RuleName;
  // TODO: config being just any object feels prone to error down the road. It
  // works for now because I don't know what all is going to need to go into it.
  public config: {};

  constructor (name: RuleName, config = {}) {
    this.name = name;
    this.config = config;
  }
}
