Feature: Affiliations with deeply linked traits
  This is a more "advanced" version of the linked traits rule. Where not only is
  trait A dependent on the existance of trait B. But trait A cannot have a
  higher score than trait B.

  Scenario: A character is valid if neither trait is present
    Given a new character
    When the character takes the affiliation: "Royal Snob"
    And the character takes the trait: "Natural Aptitude"
    Then the character should be "Valid"

  Scenario: A character is valid if the main trait hasn't been taken
    Given a new character
    When the character takes the affiliation: "Royal Snob"
    And the character takes the trait: "Title" with 200 XP
    Then the character should be "Valid"

  Scenario: A character is valid if the main trait is equal level to the restricting trait
    Given a new character
    When the character takes the affiliation: "Royal Snob"
    And the character takes the trait: "Rank" with 200 XP
    And the character takes the trait: "Title" with 200 XP
    Then the character should be "Valid"

  Scenario: A character is valid if the main trait is of lesser value than the restricting trait
    Given a new character
    When the character takes the affiliation: "Royal Snob"
    And the character takes the trait: "Rank" with 100 XP
    And the character takes the trait: "Title" with 200 XP
    Then the character should be "Valid"

  Scenario: A character is invalid if the main trait is taken, but the restricting trait is missing
    Given a new character
    When the character takes the affiliation: "Royal Snob"
    And the character takes the trait: "Rank" with 100 XP
    Then the character should be "Invalid"

  Scenario: A character is invalid if the main trait has a higher value than the restricting trait
    Given a new character
    When the character takes the affiliation: "Royal Snob"
    And the character takes the trait: "Rank" with 200 XP
    And the character takes the trait: "Title" with 100 XP
    Then the character should be "Invalid"
