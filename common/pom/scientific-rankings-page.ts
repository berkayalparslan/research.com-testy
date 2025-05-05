import { Locator, Page } from "@playwright/test";

export class ScientificRankingsPage {
  readonly page: Page;
  readonly rankingHeader: Locator;
  readonly rankingTable: Locator;
  readonly rankingTableItems: Locator;
  readonly searchBar: Locator;
  readonly searchSubmitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.rankingHeader = page.locator(".rankings-top h1");
    this.rankingTable = page.locator("div#rankingItems");
    this.rankingTableItems = this.rankingTable.locator(".scientist-item");
    this.searchBar = page.locator("input#searchQuery");
    this.searchSubmitButton = page
      .locator("form#searchRanking")
      .locator('button[aria-label="Search"]')
      .last();
  }

  async gotoRanking(category: string, discipline: string, country?: string) {
    await this.page.goto(
      `/${category}-rankings/${discipline}${country ? `/${country}` : ""}`
    );
  }

  async openScientistProfile(scientistName: string) {
    await this.rankingTableItems
      .filter({ hasText: scientistName })
      .first()
      .getByRole("link", { name: scientistName })
      .click();
  }

  async searchByKeyword(keyword: string) {
    await this.searchBar.fill(keyword);
    //unexpected behaviour,  page refreshes in automation tests on click, manually it does not
    await this.searchSubmitButton.click();
  }
}
