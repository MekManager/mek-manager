Feature: Affiliations that disallow a particular trait
  Some affiliations enforce a rule that a specific trait cannot be taken.

  Scenario: A character is valid if they don't have the restricted trait
    Given a new character
    When the character takes the affiliation: "No Farm"
    Then the character should be "Valid"

  Scenario: A character is invalid if the have the restricted trait
    Given a new character
    When the character takes the affiliation: "No Farm"
    And the character takes the trait: "Green Thumb"
    Then the character should be "Invalid"
