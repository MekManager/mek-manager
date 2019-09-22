Feature: Affiliations that cannot be the only affiliation
  Some affiliations require a character to take a second
  affiliation. This is usually to represent an affiliation that people
  are rarely, if ever born into; but are joined later in life.

  Scenario: A character is valid if they've taken a second affiliation
    Given a new character
    When the character takes the affiliation: "Can't Be Only"
    When the character takes the affiliation: "Default"
    Then the character should be "Valid"

  Scenario: A character is invaid if they are missing a second affiliation
    Given a new character
    When the character takes the affiliation: "Can't Be Only"
    Then the character should be "Invalid"
