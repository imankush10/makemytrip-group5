
@shiksha_register
Feature: Shiksha Registration
  As a new visitor on shiksha.com
  I want to register on the platform
  So that I can get personalized college and course recommendations

  Scenario: Successfully register a new account on shiksha.com
    Given I navigate to the Shiksha homepage
    When I click on the Sign Up button
    And I enter my phone number, full name, and email address
    And I accept the terms and conditions
    And I click the Sign Up button to proceed
    Then I dismiss the OTP verification by closing the popup
    And I skip the OTP step
    Then I should be registered successfully on Shiksha
