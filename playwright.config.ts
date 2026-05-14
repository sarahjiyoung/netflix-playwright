// playwright.config.ts

import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // 테스트 파일이 있는 폴더
  testDir: './tests',

  // 실패한 테스트를 한 번 자동으로 다시 실행해줌 (불안정한 테스트 방지)
  retries: 1,

  // 테스트 하나당 최대 대기 시간 (30초)
  timeout: 30000,

  // 리포트 형식: html로 하면 나중에 예쁜 결과 페이지가 생겨
  reporter: 'html',

  use: {
    // 모든 테스트의 기본 URL. 이걸 설정하면 코드에서 '/'만 써도 넷플릭스로 이동함
    baseURL: 'https://www.netflix.com',

    // 테스트 실패했을 때 스크린샷 자동 저장
    screenshot: 'only-on-failure',

    // 실패 시 영상도 저장 (나중에 디버깅할 때 진짜 유용함)
    video: 'retain-on-failure',
  },

  // 어떤 브라우저에서 테스트할지
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    // 모바일 환경도 테스트 가능
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
  ],
});