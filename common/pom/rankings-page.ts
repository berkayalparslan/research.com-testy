import { Locator, Page } from "@playwright/test";

export class RankingsPage{
    readonly page:Page;

    constructor(page: Page) { 
        this.page = page;
    }

    async goto(){
        await this.page.goto('/rankings', {waitUntil: 'domcontentloaded'});
    }

    async showRanking({rankingCategory, discipline, country}: {rankingCategory:string, discipline?:string, country?:string}){
        const rankingCategoryBox = this.page.locator(`.scientists-box:has-text("${rankingCategory}")`).locator('form');
        const disciplineCombobox = rankingCategoryBox.locator('select[name="discipline"]').first();
        const countryCombobox = rankingCategoryBox.locator('select[name="sub-option"]').first();
        const showRankingButton = rankingCategoryBox.locator(`button[type="submit"]`).first();

        if(discipline){
            await disciplineCombobox.selectOption({
                label: discipline
            }, {timeout: 10000});
        }

        if(country){
            await countryCombobox.selectOption({
                label: country
            }, {timeout: 10000});
        }
        await showRankingButton.click();
    }
}