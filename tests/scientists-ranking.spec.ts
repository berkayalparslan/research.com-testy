import { expect } from "@playwright/test";
import { test } from "../common/fixture";

test("Scientists ranking should load scientists list correctly", async ({
  scientificRankingsPage,
  rankingsPage,
  userProfilePage,
}) => {
  await rankingsPage.goto();

  //#region show scientists ranking
  await rankingsPage.showRanking({
    rankingCategory: "Best Scientists in the World",
    discipline: "Computer Science",
  });

  await expect(scientificRankingsPage.rankingTable).toBeVisible();
  await expect(await scientificRankingsPage.rankingTableItems.count()).toEqual(
    100
  );
  await expect(scientificRankingsPage.rankingTableItems.first()).toContainText(
    "Yoshua Bengio"
  );
  await expect(scientificRankingsPage.rankingTableItems.first()).toContainText(
    "University of Montreal, Canada"
  );
  await expect(scientificRankingsPage.rankingTableItems.last()).toContainText(
    "Vince D. Calhoun"
  );
  await expect(scientificRankingsPage.rankingTableItems.last()).toContainText(
    "Georgia State University, United States"
  );
  //#endregion

  //#region open scientist profile
  await scientificRankingsPage.openScientistProfile("Yoshua Bengio");

  await expect(userProfilePage.fullName).toContainText("Yoshua Bengio");
  await expect(userProfilePage.location).toContainText(
    "University of Montreal"
  );
  await expect(userProfilePage.location).toContainText("Canada");
  await expect(
    userProfilePage.badgesList.getByAltText('Research.com 2024 Best Scientist Award Badge')
  ).toBeVisible();
  await expect(
    userProfilePage.badgesList
  ).toContainText('Computer Science');
  await expect(
    userProfilePage.badgesList
  ).toContainText('Canada');
  await expect(
    userProfilePage.badgesList
  ).toContainText('2025');

  await expect(
    userProfilePage.metricsTable
  ).toContainText('Computer Science');
  await expect(
    userProfilePage.metricsTable
  ).toContainText("Best Scientists");
  await expect(
    userProfilePage.achievementsList
  ).toContainText("2025 - Research.com Computer Science in Canada Leader Award");
  await expect(
    userProfilePage.achievementsList
  ).toContainText("2017 - Prix Marie-Victorin, Government of Quebec")
  await expect(
    userProfilePage.publicationsList
  ).toContainText("Deep learning");
  await expect(
    userProfilePage.publicationsList).toContainText("Yann LeCun;Yann LeCun;Yoshua Bengio;Geoffrey Hinton;Geoffrey Hinton.")
    await expect(
      userProfilePage.publicationsList).toContainText("Nature (2015)")
  //#endregion
});
