// tests/pages/LoginPage.ts

import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly continueButton: Locator;  // "다음" 버튼 (1단계)
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    // placeholder 대신 label 텍스트로 찾기
    this.emailInput = page.getByLabel('이메일 주소 또는 휴대폰 번호');
    this.continueButton = page.getByRole('button', { name: '다음' });

    // 오류 메시지를 두 가지 선택자로 대응
    // first() = 둘 중 먼저 나타나는 것을 사용
    this.errorMessage = page.locator([
        '[data-uia="field-userLoginId+validationMessage"]',
        '[data-uia="login-field-error"]',
    ].join(', ')).first();
  }

  async goto() {
    await this.page.goto('/kr/login');
  }

  async fillEmail(email: string) {
    await this.emailInput.fill(email);
  }

  async clickContinue() {
    await this.continueButton.click();
  }
}