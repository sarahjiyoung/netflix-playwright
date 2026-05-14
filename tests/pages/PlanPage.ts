import { Page, Locator } from '@playwright/test';

export class PlanPage {
  readonly page: Page;
  readonly planCards: Locator;
  readonly languageSelector: Locator;

  constructor(page: Page) {
    this.page = page;

    // 요금제 카드 목록
    this.planCards = page.locator('[data-uia="plan-card"]');

    // 언어 선택 드롭다운 (banner 안에 있는 것)
    this.languageSelector = page.getByRole('banner')
      .getByRole('combobox', { name: '언어 선택' });
  }

  async goto() {
    await this.page.goto('/kr/');
  }

  async changeLanguage(value: string) {
    // 'en' 넣으면 영어로 변경
    await this.languageSelector.selectOption(value);
  }
}