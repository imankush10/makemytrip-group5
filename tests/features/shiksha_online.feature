@shiksha-online
Feature: Shiksha Online Course Search and Filter

  Scenario Outline: Filter online courses and select first result

    Given I go to the Shiksha homepage
    When I click on Shiksha Online
    And I select Management from the menu
    And I apply specialization filters "<specialization1>"
    And I apply courses filter "<course>"
    And I apply rating filter "<rating>"
    And I apply fees filters "<fees1>" and "<fees2>" and "<fees3>"
    And I apply course duration filter "<duration>"
    And I apply mode of study filter "<mode>"
    Then I take a screenshot of the filtered results page
    When I click on the first course in the results
    Then I take a screenshot of the course page

    Examples:
      | specialization1     | course      | rating     | fees1 | fees2          | fees3              | duration          | mode   |
      | Marketing Analytics | Certificate | 4 - 5 Star | Free  | Upto Rs. 1,000 | Rs. 1,000 to 5,000 | Less than 1 month | Online |