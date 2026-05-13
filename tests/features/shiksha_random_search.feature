Feature: Shiksha Random Search
  As a signed in user on Shiksha
  I want to search for random text strings
  So that I can verify the search behaves correctly and take screenshots of the results

  Scenario: Search for various random text strings and capture screenshots
    Given I am on the Shiksha homepage for random text search
    When I perform random searches using data from JSON
    Then I should have screenshots for all the random searches
