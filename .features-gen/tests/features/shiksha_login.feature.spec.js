// Generated from: tests\features\shiksha_login.feature
import { test } from "playwright-bdd";

test.describe('Shiksha Login', () => {

  test('Login via email OTP on shiksha.com', async ({ Given, When, Then, And, page }) => { 
    await Given('I open the Shiksha website', null, { page }); 
    await When('I click on the Login button', null, { page }); 
    await And('I choose to login through email', null, { page }); 
    await And('I enter my registered email address', null, { page }); 
    await And('I click Get OTP to receive the OTP on my email', null, { page }); 
    await Then('I wait for the user to enter the OTP and complete login', null, { page }); 
    await And('my session is saved so other tests stay logged in', null, { page }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests\\features\\shiksha_login.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":6,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given I open the Shiksha website","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Action","textWithKeyword":"When I click on the Login button","stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":9,"keywordType":"Action","textWithKeyword":"And I choose to login through email","stepMatchArguments":[]},{"pwStepLine":10,"gherkinStepLine":10,"keywordType":"Action","textWithKeyword":"And I enter my registered email address","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":11,"keywordType":"Action","textWithKeyword":"And I click Get OTP to receive the OTP on my email","stepMatchArguments":[]},{"pwStepLine":12,"gherkinStepLine":12,"keywordType":"Outcome","textWithKeyword":"Then I wait for the user to enter the OTP and complete login","stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":13,"keywordType":"Outcome","textWithKeyword":"And my session is saved so other tests stay logged in","stepMatchArguments":[]}]},
]; // bdd-data-end