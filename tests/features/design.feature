Feature: Design College Navigation

    End to end navigation through the design college section on Shiksha

    @design
    Scenario: Navigate design section and verify game design content

        Given launch shiksha home page

        When click on design tab
        And open popular specializations
        And click on game design
        Then page heading should contain "Game Design"

        When scroll and click programs in trending widget
        And click trending widget dropdown
        And select UG from dropdown
        And click next page in trending widget
        Then last percentage value should be "0.01"

        When click view all exams button
        Then exam popup second last entry should contain "CUSAT CAT"
        When close the exam popup

        Then at least one popular course should have rating above "4.5"

        When click on all comments link
        Then page heading should contain "Game design"
        When navigate back

        When click on design tab
        And open exams section
        And click all design exams link
        And click last pagination button
        Then last exam on page should contain "CUCET Chandigarh University"
        When navigate back twice
        Then page heading should contain "Game Design"
        Then take a screenshot desg "design_submission.png"
