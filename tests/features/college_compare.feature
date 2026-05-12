@compare
Feature: Compare MBA Colleges on Shiksha

  Scenario Outline: Search and compare top MBA colleges

    Given I navigate to Shiksha and login
    When I click on MBA in the navigation bar
    And I click on Top Ranked Colleges
    And I click on Top MBA Colleges in India
    And I click on IIM Ahmedabad college
    And I click on the Compare button
    And I search for college <college1> in the compare box
    And I click Compare Now
    And I click on Add College
    And I search for college <college2> in the compare box
    And I click Compare Now
    And I click on Add College
    And I search for college <college3> in the compare box
    And I click Compare Now
    Then I take a screenshot of the comparison page

    Examples:
      | college1                                        | college2                                       | college3                                      |
      | IIM Bangalore - Indian Institute of Management  | IIM Indore - Indian Institute of Management    | IIM Udaipur - Indian Institute of Management  |