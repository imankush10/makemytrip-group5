Feature: Counselling Career Selection

    End to end navigation through counselling section on Shiksha

    @counselling
    Scenario: Navigate to science careers and verify choice selection

        Given launch shiksha home page for counselling

        When click on counselling tab
        And open careers after 12th section
        And click on science link
        Then stream heading should contain "Science"

        When select max allowed choices
        Then remaining choices should be disabled
        And selected choices should appear in selection list

        When click continue
        Then careers found count should be valid

        When go back to choices
        And close the selection popup
        And click continue again
        Then careers found count should be valid
        Then take a screenshot couns "counselling_submission.png"