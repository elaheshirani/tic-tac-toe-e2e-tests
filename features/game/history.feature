Feature: Game History

  Scenario: Save game result after completion
    Given user finishes a game
    When game ends
    Then result should be stored in history

  Scenario: View game history
    Given user has played games
    When user opens history page
    Then previous game results should be displayed

  Scenario: Clear history
    Given history contains records
    When user clears history
    Then history should be empty