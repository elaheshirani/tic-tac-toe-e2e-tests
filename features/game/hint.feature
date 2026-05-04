Feature: Hint Feature
  As a player
  I need to play game
  So I can use it as needed

  Background: Open Tic Tac Toe
    Given I navigate to Tic Tac Toe page
    Then I should see Welcome message and subtitle for register
    When I enter "elahe" for PLAYER NAME
    And I click on Create Acount button
    Then I should see "Hello, elahe" for welcome user
    When I click on Get Hint button
  
  Scenario: Show hint for available move
    Then a suggested cell should be highlighted
