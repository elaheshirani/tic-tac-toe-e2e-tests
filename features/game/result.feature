Feature: Game Result
  As a player
  I need to play game
  So I can use it as needed

  Background: Open Tic Tac Toe
    Given I navigate to Tic Tac Toe page
    Then I should see Welcome message and subtitle for register
    When I enter "elahe" for PLAYER NAME
    And I click on Create Acount button
    Then I should see "Hello, elahe" for welcome user

  Scenario: User wins the game
    When I have two "X" in a row
    And I complete the third cell
    Then I should win the game
    And winning cells should be highlighted

  Scenario: Full game ends in a draw
    When the board is almost full
    And I click on the last empty cell
    Then the game result should be draw
    And no winning cells should be highlighted

  @only
  Scenario: No moves allowed after game ends
    When the game is finished
    And I click on any cell
    Then no move should be applied