// Generated from: tests\features\shiksha_register.feature
import { test } from "playwright-bdd";

test.describe('Shiksha Registration', () => {

  test('Successfully register a new account on shiksha.com', async ({ Given, When, Then, And, page }) => { 
    await Given('I navigate to the Shiksha homepage', null, { page }); 
    await When('I click on the Sign Up button', null, { page }); 
    await And('I enter my phone number, full name, and email address', null, { page }); 
    await And('I accept the terms and conditions', null, { page }); 
    await And('I click the Sign Up button to proceed', null, { page }); 
    await Then('I dismiss the OTP verification by closing the popup', null, { page }); 
    await And('I skip the OTP step', null, { page }); 
    await Then('I should be registered successfully on Shiksha', null, { page }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests\\features\\shiksha_register.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":7,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given I navigate to the Shiksha homepage","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Action","textWithKeyword":"When I click on the Sign Up button","stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":10,"keywordType":"Action","textWithKeyword":"And I enter my phone number, full name, and email address","stepMatchArguments":[]},{"pwStepLine":10,"gherkinStepLine":11,"keywordType":"Action","textWithKeyword":"And I accept the terms and conditions","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":12,"keywordType":"Action","textWithKeyword":"And I click the Sign Up button to proceed","stepMatchArguments":[]},{"pwStepLine":12,"gherkinStepLine":13,"keywordType":"Outcome","textWithKeyword":"Then I dismiss the OTP verification by closing the popup","stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":14,"keywordType":"Outcome","textWithKeyword":"And I skip the OTP step","stepMatchArguments":[]},{"pwStepLine":14,"gherkinStepLine":15,"keywordType":"Outcome","textWithKeyword":"Then I should be registered successfully on Shiksha","stepMatchArguments":[]}]},
]; // bdd-data-end