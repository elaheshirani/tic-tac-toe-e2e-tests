Feature: Theme Settings
  As a player
  I need to play game
  So I can use it as needed

  Background:
    Given I navigate to Tic Tac Toe page

  Scenario: Toggle theme
    When I click on theme button
    Then theme should change to Dark

  Scenario: Persist theme after refresh
    When I refresh the page
    Then theme should remain Light

  Scenario: Default theme should be Light
    Then theme should remain Light
