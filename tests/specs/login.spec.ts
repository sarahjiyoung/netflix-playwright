// tests/specs/login.spec.ts

import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('넷플릭스 로그인 유효성 검사', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  // ── 테스트 1 ──────────────────────────────────────────────
  test('이메일을 입력하지 않으면 오류 메시지가 표시된다', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // 이메일 필드 클릭 후 바로 떠나기 → 빈 값 감지 트리거
     await loginPage.emailInput.click();
    await loginPage.emailInput.blur();

    await expect(loginPage.errorMessage).toBeVisible();
  });

  // ── 테스트 2 ──────────────────────────────────────────────
  test('잘못된 이메일 형식을 입력하면 오류 메시지가 표시된다', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.fillEmail('notanemail');
    await loginPage.clickContinue();

    await expect(loginPage.errorMessage).toBeVisible();
  });

  // ── 테스트 3 ──────────────────────────────────────────────
  test('존재하지 않는 이메일로 시도하면 오류 메시지가 표시된다', async ({ page }) => {
    test.skip(true, '넷플릭스 reCAPTCHA 봇 감지로 인해 자동화 테스트 불가');
  });
});