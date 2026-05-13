const { expect } = require("@playwright/test");

class CoursesPage {
  constructor(page) {
    this.page = page;
  }

  async openFilterModal() {
    await this.page.locator("#filterChip").click();
    const popup = this.page
      .locator("#popup-container .dialog-popup__modal")
      .first();
    await popup.waitFor({ state: "visible", timeout: 30000 });
  }

  async closeFilterModalIfOpen() {
    const popup = this.page
      .locator("#popup-container .dialog-popup__modal")
      .first();
    const isVisible = await popup.isVisible().catch(() => false);
    if (!isVisible) {
      return;
    }

    const cancelButton = popup.getByRole("button", { name: "Cancel" }).first();
    if ((await cancelButton.count()) > 0) {
      await cancelButton.click();
      await popup.waitFor({ state: "hidden", timeout: 30000 });
      return;
    }

    const applyButton = popup
      .getByRole("button", { name: "Apply Filters" })
      .first();
    if ((await applyButton.count()) > 0) {
      await applyButton.click();
      await popup.waitFor({ state: "hidden", timeout: 30000 });
    }
  }

  async ensureFilterModalOpen() {
    const popup = this.page
      .locator("#popup-container .dialog-popup__modal")
      .first();
    const isVisible = await popup.isVisible().catch(() => false);
    if (!isVisible) {
      await this.openFilterModal();
    }
  }

  async applyCourseFiltersByLabels(stream, degree, mode) {
    const popup = this.page
      .locator("#popup-container .dialog-popup__modal")
      .first();
    await this.ensureFilterModalOpen();
    await popup.waitFor({ state: "visible", timeout: 30000 });

    const filterTabs = popup.locator(".ee1075 li");

    const ensurePopupOpen = async () => {
      const isVisible = await popup.isVisible();
      if (!isVisible) {
        throw new Error(
          "Modal closed unexpectedly during filter selection. Check for backdrop click or idle timeout.",
        );
      }
    };

    const openFilterGroup = async (label, filterType) => {
      await ensurePopupOpen();

      let tab;
      if (filterType) {
        const byType = filterTabs.filter({
          has: popup.locator(`[data-filtertype='${filterType}']`),
        });
        if ((await byType.count()) > 0) {
          tab = byType.first();
        }
      }

      if (!tab) {
        tab = filterTabs.filter({ hasText: label }).first();
      }

      await tab.evaluate((el) =>
        el.scrollIntoView({ block: "nearest", behavior: "instant" }),
      );
      await tab.click();
      await this.page.waitForTimeout(300);
    };

    const selectPopupCheckbox = async (labelText) => {
      await ensurePopupOpen();

      const checkbox = popup.getByLabel(labelText).first();
      if ((await checkbox.count()) === 0) {
        return false;
      }
      await checkbox.waitFor({ state: "visible", timeout: 30000 });
      await checkbox.evaluate((el) => el.click());
      await expect(checkbox).toBeChecked({ timeout: 10000 });
      return true;
    };

    let missing = null;

    if (stream) {
      const selected = await selectPopupCheckbox(stream);
      if (!selected) {
        return { missing: stream };
      }
    }

    if (degree) {
      await openFilterGroup("Course", "base_course");
      const selected = await selectPopupCheckbox(degree);
      if (!selected) {
        return { missing: degree };
      }
    }

    if (mode) {
      await openFilterGroup("Mode of Study", "et_dm");
      const selected = await selectPopupCheckbox(mode);
      if (!selected) {
        return { missing: mode };
      }
    }

    await ensurePopupOpen();

    await Promise.all([
      this.page.waitForLoadState("domcontentloaded"),
      popup.getByRole("button", { name: "Apply Filters" }).click(),
    ]);

    return { missing: null };
  }

  async selectStreamFilterWithoutApplying(stream) {
    const popup = this.page
      .locator("#popup-container .dialog-popup__modal")
      .first();
    await this.ensureFilterModalOpen();
    await popup.waitFor({ state: "visible", timeout: 30000 });
    const checkbox = popup.getByLabel(stream).first();
    await checkbox.waitFor({ state: "visible", timeout: 30000 });
    await checkbox.evaluate((el) => el.click());
  }

  async clickModalBackdrop() {
    const popupContainer = this.page.locator("#popup-container").first();
    const isVisible = await popupContainer.isVisible().catch(() => false);
    if (!isVisible) {
      return;
    }
    const box = await popupContainer.boundingBox();
    if (box) {
      await this.page.mouse.click(box.x + 5, box.y + 5);
      return;
    }
    await this.page.mouse.click(5, 5);
  }

  async cancelFilterModal() {
    const popup = this.page
      .locator("#popup-container .dialog-popup__modal")
      .first();
    await this.ensureFilterModalOpen();
    await popup.waitFor({ state: "visible", timeout: 30000 });

    const cancelButton = popup.getByRole("button", { name: "Cancel" }).first();
    if ((await cancelButton.count()) > 0) {
      await cancelButton.click();
      return;
    }

    const closeButton = popup
      .locator(
        ".close,.cross,.close-icon,.ico-close,button[aria-label='Close']",
      )
      .first();
    await closeButton.waitFor({ state: "visible", timeout: 30000 });
    await closeButton.click();
  }

  async waitForModalClosed() {
    const popup = this.page
      .locator("#popup-container .dialog-popup__modal")
      .first();
    await popup.waitFor({ state: "hidden", timeout: 30000 });
  }

  async openCourseByLabel(degree) {
    await this.closeFilterModalIfOpen();
    const courseLink = this.page.locator(
      `a[uilpwidgetname='acp_section_all_programs'][widgetspecificlabel='${degree}']`,
    );
    await this.page.waitForLoadState("domcontentloaded");
    await courseLink.first().waitFor({ state: "visible", timeout: 30000 });
    await courseLink.first().click();
  }

  async waitForNoCoursesMessage() {
    const emptyState = this.page.locator(
      "text=/no courses found|no results|0 results/i",
    );
    await emptyState.first().waitFor({ state: "visible", timeout: 30000 });
  }

  async applyCourseFilters() {
    await this.page.locator("#filterChip").click();

    const popup = this.page
      .locator("#popup-container .dialog-popup__modal")
      .first();
    await popup.waitFor({ state: "visible", timeout: 30000 });

    const filterTabs = popup.locator(".ee1075 li");

    const ensurePopupOpen = async () => {
      const isVisible = await popup.isVisible();
      if (!isVisible) {
        throw new Error(
          "Modal closed unexpectedly during filter selection. Check for backdrop click or idle timeout.",
        );
      }
    };

    const openFilterGroup = async (label, filterType) => {
      await ensurePopupOpen();

      let tab;
      if (filterType) {
        const byType = filterTabs.filter({
          has: popup.locator(`[data-filtertype='${filterType}']`),
        });
        if ((await byType.count()) > 0) {
          tab = byType.first();
        }
      }

      if (!tab) {
        tab = filterTabs.filter({ hasText: label }).first();
      }

      // FIX 1: Scroll WITHIN the modal scroll container, not the whole page.
      await tab.evaluate((el) =>
        el.scrollIntoView({ block: "nearest", behavior: "instant" }),
      );
      await tab.click();

      // Small pause only to let tab panel re-render, no longer 1000ms.
      await this.page.waitForTimeout(300);
    };

    const selectPopupCheckbox = async (labelText) => {
      await ensurePopupOpen();

      const checkbox = popup.getByLabel(labelText).first();
      await checkbox.waitFor({ state: "visible", timeout: 30000 });

      // FIX 2: Use dispatchEvent to avoid click bubbling to backdrop.
      // If the label wraps the input, a normal .click() fires on the label
      // element which can bubble up and hit the modal overlay.
      await checkbox.evaluate((el) => el.click());

      await expect(checkbox).toBeChecked({ timeout: 10000 });
    };

    await selectPopupCheckbox("Medicine & Health Sciences");

    await openFilterGroup("Course", "base_course");
    await selectPopupCheckbox("MBBS");

    await openFilterGroup("Mode of Study", "et_dm");
    await selectPopupCheckbox("Full Time");

    await openFilterGroup("Course Level", "course_level");
    await selectPopupCheckbox("UG");

    await openFilterGroup("Location", "location");
    await selectPopupCheckbox("Bangalore");

    await openFilterGroup("Total Fees", "fees");
    await selectPopupCheckbox("> 15 Lakh");

    await openFilterGroup("Exams Accepted", "exam");
    await selectPopupCheckbox("NEET");

    await openFilterGroup("Rating", "review");
    await selectPopupCheckbox("4 - 5 Star");

    await ensurePopupOpen();

    await Promise.all([
      this.page.waitForLoadState("domcontentloaded"),
      popup.getByRole("button", { name: "Apply Filters" }).click(),
    ]);
  }

  async openMbbsCourse() {
    const mbbsCourseLink = this.page.locator(
      "a[uilpwidgetname='acp_section_all_programs'][widgetspecificlabel='MBBS']",
    );
    await this.page.waitForLoadState("domcontentloaded");
    await mbbsCourseLink.first().waitFor({ state: "visible", timeout: 30000 });
    await mbbsCourseLink.first().click();
  }
}

module.exports = { CoursesPage };
