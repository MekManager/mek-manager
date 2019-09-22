Feature: Affiliations that only allow one module for a stage
  This rule is like an exception to the "forced to skip stage" rule. A character
  is allowed to take the stage, but they are only allowed one option.

  # Provided the stage is otherwise skippable
  Scenario: A character is valid if they skip the stage
    Given a new character
    When the character takes the affiliation: "Elite Farmer"
    And the character takes the module "Farm" for stage 1
    And the character takes the module "Backwoods" for stage 2
    Then the character should be "Valid"

  Scenario: A character is valid if they have taken the allowed module for the stage
    Given a new character
    When the character takes the affiliation: "Elite Farmer"
    And the character takes the module "Farm" for stage 1
    And the character takes the module "Backwoods" for stage 2
    And the character takes the module "Trade School" for stage 3
    Then the character should be "Valid"

  Scenario: A character is invalid if they have taken any other module for the stage
    Given a new character
    When the character takes the affiliation: "Elite Farmer"
    And the character takes the module "Farm" for stage 1
    And the character takes the module "Backwoods" for stage 2
    And the character takes the module "Military Academy" for stage 3
    Then the character should be "Invalid"
