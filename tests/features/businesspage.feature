Feature: Engineering college search and selection functionality on Shiksha

  Background:
    Given user launches the Shiksha website

  @engineeringCollege
  Scenario: User searches and selects an engineering college from navigation menu

    When user closes popup if displayed
    And user hovers on Engineering menu from homepage
    And user clicks on Top Engineering Colleges option
    Then engineering colleges page should open successfully

    When user selects location as Delhi NCR
    And user selects specialization as Computer Science Engineering
    And user selects college type as Private
    And user selects ranking filter


    Then filtered engineering colleges should be displayed

    When user clicks on first engineering college
    Then selected college details page should open

    When user verifies college overview section
    And user verifies fees section
    And user verifies placement section
    And user verifies admission section
    And user verifies course details section

    Then user should successfully validate engineering college information