import { expect } from "@playwright/test";
import { test } from "../common/fixture";

test("Scientists ranking search bar should display the searched scientist on the list", async ({
  scientificRankingsPage,
  rankingsPage,
  userProfilePage,
}) => {
  //#region show scientists ranking, then search scientist using searchbar
  await rankingsPage.goto();
  await rankingsPage.showRanking({
    rankingCategory: "Best Scientists in the World",
    discipline: "Computer Science",
  });
  await scientificRankingsPage.searchByKeyword("Joel J. P. C. Rodrigues");

  await expect(scientificRankingsPage.rankingTableItems.filter({hasText: "Joel J. P. C. Rodrigues"})).toBeVisible({timeout: 10000});
  await expect(
    await scientificRankingsPage.rankingTableItems.count()
  ).toEqual(1);
  await expect(
    scientificRankingsPage.rankingTableItems.first()
  ).toContainText("Joel J. P. C. Rodrigues");
  await expect(
    scientificRankingsPage.rankingTableItems.first()
  ).toContainText("Federal University of Piauí, Brazil");
  //#endregion

  //#region open scientist profile
  await scientificRankingsPage.openScientistProfile("Joel J. P. C. Rodrigues");

    await expect(userProfilePage.fullName).toContainText("Joel J. P. C. Rodrigues");
    await expect(userProfilePage.location).toContainText(
      "Federal University of Piauí"
    );
    await expect(userProfilePage.location).toContainText("Brazil");
    await expect(
      userProfilePage.badgesList
    ).toContainText('Computer Science');
    await expect(
      userProfilePage.badgesList
    ).toContainText('Brazil');
    await expect(
      userProfilePage.badgesList
    ).toContainText('2025');
    await expect(
      userProfilePage.metricsTable
    ).toContainText('Computer Science')
    await expect(
      userProfilePage.publicationsList
    ).toContainText('Mobile-health');
    await expect(
      userProfilePage.publicationsList
    ).toContainText('Bruno M.C. Silva;Joel J.P.C. Rodrigues;Isabel de la Torre Díez;Miguel López-Coronado.');
    await expect(
      userProfilePage.publicationsList
    ).toContainText('Journal of Biomedical Informatics (2015)');
  //#endregion
});
