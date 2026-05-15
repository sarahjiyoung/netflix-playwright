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

  // ── 테스트 4 ──────────────────────────────────────────────
  test('올바른 계정으로 로그인하면 홈 화면으로 이동한다', async ({ page }) => {
    // 메인 페이지에서 시작
    await page.goto('/kr/');

    const email = process.env.NETFLIX_EMAIL!;
    const password = process.env.NETFLIX_PASSWORD!;

    // 메인 페이지 이메일 입력
    const emailInput = page.getByRole('textbox', { name: '이메일 주소' }).first();
    await emailInput.fill(email);

    // 시작하기 버튼 클릭
    await page.getByRole('button', { name: '시작하기' }).first().click();

    // 비밀번호 입력창 대기 후 입력
    const passwordInput = page.locator('[data-uia="field-password"]');
    await expect(passwordInput).toBeVisible({ timeout: 10000 });
    await passwordInput.fill(password);

    // 로그인 버튼 클릭
    await page.getByRole('button', { name: '로그인', exact: true }).click();

    // 로그인 성공 시 프로필 선택 또는 browse로 이동
    await expect(page).toHaveURL(/browse|SwitchProfile|ManageProfiles/, { timeout: 15000 });

    // 프로필 선택 화면 확인
    // const profileHeading = page.getByRole('heading', { name: /프로필을 선택|Who's watching/ });
    // await expect(profileHeading).toBeVisible({ timeout: 15000 });

    // 첫 번째 프로필 선택 (졍이)
    await page.locator('[data-uia="action-select-profile+primary"]').click();

    // 최종적으로 browse 페이지로 이동 확인
    await expect(page).toHaveURL(/browse/, { timeout: 10000 })
  });
});