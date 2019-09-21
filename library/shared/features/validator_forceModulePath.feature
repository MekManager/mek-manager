Feature: Affiliations that force a module path without a trait
  There are affiliations that force a character down specific life
  paths by limiting their choice of modules for a particular life
  stage unless they have a specific trait that allows them through.

  Scenario: A character is valid if they have the required trait
    Given a new character
    When the character takes the affiliation: "Royal Snob"
    And the character takes the trait: "Royalty"
    And the character takes the module "Nobility" for stage 1
    Then the character should be "Valid"

  Scenario: A character is valid if they lack the trait, but are on the right path
    Given a new character
    When the character takes the affiliation: "Royal Snob"
    And the character takes the module "Farm" for stage 1
    Then the character should be "Valid"

  Scenario: A character is invalid if they lack the trait, and are on the restricted path
    Given a new character
    When the character takes the affiliation: "Royal Snob"
    And the character takes the module "Nobility" for stage 1
    Then the character should be "Invalid"
