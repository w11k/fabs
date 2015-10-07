'use strict';

var grunt = require('grunt');

function getVersion() {
  var pkg = grunt.file.readJSON('./package.json');
  return pkg.version;
}

module.exports = function () {
  grunt.loadNpmTasks('grunt-bump');
  grunt.loadNpmTasks('grunt-conventional-changelog');
  grunt.loadNpmTasks('grunt-git');

  grunt.registerTask('release', [
    'bump:minor',
    'changelog',
    'gitadd:changelog',
    'gitcommit:changelog'
  ]);

  grunt.registerTask('hotfix', [
    'bump:patch',
    'changelog',
    'gitadd:changelog',
    'gitcommit:changelog'
  ]);

  grunt.initConfig({
    lazy: {
      getVersion: getVersion
    },
    bump: {
      options: {
        files: ['package.json'],
        commit: true,
        commitMessage: 'chore(project): bump version to %VERSION%',
        commitFiles: ['package.json'],
        createTag: false,
        push: false
      }
    },
    conventionalChangelog: {
      options: {
        changelogOpts: {
          // conventional-changelog options go here
          preset: 'angular'
        },
        context: {
          // context goes here
        },
        gitRawCommitsOpts: {
          // git-raw-commits options go here
        },
        parserOpts: {
          // conventional-commits-parser options go here
        },
        writerOpts: {
          // conventional-changelog-writer options go here
        }
      },
      release: {
        src: 'CHANGELOG.md'
      }
    },
    gitadd: {
      changelog: {
        files: {
          src: ['Changelog.md']
        }
      }
    },
    gitcommit: {
      changelog: {
        options: {
          message: 'doc(changelog): update changelog for <%= lazy.getVersion() %>'
        },
        files: {
          src: ['Changelog.md']
        }
      }
    }
  });
};
