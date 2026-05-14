// tests/pages/NetflixMainPage.ts

import { Page, Locator } from '@playwright/test';
// ↑ Page: 브라우저 탭 하나를 나타내는 타입
//   Locator: 화면의 특정 요소를 가리키는 타입

export class NetflixMainPage {
  // 이 클래스가 사용할 변수들을 미리 선언 (TypeScript 방식)
  // readonly = 한 번 값을 넣으면 바꿀 수 없음. 실수로 덮어쓰는 걸 방지
  readonly page: Page;
  readonly loginButton: Locator;
  readonly emailInput: Locator;
  readonly logo: Locator;
  readonly languageSelector: Locator;

  // constructor: 이 클래스로 객체를 만들 때 처음 실행되는 함수
  // page를 받아서 내부 변수에 저장하고, 각 요소의 위치를 지정해둠
  constructor(page: Page) {
    this.page = page;

    // page.getByRole: 역할(role)로 요소를 찾음. 스크린리더 기준이라 가장 안정적
    this.loginButton = page.getByRole('link', { name: '로그인' });

    // page.getByLabel: <label> 태그와 연결된 input을 찾음
    this.emailInput = page.getByLabel('이메일 주소');

    // 넷플릭스 로고는 <img alt="Netflix"> 가 아니라 SVG로 되어 있어서 수정
    this.logo = page.locator('.nmhp-card-header-logo')

    // page.locator: CSS 선택자로 요소를 찾음 (위 방법으로 못 찾을 때 씀)
    this.languageSelector = page.locator('select.nf-select');
  }

  // 넷플릭스 메인 페이지로 이동
  // async: 이 함수가 시간이 걸리는 작업을 한다는 표시
  async goto() {
    // baseURL이 설정되어 있어서 '/kr/'만 써도 넷플릭스 한국 페이지로 이동
    await this.page.goto('/kr/');
  }

  // 로그인 버튼 클릭
  async clickLogin() {
    await this.loginButton.click();
  }

  // 언어를 바꾸는 함수. value는 바꿀 언어값 (예: 'en' = 영어)
  async changeLanguage(value: string) {
    await this.languageSelector.selectOption(value);
  }

  // 현재 페이지의 타이틀(탭에 보이는 제목)을 반환
  async getTitle() {
    return this.page.title();
  }
}