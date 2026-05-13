Feature: Forum questions

  # Shared precondition for TC_FQ_01–15: logged in and on Discussions page.
  Background:
    Given I am logged in
    And I am on the Discussions page

  # Covers: TC_FQ_01, TC_FQ_02, TC_FQ_03, TC_FQ_04, TC_FQ_05, TC_FQ_15
  # TC_FQ_05 is a known bug; the step records the defect instead of hard-failing.
  @forum @positive
  Scenario Outline: Ask and answer a question
    When I post a question "<question>"
    Then I should see the question text
    When I follow the question and post an answer "<answer>"
    Then I refresh and record if the answer is missing

    Examples:
      | question                                                      | answer                                                                                           |
      | What is the criter for eligibility in medical courses test? | Eligibility varies, but generally includes NEET qualification and 10+2 with required subjects. |

  # Covers: TC_FQ_06 (delete), TC_FQ_07 (repost error-page bug)
  @forum @repost @bug
  Scenario Outline: Repost the same question after deletion
    When I post a question "<question>"
    Then I should see the question text
    When I delete the question
    And I open the Ask dialog
    And I navigate back to the Discussions page
    And I post the same question again
    Then I record a bug if the page is not found

    Examples:
      | question                                                     |
      | This is a test qu with deletion and reposting out oofff |

  # Covers: TC_FQ_08
  @forum @negative @deletion @direct-url
  Scenario Outline: Accessing a deleted question URL shows page not found
    When I post a question "<question>"
    Then I should see the question text
    And I save the current question URL
    When I delete the question
    And I open the Ask dialog
    And I navigate directly to the saved question URL
    Then I should see the page not found message

    Examples:
      | question                                                  |
      | This is a teitu question for direct URL deletion check     |

  # Covers: TC_FQ_09
  @forum @negative @deletion @cancel
  Scenario Outline: Cancelling the delete confirmation keeps the question intact
    When I post a question "<question>"
    Then I should see the question text
    When I open the delete confirmation modal
    And I cancel the deletion
    Then I should see the question text

    Examples:
      | question                                             |
      | This is a test question for cancell deletion check    |

  # Covers: TC_FQ_10
  @forum @negative @deletion @double-delete
  Scenario Outline: Delete controls are unavailable after a question is deleted
    When I post a question "<question>"
    Then I should see the question text
    When I delete the question
    Then the more options button should not be present on the page

    Examples:
      | question                                             |
      | This is a test question for doubllee delete check      |

  # Covers: TC_FQ_11
  @forum @negative @navigation @invalid-url
  Scenario: Navigating to an invalid discussion URL shows page not found
    When I navigate to an invalid discussion URL
    Then I should see the page not found message


  # Covers: TC_FQ_12
  @forum @negative @validation @blank-question
  Scenario: Submitting a blank question is rejected
    When I post a question ""
    Then I should see the question required error

  # Covers: TC_FQ_13
  @forum @negative @validation @whitespace-question
  Scenario: Submitting a whitespace-only question is rejected
    When I post a question "     "
    Then I should see the question required error

  # Covers: TC_FQ_14
  @forum @negative @validation @blank-answer
  Scenario: Submitting a blank answer is rejected
    When I post a question "Blank answer validation questionn"
    Then I should see the question text
    When I follow the question and post an answer ""
    Then I should see the answer required error
