module.exports = {
  branches: ['master'], // 指定在哪个分支下要执行发布操作
  plugins: [
    [
      '@semantic-release/commit-analyzer',
      {
        releaseRules: [{
            type: "perf",
            release: "patch"
          },
          {
            type: "refactor",
            release: "patch"
          }
        ]
      }
    ], // 解析 commit 信息，默认就是 Angular 规范
    [
      '@semantic-release/release-notes-generator',
      {
        presetConfig: {
          types: [{
              type: "perf",
              section: "Performance",
              "hidden": false
            },
            {
              type: "refactor",
              section: "Refactor",
              "hidden": false
            }
          ]
        }
      }
    ],
    [
      '@semantic-release/changelog',
      {
        changelogFile: 'CHANGELOG.md' // 把发布日志写入该文件
      }
    ],
    '@semantic-release/npm',
    '@semantic-release/github',
    [
      '@semantic-release/git',
      {
        assets: ['CHANGELOG.md', 'package.json'], // 前面说到日志记录和版本好是新增修改的，需要 push 回 Git
        message: "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}"
      }
    ]
  ]
}