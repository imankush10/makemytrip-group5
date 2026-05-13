// Generated from: tests\features\shiksha_exams.feature
import { test } from "playwright-bdd";

test.describe('Shiksha Exams', () => {

  test('Navigate to Scholarship Exams, handle 404, search JEE Advanced and download question paper', async ({ Given, When, Then, And, page }) => { 
    await Given('I am on the Shiksha homepage for exams', null, { page }); 
    await When('I hover over "More" in the navigation bar', null, { page }); 
    await And('I click on "All Scholarship Exams"', null, { page }); 
    await Then('I should see a Page Not Found error', null, { page }); 
    await And('I take a screenshot of the error page', null, { page }); 
    await When('I search for "JEE Advanced" in the top search bar', null, { page }); 
    await Then('I should land on the "JEE Advanced" exam page', null, { page }); 
    await When('I navigate to the Syllabus section', null, { page }); 
    await And('I click on "Download Last 10 Year JEE Advanced Question Paper PDF"', null, { page }); 
    await And('I download the 2023 question paper', null, { page }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests\\features\\shiksha_exams.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":6,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given I am on the Shiksha homepage for exams","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Action","textWithKeyword":"When I hover over \"More\" in the navigation bar","stepMatchArguments":[{"group":{"start":13,"value":"\"More\"","children":[{"start":14,"value":"More","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":9,"gherkinStepLine":9,"keywordType":"Action","textWithKeyword":"And I click on \"All Scholarship Exams\"","stepMatchArguments":[{"group":{"start":11,"value":"\"All Scholarship Exams\"","children":[{"start":12,"value":"All Scholarship Exams","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":10,"gherkinStepLine":10,"keywordType":"Outcome","textWithKeyword":"Then I should see a Page Not Found error","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":11,"keywordType":"Outcome","textWithKeyword":"And I take a screenshot of the error page","stepMatchArguments":[]},{"pwStepLine":12,"gherkinStepLine":12,"keywordType":"Action","textWithKeyword":"When I search for \"JEE Advanced\" in the top search bar","stepMatchArguments":[{"group":{"start":13,"value":"\"JEE Advanced\"","children":[{"start":14,"value":"JEE Advanced","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":13,"gherkinStepLine":13,"keywordType":"Outcome","textWithKeyword":"Then I should land on the \"JEE Advanced\" exam page","stepMatchArguments":[{"group":{"start":21,"value":"\"JEE Advanced\"","children":[{"start":22,"value":"JEE Advanced","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":14,"gherkinStepLine":14,"keywordType":"Action","textWithKeyword":"When I navigate to the Syllabus section","stepMatchArguments":[]},{"pwStepLine":15,"gherkinStepLine":15,"keywordType":"Action","textWithKeyword":"And I click on \"Download Last 10 Year JEE Advanced Question Paper PDF\"","stepMatchArguments":[{"group":{"start":11,"value":"\"Download Last 10 Year JEE Advanced Question Paper PDF\"","children":[{"start":12,"value":"Download Last 10 Year JEE Advanced Question Paper PDF","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":16,"gherkinStepLine":16,"keywordType":"Action","textWithKeyword":"And I download the 2023 question paper","stepMatchArguments":[{"group":{"start":15,"value":"2023","children":[]},"parameterTypeName":"int"}]}]},
]; // bdd-data-end