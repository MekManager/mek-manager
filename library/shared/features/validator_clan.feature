Feature: Clan specific rules
  The unique culture of The Clans means that they're subject to several rules
  that other character aren't.

  Scenario: Clan characters can take Clan modules
    Given a new character
    When the character takes the affiliation: "Clan"
    And the character takes the caste: "MekWarrior"
    And the character takes the module "Farm" for stage 1
    And the character takes the module "Freeborn Sibko" for stage 2
    Then the character should be "Valid"

  Scenario: Non-Clanners cannot take Clan modules
    Given a new character
    When the character takes the affiliation: "Default"
    And the character takes the module "Farm" for stage 1
    And the character takes the module "Freeborn Sibko" for stage 2
    Then the character should be "Invalid"

  Scenario: Characters from hybrid Clan/Sphere affiliations can take Clan modules
    Given a new character
    When the character takes the affiliation: "Sphere/Clan Hybrid"
    And the character takes the caste: "MekWarrior"
    And the character takes the module "Farm" for stage 1
    And the character takes the module "Freeborn Sibko" for stage 2
    Then the character should be "Valid"

  Scenario: Characters from hybrid Clan/Sphere affiliations cannot take Trueborn modules
    Given a new character
    When the character takes the affiliation: "Sphere/Clan Hybrid"
    And the character takes the caste: "MekWarrior"
    And the character takes the module "Farm" for stage 1
    And the character takes the module "Trueborn Sibko" for stage 2
    Then the character should be "Invalid"

  Scenario: Only Trueborn characters can take Trueborn restricted modules
    Given a new character
    When the character takes the affiliation: "Clan"
    And the character takes the caste: "MekWarrior"
    And the character takes the trait: "MekWarrior Phenotype"
    And the character takes the module "Trueborn Creche" for stage 1
    And the character takes the module "Trueborn Sibko" for stage 2
    Then the character should be "Valid"

  Scenario: A Clan character without a caste is invalid
    Given a new character
    When the character takes the affiliation: "Clan"
    And the character takes the trait: "MekWarrior Phenotype"
    And the character takes the module "Trueborn Creche" for stage 1
    And the character takes the module "Trueborn Sibko" for stage 2
    Then the character should be "Invalid"

  Scenario: A Clan character should be invalid if they take a Phenotype restricted by their Clan
    Given a new character
    When the character takes the affiliation: "Big Boy Clan"
    And the character takes the caste: "Aerospace"
    And the character takes the trait: "Aerospace Phenotype"
    Then the character should be "Invalid"

  Scenario: A Clan character should be valid if they have then the required Phenotype
    Given a new character
    When the character takes the affiliation: "Big Boy Clan"
    And the character takes the caste: "Aerospace"
    And the character takes the trait: "MekWarrior Phenotype"
    Then the character should be "Valid"

  Scenario: A Clan character should be valid if they take a Phenotype unrelated to their Clan's restriction
    Given a new character
    When the character takes the affiliation: "Big Boy Clan"
    And the character takes the caste: "Elemental"
    And the character takes the trait: "Elemental Phenotype"
    Then the character should be "Valid"

  Scenario: A non-warrior from a Clan with warrior trait restrictions is exempt
    Given a new character
    When the character takes the affiliation: "Top Tier Clan"
    And the character takes the caste: "Scientist"
    Then the character should be "Valid"

  Scenario: A warrior that lacks a trait required by their Clan is invalid
    Given a new character
    When the character takes the affiliation: "Top Tier Clan"
    And the character takes the caste: "MekWarrior"
    Then the character should be "Invalid"

  Scenario: A warrior that has the trait required by their Clan is valid
    Given a new character
    When the character takes the affiliation: "Top Tier Clan"
    And the character takes the caste: "MekWarrior"
    And the character takes the trait: "Natural Aptitude"
    Then the character should be "Valid"
