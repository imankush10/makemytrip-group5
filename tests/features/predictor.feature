@jee-predictor
Feature: JEE Main College Predictor on Shiksha

  Scenario Outline: Predict JEE Main colleges and apply filters

    Given I go to Shiksha website for JEE predictor
    When I click on Engineering tab
    And I hover on College Predictors
    And I click on JEE Main College Predictor
    And I enter JEE Main rank <rank>
    And I select gender <gender>
    And I select category <category> from dropdown
    And I select domicile state <state> from dropdown
    And I click Predict Results
    And I apply location filter <location1>
    And I apply location filter <location2>
    And I apply location filter <location3>
    And I apply fee filter <fee1>
    And I apply fee filter <fee2>
    And I apply specialization filter <specialization>
    And I apply ownership filter <ownership1>
    And I click shortlist for the first college
    Then I take a screenshot of the final loaded page

    Examples:
      | rank  | gender   | category | state  | location1  | location2 | location3 | fee1      | fee2     | specialization                | ownership1 | 
      | 5000  | Female   | OBC      | Delhi  | Bangalore  | Chennai   | Kolkata   | 3 - 5 Lakh  | > 5 Lakh  | Computer Science Engineering  | Private    |