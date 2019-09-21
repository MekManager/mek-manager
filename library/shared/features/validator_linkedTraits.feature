Feature: Affiliations with linked traits
  This rule restricts one trait (A) based on the presence of a second trait
  (B). In order for a character to have trait A they must have trait B.

  Scenario: A character is valid if neither trait is present
    Given a new character
    When the character takes the affiliation: "Elite Farmer"
    Then the character should be "Valid"

  Scenario: A character is valid if the main trait hasn't been taken
    Given a new character
    When the character takes the affiliation: "Elite Farmer"
    And the character takes the trait: "Animal Empathy"
    Then the character should be "Valid"

  Scenario: A character is valid the main and required trait have both been taken
    Given a new character
    When the character takes the affiliation: "Elite Farmer"
    And the character takes the trait: "Green Thumb"
    And the character takes the trait: "Animal Empathy"
    Then the character should be "Valid"

  Scenario: A character is invalid if they have the main trait but are missing the required trait
    Given a new character
    When the character takes the affiliation: "Elite Farmer"
    And the character takes the trait: "Green Thumb"
    Then the character should be "Invalid"
