Feature: Theme Settings

  Scenario: Toggle theme
    Given current theme is Light
    When user clicks on theme button
    Then theme should change to Dark

  Scenario: Persist theme after refresh
    Given user selected Dark theme
    When user refreshes the page
    Then theme should remain Dark