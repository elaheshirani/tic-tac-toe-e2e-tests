Feature: Register User
  As a player
  I need to register
  So I can use it as needed

  Background: Open Tic Tac Toe
    Given I navigate to Tic Tac Toe page
    Then I should see Welcome message and subtitle for register
    And I should see Language change button
    And I should see Theme change button

  Scenario Outline: Register user successfully
    When I enter "<name>" for PLAYER NAME
    And I click on Create Acount button
    Then I should see a message for user game subtitle
    And I should see "Hello, <name>" for welcome user

    Examples:
      | name           |                                                                                        
      | elahe          |                                                                                           
      | الهه           |                                                                                           
      | 55555          |    
      | name###88888&2 |
      |    elahe2      |      

  Scenario Outline: Register user unsuccessfully
    When I enter "<name>" for PLAYER NAME
    And I click on Create Acount button
    Then I should see a message in red color saying "<msg_error>" under input box Player name

    Examples:
      | name | msg_error                          |                                                                                
      |      | Please enter a name.               |                                                                                        
      | a    | Name must be at least 2 characters.|          

  Scenario: Register user unsuccessfully with duplicate name                                                                                                                                              
    When I enter "elahe" for PLAYER NAME
    And I click on Create Acount button
    Then I should see a message for user game subtitle
    When I click Logout button
    And I enter "elahe" for PLAYER NAME
    And I click on Create Acount button
    Then I should see a message in red color saying "This name is already taken. Try logging in." under input box Player name


