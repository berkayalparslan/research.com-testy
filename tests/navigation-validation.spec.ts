import { expect } from "@playwright/test";
import { test } from "../common/fixture";
import { rankingCategories } from "../test-data/navigation-validation.data";

test.describe("Rankings page", async () => {
  test.beforeEach(async ({ rankingsPage }) => {
    await rankingsPage.goto();
  });

rankingCategories.forEach(({ testName, category, discipline, country, expectedRankingHeader, expectedUrl }) => {
    test(testName, async ({ rankingsPage, scientificRankingsPage }) => {
      await rankingsPage.showRanking({
        rankingCategory: category,
        discipline,
        country,
      });
      await expect(scientificRankingsPage.rankingHeader).toContainText(
        expectedRankingHeader
            );
      await expect(scientificRankingsPage.rankingTable).toBeVisible();
      await expect(scientificRankingsPage.page.url()).toContain(expectedUrl);
    });
  })

  test("should navigate to best online colleges rankings for each state", async ({
    page
  }) => {
    const statesListElements = page.locator('div > p').filter({hasText: 'UNIVERSITIES & COLLEGES BY STATE'}).locator('+h2').locator('+ul li a');
    const allStates = await statesListElements.all();

    for(const state of allStates) {
      const stateName = await state.textContent();
      const stateLinkHref = await state.getAttribute('href');
      await state.click();

      await expect(page.locator('.blog-post h1')).toContainText(`2024 Best Online Colleges Programs Ranking in ${stateName}`);
      await expect(page.url()).toContain(stateLinkHref);

      await page.goBack();
    }
  })


});
