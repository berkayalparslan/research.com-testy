import { test as base } from "@playwright/test";
import { RankingsPage } from "./pom/rankings-page";
import { ScientificRankingsPage } from "./pom/scientific-rankings-page";
import { UserProfilePage } from "./pom/user-profile-page";

type PageObjectModels = {
  scientificRankingsPage: ScientificRankingsPage;
  rankingsPage: RankingsPage;
  userProfilePage: UserProfilePage;
};

export const test = base.extend<PageObjectModels>({
  scientificRankingsPage: async ({ page }, use) => {
    const scientificRankingsPage = new ScientificRankingsPage(page);
    await use(scientificRankingsPage);
  },
  rankingsPage: async ({ page }, use) => {
    const rankingsPage = new RankingsPage(page);
    await use(rankingsPage);
  },
  userProfilePage: async ({ page }, use) => {
    const userPage = new UserProfilePage(page);
    await use(userPage);
  },
});
