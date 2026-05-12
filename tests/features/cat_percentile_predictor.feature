@shiksha
Feature: CAT Percentile Predictor on Shiksha

  Background:
    Given I navigate to the Shiksha homepage

  @smoke
  Scenario: Predict CAT percentile, apply filters and shortlist college

    When I click on the MBA tab
    And I select CAT Percentile Predictor from the dropdown

    And I enter the first CAT score
    And I click Predict Now

    And I click Reset
    And I enter the second CAT score
    And I click Predict Now

    And I apply all location filters
    And I apply the fees filter
    And I apply the specialization filter

    And I shortlist the first college
    Then I take a screenshot of the final page