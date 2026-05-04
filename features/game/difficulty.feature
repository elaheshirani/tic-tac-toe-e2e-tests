Feature: Game difficulty selection
  As a player
  I need to play game
  So I can use it as needed

  Background: Open Tic Tac Toe
    Given I navigate to Tic Tac Toe page
    Then I should see Welcome message and subtitle for register
    When I enter "elahe" for PLAYER NAME
    And I click on Create Acount button
    Then I should see "Hello, elahe" for welcome user

  Scenario: User can change difficulty before starting game
    When I open the difficulty dropdown
    And I select "Medium" difficulty
    Then the difficulty should be set to "Medium"

  Scenario: Game starts with selected difficulty
    When I open the difficulty dropdown
    And I select "Hard" difficulty
    And I click on Play
    Then the game should start in "Hard" mode

  Scenario: Computer plays automatically based on difficulty
    When I start a new game
    And I make a move in any cell
    Then the computer should make a move automatically
    And the board should contain both X and O