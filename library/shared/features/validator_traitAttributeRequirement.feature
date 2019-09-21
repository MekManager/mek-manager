Feature: Affiliations with attribute requirements for trait
  Some affiliations require a character to have a minimum score for a trait,
  regardless of when the trait was taken.

  Scenario: A character is valid if they don't have the restricted trait at all
    Given a new character
    When the character takes the affiliation: "Minimum Attrs"
    And the character takes the trait: "Animal Empathy"
    Then the character should be "Valid"

  Scenario: A character is valid if they took the trait and their attribute score is high enough
    Given a new character
    When the character takes the affiliation: "Minimum Attrs"
    And the character takes the trait: "Natural Aptitude"
    And the character adds 400 XP to their "Intelligence" attribute
    Then the character should be "Valid"

  Scenario: A character is invalid if they took the trait and lack the required score
    Given a new character
    When the character takes the affiliation: "Minimum Attrs"
    And the character takes the trait: "Natural Aptitude"
    Then the character should be "Invalid"
