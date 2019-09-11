Feature: Traits
   Asserts the expected behavior of traits

    Scenario Outline: Calculating trait points
    Given a "<type>" trait
    When <xp> XP is added to the trait
    Then it should have <points> trait points
    And it's active state should be "<active>"

    Examples:
    | type    |   xp | points | active |
    | minimal |  200 |      2 | true   |
    | minimal |  325 |      3 | true   |
    | capped  |  600 |      5 | true   |
    | minimum |  100 |      0 | false  |
    | minimal |    0 |      0 | false  |
    | minimal | -100 |     -1 | true   |

    Scenario Outline: Stringification
    Given a "cool" trait
    When <xp> XP is added to the trait
    And the sub-description is set to "<subDesc>"
    And the subject is set to "<subject>"
    Then the string value should be "<str>"

    Examples:
    |  xp | subDesc    | subject  | str                                |
    |   0 |            |          | Coolness                           |
    | 100 |            |          | Coolness (1)                       |
    | 100 | Sunglasses |          | Coolness (1)/Sunglasses            |
    | 100 | Sunglasses | Aviators | Coolness (1)/Sunglasses (Aviators) |
