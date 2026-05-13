// Generated from: tests\features\shiksha_study_abroad.feature
import { test } from "playwright-bdd";

test.describe('Shiksha Study Abroad - Top Universities', () => {

  test('Explore Top Universities Abroad, download brochure and compare universities', async ({ Given, When, Then, And, page }) => { 
    await Given('I am on the Shiksha homepage', null, { page }); 
    await When('I click on Study Abroad and select Top Universities Abroad', null, { page }); 
    await Then('I should land on the Top Universities Abroad page', null, { page }); 
    await When('I scroll to find the target university in the ranked list', null, { page }); 
    await And('I click the Download Brochure button for the target university', null, { page }); 
    await And('I select the second course from the course dropdown', null, { page }); 
    await And('I fill in my details in the brochure lead form', null, { page }); 
    await And('I submit the brochure form', null, { page }); 
    await Then('I should see a brochure download confirmation', null, { page }); 
    await When('I click the go back link to return to the university list', null, { page }); 
    await And('I click on the 5th ranked university', null, { page }); 
    await Then('the university detail page should open', null, { page }); 
    await When('I click the Compare button on the university page', null, { page }); 
    await And('I click Compare Now', null, { page }); 
    await Then('the comparison view should be displayed', null, { page }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests\\features\\shiksha_study_abroad.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":6,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given I am on the Shiksha homepage","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Action","textWithKeyword":"When I click on Study Abroad and select Top Universities Abroad","stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":9,"keywordType":"Outcome","textWithKeyword":"Then I should land on the Top Universities Abroad page","stepMatchArguments":[]},{"pwStepLine":10,"gherkinStepLine":10,"keywordType":"Action","textWithKeyword":"When I scroll to find the target university in the ranked list","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":11,"keywordType":"Action","textWithKeyword":"And I click the Download Brochure button for the target university","stepMatchArguments":[]},{"pwStepLine":12,"gherkinStepLine":12,"keywordType":"Action","textWithKeyword":"And I select the second course from the course dropdown","stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":13,"keywordType":"Action","textWithKeyword":"And I fill in my details in the brochure lead form","stepMatchArguments":[]},{"pwStepLine":14,"gherkinStepLine":14,"keywordType":"Action","textWithKeyword":"And I submit the brochure form","stepMatchArguments":[]},{"pwStepLine":15,"gherkinStepLine":15,"keywordType":"Outcome","textWithKeyword":"Then I should see a brochure download confirmation","stepMatchArguments":[]},{"pwStepLine":16,"gherkinStepLine":16,"keywordType":"Action","textWithKeyword":"When I click the go back link to return to the university list","stepMatchArguments":[]},{"pwStepLine":17,"gherkinStepLine":17,"keywordType":"Action","textWithKeyword":"And I click on the 5th ranked university","stepMatchArguments":[]},{"pwStepLine":18,"gherkinStepLine":18,"keywordType":"Outcome","textWithKeyword":"Then the university detail page should open","stepMatchArguments":[]},{"pwStepLine":19,"gherkinStepLine":19,"keywordType":"Action","textWithKeyword":"When I click the Compare button on the university page","stepMatchArguments":[]},{"pwStepLine":20,"gherkinStepLine":20,"keywordType":"Action","textWithKeyword":"And I click Compare Now","stepMatchArguments":[]},{"pwStepLine":21,"gherkinStepLine":21,"keywordType":"Outcome","textWithKeyword":"Then the comparison view should be displayed","stepMatchArguments":[]}]},
]; // bdd-data-end