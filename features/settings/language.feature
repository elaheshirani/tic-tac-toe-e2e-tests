Feature: Language Settings
  As a player
  I need to play game
  So I can use it as needed

  Background:
    Given I navigate to Tic Tac Toe page

  Scenario: Switch to Persian language
    When I select "Persian" for language page
    Then UI should be displayed in Persian
    And layout direction should be RTL
  
  Scenario: Switch to English language
    When I select "English" for language page
    Then UI should be displayed in English
    And layout direction should be LTR

  Scenario: Default language should be English
    Then UI should be displayed in English

  Scenario: User journey in Persian
    When I select "Persian" for language page
    And I enter "elahe" for PLAYER NAME
    And I click on Create Acount button
    Then game UI should be in Persian

  Scenario: User journey in English
    When I select "English" for language page
    And I enter "elahe" for PLAYER NAME
    And I click on Create Acount button
    Then game UI should be in English

