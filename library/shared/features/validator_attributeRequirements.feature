Feature: Affiliations with attribute requirements for trait at a stage
  Some affiliations require a character to attain a particular
  attribute score in order to take a trait at a specific stage of
  development.

  Scenario: A character is valid if they don't have the restricted trait at all
    Given a new character
    When the character takes the affiliation: "Minimum Attr for Affiliation"
    And the character takes the trait: "Animal Empathy" during stage 0
    Then the character should be "Valid"

  Scenario: A character is valid if their attribute skill isn't high enough, but they took the trait at a different stage
    Given a new character
    When the character takes the affiliation: "Minimum Attr for Affiliation"
    And the character takes the trait: "Natural Aptitude" during stage 1
    Then the character should be "Valid"

  Scenario: A character is valid if they took the trait at the specific stage, and their attribute score is high enough
    Given a new character
    When the character takes the affiliation: "Minimum Attr for Affiliation"
    And the character takes the trait: "Natural Aptitude" during stage 0
    And the character adds 400 XP to their "Intelligence" attribute
    Then the character should be "Valid"

  Scenario: A character is invalid if they took the trait at the specific stage, and lack the required score
    Given a new character
    When the character takes the affiliation: "Minimum Attr for Affiliation"
    And the character takes the trait: "Natural Aptitude" during stage 0
    Then the character should be "Invalid"
