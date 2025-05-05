import { Locator, Page } from "@playwright/test"

export class UserProfilePage{
    readonly page: Page;
    readonly fullName: Locator;
    readonly location: Locator;
    readonly badgesList: Locator;
    readonly metricsTable:Locator;
    readonly achievementsList: Locator;
    readonly publicationsList: Locator;

    constructor(page:Page) {
        this.page = page;
        this.fullName = page.locator('div.profile-head__info__text');
        this.location = page.locator('div.profile-head__info__location');
        this.badgesList = page.locator('div.profile-badges');
        this.metricsTable = page.locator('div.metrics-table');
        this.achievementsList = page.locator('div.profile-achievements');
        this.publicationsList = page.locator('div.profile-publications');
    }

    getDiscipline(discipline: string) {
        return this.metricsTable.locator(`div:has-text("${discipline}")`);
    }

    getAchievement(achievement: string) {
        return this.achievementsList.locator(`p:has-text("${achievement}")`);
    }

    getPublication(title: string, authors:string) {
        return this.publicationsList.locator('div.profile-publications__left').filter({hasText: title}).filter({hasText: authors});
    }
}