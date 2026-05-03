Feature: Game Play
  As a player
  I need to play game
  So I can use it as needed

  Background: Open Tic Tac Toe
    Given I navigate to Tic Tac Toe page
    Then I should see Welcome message and subtitle for register
    When I enter "elahe" for PLAYER NAME
    And I click on Create Acount button
    Then I should see "Hello, elahe" for welcome user
  
  Scenario: Start a new game
    When I click on New Game button
    Then the board should be empty
    And it should be user's turn

  Scenario: User makes a valid move
    When I click on an empty cell
    Then "X" should be placed in that cell
    And it should be computer's turn 

  Scenario: Prevent move on occupied cell
    When I click on an empty cell
    Then "X" should be placed in that cell
    When the same cell should still contain X
    Then the cell value should not change

  Scenario: Computer plays automatically after user
    When I click on an empty cell
    Then "X" should be placed in that cell
    And computer should make a move automatically