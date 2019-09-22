Feature: Affiliation that restricts taking a field without a trait
  There are modules that restrict a character's choice of fields for their
  education, unless the character posesses a specific trait.

  Scenario: A character is valid if they have neither the trait or field
    Given a new character
    When the character takes the affiliation: "Royal Snob"
    And the character takes the trait: "Royalty"
    And the character takes the module "Nobility" for stage 1
    And the character takes the module "Military School" for stage 2
    And the character takes the module "Military Academy" for stage 3 focusing on the "AeroSpace" field
    Then the character should be "Valid"

  Scenario: A character is valid if they have the trait but not the field
    Given a new character
    When the character takes the affiliation: "Royal Snob"
    And the character takes the trait: "Royalty"
    And the character takes the trait: "Title" with 400 XP
    And the character takes the module "Nobility" for stage 1
    And the character takes the module "Military School" for stage 2
    And the character takes the module "Military Academy" for stage 3 focusing on the "AeroSpace" field
    Then the character should be "Valid"

  Scenario: A character is valid if they have both the trait and the field
    Given a new character
    When the character takes the affiliation: "Royal Snob"
    And the character takes the trait: "Royalty"
    And the character takes the trait: "Title" with 400 XP
    And the character takes the module "Nobility" for stage 1
    And the character takes the module "Military School" for stage 2
    And the character takes the module "Military Academy" for stage 3 focusing on the "MekWarrior" field
    Then the character should be "Valid"

  Scenario: A character is invalid if they have the field, but lack the trait
    Given a new character
    When the character takes the affiliation: "Royal Snob"
    And the character takes the trait: "Royalty"
    And the character takes the module "Nobility" for stage 1
    And the character takes the module "Military School" for stage 2
    And the character takes the module "Military Academy" for stage 3 focusing on the "MekWarrior" field
    Then the character should be "Invalid"
