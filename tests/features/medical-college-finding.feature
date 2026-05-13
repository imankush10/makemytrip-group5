Feature: Medical college course discovery

  # Shared precondition for all medical college tests
  Background:
    Given I open the Shiksha homepage
    And I navigate to the Top Medical Colleges ranking page

  # Covers: TC_MCD_01, TC_MCD_02, TC_MCD_03, TC_MCD_04, TC_MCD_05
  @medical @ranking @positive
  Scenario Outline: Filter and select a top medical college
    When I apply the single ranking filter "<city>"
    Then the college list should update based on the city
    When I apply multiple ranking filters "<fees>", "<reviews>", "<ownership>", "<exam>"
    And I clear the "<ownership>" filter
    And I open the first college result
    Then I should land on the correct college detail page

    Examples:
      | city      | fees | reviews | ownership | exam |
      | Bangalore | f5   | r4      | private   | NEET |

  # Covers: TC_MCD_06, TC_MCD_07, TC_MCD_08, TC_MCD_09, TC_MCD_10, TC_MCD_11
  @medical @courses @positive
  Scenario Outline: Discover specific MBBS course via college page
    Given I am on a filtered medical college page
    When I open the Courses tab
    And I open the course filter modal
    And I apply course filters "<stream>", "<degree>", "<mode>"
    Then the course list should show the filtered programs
    When I open the specific "<degree>" course page
    Then the primary CTA buttons should be visible

    Examples:
      | stream                     | degree | mode      |
      | Medicine & Health Sciences | MBBS   | Full Time |

  # Covers: TC_MCD_13
  @medical @navigation @negative @invalid-url
  Scenario: Navigating to an invalid college URL shows page not found
    When I navigate directly to an invalid college URL
    Then I should see the page not found message

  # Covers: TC_MCD_14
  @medical @courses @negative @empty-state
  Scenario Outline: Filtering for a non-existent course shows empty state
    Given I am on the Courses tab of a medical college
    When I apply course filters "<stream>", "<degree>", "<mode>"
    Then I should see a no courses found message

    Examples:
      | stream   | degree           | mode      |
      | Aviation | Commercial Pilot | Full Time |

  # Covers: TC_MCD_15
  @medical @courses @negative @modal-dismiss
  Scenario Outline: Cancelling the course filter modal ignores selections
    Given I am on the Courses tab of a medical college
    When I open the course filter modal
    And I select the "<stream>" filter without saving
    And I cancel the course filter modal
    Then the filter modal should close
    And the course list should remain unfiltered

    Examples:
      | stream                     |
      | Medicine & Health Sciences |
