Feature: Skills
  Asserts the expected behavior of skills

  Scenario Outline: Calculating skill levels
    Given a "basic" skill
    When the character's learning is "<learning>"
    And the skill has <xp> XP
    Then the skill level should be <level>

    Examples:
      | learning |  xp | level |
      | Fast     |  18 |     0 |
      | Fast     |  20 |     0 |
      | Fast     | 153 |     5 |
      | Fast     | 160 |     5 |
      | Fast     | 513 |    10 |
      | Standard |  20 |     0 |
      | Standard |  25 |     0 |
      | Standard | 170 |     5 |
      | Standard | 180 |     5 |
      | Standard | 570 |    10 |
      | Slow     |  22 |     0 |
      | Slow     |  26 |     0 |
      | Slow     | 187 |     5 |
      | Slow     | 190 |     5 |
      | Slow     | 627 |    10 |

  Scenario: Base level tired skill
    Given a "tiered" skill
    When level is at or below level 3
    Then it should use the tier "one" target number
    And it should use the tier "one" complexity rating
    And it should use the tier "one" linked attributes

  Scenario: Advanced level tired skill
    Given a "tiered" skill
    When level is at or above level 4
    Then it should use the tier "two" target number
    And it should use the tier "two" complexity rating
    And it should use the tier "two" linked attributes
