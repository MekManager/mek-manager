Feature: Affiliations that restrict module choice
  There are affiliations that explicitly restrict a character from
  taking specific life modules outright.

  Scenario: A character is valid if they don't take the restricted module
    Given a new character
    When the character takes the affiliation: "No Farm"
    And the character takes the module "Nobility" for stage 1
    Then the character should be "Valid"

  Scenario: A character is invalid if they take the restricted module
    Given a new character
    When the character takes the affiliation: "No Farm"
    And the character takes the module "Farm" for stage 1
    Then the character should be "Invalid"
