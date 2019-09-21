Feature: Child Labor
  Child labor is, generally speaking, outlawed human space. There are a handful
  of places where it's either explicitly legal or laws are so lax/ill-enforced
  that it's de facto legal. In game terms, this means that a character in one
  of these places can take an adult job for their late childhood stage of
  development.

  Scenario: Taking a civilian job as a child should normally be disallowed
    Given a new character
    When the character takes the affiliation: "Default"
    And the character takes the module "Farm" for stage 1
    And the character takes the module "Civilian Job" for stage 2
    Then the character should be "Invalid"

  Scenario: Taking a civilian job as a child should be allowed for some states
    Given a new character
    When the character takes the affiliation: "Child Labor"
    And the character takes the module "Farm" for stage 1
    And the character takes the module "Civilian Job" for stage 2
    Then the character should be "Valid"
