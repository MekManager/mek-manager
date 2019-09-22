Feature: Attributes
   Asserts the expected behavior of attributes

   Scenario: Base values
   Given a new set of attributes
   Then each attribute should equal it's base value

   Scenario: Using one set to construct another
   Given a new set of attributes
   When it has 100 XP added to it's "Strength" attribute
   And a second set of attributes is constructed with it
   And the second has 200 XP added to it's "Body" attribute
   Then they should not be equal
   And the first's has base values for "Body"
   And the second's "Strength" should equal the first

   Scenario Outline: Calculating link values
   Given a new set of attributes
   When it has <xp> XP added to it's "Strength" attribute
   Then it's score should be <score>
   And it's link value should be <link>

   Examples:
   |   xp | score | link |
   |    0 |     0 |   -4 |
   |  100 |     1 |   -2 |
   |  200 |     2 |   -1 |
   |  500 |     5 |    0 |
   |  800 |     8 |    1 |
   | 1000 |    10 |    2 |
   | 1100 |    11 |    3 |
   | 1800 |    18 |    5 |
