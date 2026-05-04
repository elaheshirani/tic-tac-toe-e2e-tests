Feature: Hint Feature

  Scenario: Show hint for available move
    Given game is in progress
    When user clicks on hint button
    Then a suggested cell should be highlighted

  Scenario: Hint suggests winning move
    Given a winning move is available
    When user clicks on hint
    Then the winning cell should be suggested