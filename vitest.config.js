import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // environment 옵션은 해당 테스트를 어떤 환경에서 구동할 것인가를 설정
    // jest처럼 사용하고 싶으면 'jsdom'을 사용하면됨
    environment: 'jsdom',
    // globals 옵션은 jest처럼 글로벌API로 사용하기 위한 옵션
    // 함수들을 import를 할 필요가 없다
    globals: true,
    // 해당 파일에 있는 값들을 전역으로 사용하고 싶을때 사용
    setupFiles: './src/test/setup.js',
    reporters: 'verbose',
  },
});
