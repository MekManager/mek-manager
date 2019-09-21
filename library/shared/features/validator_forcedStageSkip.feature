Feature: Affiliations that force skipping a stage
  There are some affiliations that force a character to skip an entire stage of
  character creation.

  Scenario: A character is valid if they have skipped the restricted stage
    Given a new character
    When the character takes the affiliation: "Child Labor"
    And the character takes the module "Farm" for stage 1
    And the character takes the module "Backwoods" for stage 2
    And the character takes the module "Civilian Job" for stage 4
    Then the character should be "Valid"

  Scenario: A character is invalid if they have taken any modules for the restricted stage
    Given a new character
    When the character takes the affiliation: "Child Labor"
    And the character takes the module "Farm" for stage 1
    And the character takes the module "Backwoods" for stage 2
    And the character takes the module "Trade School" for stage 3
    Then the character should be "Invalid"
