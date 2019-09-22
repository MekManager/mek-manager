Feature: Character Creation Basics
  Ensures the baseline rules for character creation behave as expected

  Scenario: Character's can't take the same affiliation twice
    Given a new character
    When the character takes the affiliation: "Default"
    And the character takes the affiliation: "Default"
    Then the character should have 1 affiliation
