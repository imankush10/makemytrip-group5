Feature: Shiksha Write Review

    End to end review submission flow on Shiksha

    @review
    Scenario: Submit a college review with valid and invalid mobile number

        Given launch shiksha home page for review
        When click on write review link

        And fill email
        And fill full name
        And select gender
        And fill college name and select first suggestion
        And select location
        And fill course and select first option
        And select graduation year
        And fill upi
        And uncheck terms and conditions
        And fill invalid mobile number
        And click next
        Then error message should contain phone number limit warning

        When fill valid mobile number
        And click next

        And fill review in section "1"
        And select 5 star rating in section "1"
        And fill review in section "2"
        And select 5 star rating in section "2"
        And fill review in section "3"
        And select 5 star rating in section "3"
        And select 5 star rating for both inputs in section "4"
        And fill short comment in section "5"
        And fill fee amount in section "6"
        And check yes for recommendation in section "7"
        And fill additional comments in section "9"
        And click submit

        Then take screenshot "review_submission.png"
