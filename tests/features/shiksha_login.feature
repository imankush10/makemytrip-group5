Feature: Shiksha Login
  As a registered user on shiksha.com
  I want to log in using my email address
  So that I can access my account

  Scenario: Login via email OTP on shiksha.com
    Given I open the Shiksha website
    When I click on the Login button
    And I choose to login through email
    And I enter my registered email address
    And I click Get OTP to receive the OTP on my email
    Then I wait for the user to enter the OTP and complete login
    And my session is saved so other tests stay logged in
