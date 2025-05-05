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
});
