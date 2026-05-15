import { test, expect } from '@playwright/test';
import { PlanPage } from '../pages/PlanPage';

test.describe('넷플릭스 플랜 및 언어 테스트', () => {

  test.beforeEach(async ({ page }) => {
    const planPage = new PlanPage(page);
    await planPage.goto();
  });

  // ── 테스트 1 ──────────────────────────────────────────────
  test('언어를 영어로 변경하면 제목이 영어로 바뀐다', async ({ page }) => {
    const planPage = new PlanPage(page);

    // 영어로 변경
    await planPage.changeLanguage('en-KR');

    // 영어로 바뀐 제목 확인
    await expect(page.getByRole('heading', { level: 1 }))
      .toHaveText(/Unlimited/);
  });

  // ── 테스트 2 ──────────────────────────────────────────────
  test('메인 페이지에 이메일 입력창이 존재한다', async ({ page }) => {
    // first() = 페이지에서 첫 번째로 나오는 것만 선택
    const emailInput = page.getByRole('textbox', { name: '이메일 주소' }).first();
    await expect(emailInput).toBeVisible();
  });

  // ── 테스트 3 ──────────────────────────────────────────────
  test('시작하기 버튼이 존재한다', async ({ page }) => {
    // first() = 페이지에서 첫 번째로 나오는 것만 선택
    const startButton = page.getByRole('button', { name: '시작하기' }).first();
    await expect(startButton).toBeVisible();
  });

  // ── 테스트 4 ──────────────────────────────────────────────
  test('자주 묻는 질문 섹션이 존재한다', async ({ page }) => {
    const faqHeading = page.getByRole('heading', { name: '자주 묻는 질문' });
    await expect(faqHeading).toBeVisible();
  });

  // ── 테스트 5 ──────────────────────────────────────────────
  test('FAQ 항목 클릭 시 내용이 펼쳐진다', async ({ page }) => {
    const firstFaq = page.getByRole('button', { name: '넷플릭스란 무엇인가요?' });

    // 클릭 전 확인
    await expect(firstFaq).toBeVisible();

    // 클릭
    await firstFaq.click();

    // 클릭 후 내용이 펼쳐지는지 확인
    // aria-expanded = 펼쳐진 상태를 나타내는 HTML 표준 속성
    await expect(firstFaq).toHaveAttribute('aria-expanded', 'true');
  });
});