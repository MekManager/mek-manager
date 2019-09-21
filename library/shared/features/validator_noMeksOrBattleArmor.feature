Feature: Affiliations that do not allow Mek or BattleArmor training
  This rule exists to represent parts of human space where futuristic technology
  like Meks and BattleArmor are extremely limited, or completely absent. This is
  most common in areas like the Deep Periphery

  Scenario: A character is valid if they haven't taken Mek or BattleArmor training
    Given a new character
    When the character takes the affiliation: "Deep Periphery"
    And the character takes the module "Nobility" for stage 1
    And the character takes the module "Military School" for stage 2
    And the character takes the module "Military Academy" for stage 3 focusing on the "Tank" field
    Then the character should be "Valid"

  Scenario: A character is valid if they change their affiliation, and take the restricted training
    Given a new character
    When the character takes the affiliation: "Deep Periphery"
    And the character takes the affiliation: "Default"
    And the character takes the module "Nobility" for stage 1
    And the character takes the module "Military School" for stage 2
    And the character takes the module "Military Academy" for stage 3 focusing on the "MekWarrior" field
    Then the character should be "Valid"

  Scenario: A character is invalid if they have taken Mek training
    Given a new character
    When the character takes the affiliation: "Deep Periphery"
    And the character takes the module "Nobility" for stage 1
    And the character takes the module "Military School" for stage 2
    And the character takes the module "Military Academy" for stage 3 focusing on the "MekWarrior" field
    Then the character should be "Invalid"

  Scenario: A character is invalid if they have taken BattleArmor training
    Given a new character
    When the character takes the affiliation: "Deep Periphery"
    And the character takes the module "Nobility" for stage 1
    And the character takes the module "Military School" for stage 2
    And the character takes the module "Military Academy" for stage 3 focusing on the "Battle Armor" field
    Then the character should be "Invalid"

