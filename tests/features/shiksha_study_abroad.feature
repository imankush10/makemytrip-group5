@shiksha_study_abroad
Feature: Shiksha Study Abroad - Top Universities
  As a student interested in studying abroad
  I want to explore top-ranked universities on Shiksha
  So that I can research, download brochures, and compare universities

  Scenario: Explore Top Universities Abroad, download brochure and compare universities
    Given I am on the Shiksha homepage
    When I click on Study Abroad and select Top Universities Abroad
    Then I should land on the Top Universities Abroad page
    When I scroll to find the target university in the ranked list
    And I click the Download Brochure button for the target university
    And I select the second course from the course dropdown
    And I fill in my details in the brochure lead form
    And I submit the brochure form
    Then I should see a brochure download confirmation
    When I click the go back link to return to the university list
    And I click on the 5th ranked university
    Then the university detail page should open
    When I click the Compare button on the university page
    And I click Compare Now
    Then the comparison view should be displayed
