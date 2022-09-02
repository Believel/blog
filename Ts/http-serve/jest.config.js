module.exports = {

  collectCoverageFrom: ['src/*.{ts}'],
  // 指定了 setupFiles（需要手动创建 __tests__/setup.ts）初始化单元测试运行环境、加载 polyfill 模块等
  setupFiles: ['<rootDir>/__tests__/setup.ts'],
  // 指定了查找单测文件的规则
  testMatch: ['<rootDir>/__tests__/?(*.)(spec|test).ts'],

  testEnvironment: 'node',

  testURL: 'http://localhost:4444',
  // 指定了使用 ts-jest 转译 *.ts 文件
  transform: {

    '^.+\\.ts$': 'ts-jest'

  },

  transformIgnorePatterns: [

    '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|ts|tsx)$',

  ],
  // 告知 Jest 如何解析别名模块。
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },

  moduleFileExtensions: ['js', 'ts'],

  globals: {
    // 配置了 ts-jest 基于项目目录下的 tsconfig.test.json 转译为 TypeScript。
    'ts-jest': {

      tsConfig: require('path').join(process.cwd(), 'tsconfig.test.json'),

    },

  },

};
