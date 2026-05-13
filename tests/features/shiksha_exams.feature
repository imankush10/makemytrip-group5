@shiksha_exams
Feature: Shiksha Exams
  As a student exploring exams on Shiksha
  I want to handle broken links gracefully, search for exams, and download past question papers
  So that I can prepare for my exams effectively

  Scenario: Navigate to Scholarship Exams, handle 404, search JEE Advanced and download question paper
    Given I am on the Shiksha homepage for exams
    When I hover over "More" in the navigation bar
    And I click on "All Scholarship Exams"
    Then I should see a Page Not Found error
    And I take a screenshot of the error page
    When I search for "JEE Advanced" in the top search bar
    Then I should land on the "JEE Advanced" exam page
    When I navigate to the Syllabus section
    And I click on "Download Last 10 Year JEE Advanced Question Paper PDF"
    And I download the 2023 question paper
