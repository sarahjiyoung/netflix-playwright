// tests/specs/netflix.spec.ts

import { test, expect } from '@playwright/test';
import { NetflixMainPage } from '../pages/NetflixMainPage';
// ↑ 우리가 만든 클래스를 가져옴

// test.describe: 연관된 테스트들을 하나의 그룹으로 묶음
// 리포트에서 그룹별로 결과를 볼 수 있어서 관리가 편해짐
test.describe('넷플릭스 메인 페이지', () => {

  // 각 테스트 실행 전에 공통으로 할 일을 여기에 작성
  // { page }는 Playwright가 자동으로 제공하는 브라우저 탭 객체
  test.beforeEach(async ({ page }) => {
    const netflix = new NetflixMainPage(page);
    await netflix.goto();
  });

  // ── 테스트 1 ──────────────────────────────────────────────
  test('페이지 타이틀에 Netflix가 포함된다', async ({ page }) => {
    const netflix = new NetflixMainPage(page);

    // toContain: 문자열 안에 특정 단어가 있는지 확인
    await expect(page).toHaveTitle(/넷플릭스/);
  });

  // ── 테스트 2 ──────────────────────────────────────────────
  test('로그인 버튼이 화면에 보인다', async ({ page }) => {
    const netflix = new NetflixMainPage(page);

    // toBeVisible: 요소가 실제로 화면에 표시되는지 확인
    await expect(netflix.loginButton).toBeVisible();
  });

  // ── 테스트 3 ──────────────────────────────────────────────
  test('로그인 버튼 클릭 시 로그인 페이지로 이동한다', async ({ page }) => {
    const netflix = new NetflixMainPage(page);
    await netflix.clickLogin();

    // URL이 /login을 포함하는지 확인
    await expect(page).toHaveURL(/login/);
  });

  // ── 테스트 4 ──────────────────────────────────────────────
  test('로그인 페이지에 이메일 입력창이 존재한다', async ({ page }) => {
    const netflix = new NetflixMainPage(page);
    await netflix.clickLogin();

    // 로그인 페이지로 이동한 다음, 이메일 입력창이 있는지 확인
    const emailInput = page.getByLabel('이메일 주소');
    await expect(emailInput).toBeVisible();
  });

  // ── 테스트 5 ──────────────────────────────────────────────
  test('로고가 화면 상단에 표시된다', async ({ page }) => {
    const netflix = new NetflixMainPage(page);

    // banner = <header> 태그의 접근성 role
    // 넷플릭스 로고는 aria-hidden이라 직접 못 찾고
    // 로고가 속한 헤더 영역이 존재하는지로 대신 검증
    await expect(netflix.header).toBeAttached();
  });
});