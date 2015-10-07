# fabs Changelog

<a name="0.11.0"></a>
## 0.11.0 (2015-10-07)


### Bug Fixes

* **livereload:** consistently use configuration build.server.withLiveReloadInDev ([c1f4f37](https://github.com/w11k/fabs/commit/c1f4f37))

### Features

* **dependencies:** update all dependencies to latest version and adjust usage ([f25a984](https://github.com/w11k/fabs/commit/f25a984))


<a name="0.10.0"></a>
## 0.10.0 (2015-04-22)


### Bug Fixes

* **protractor:** fix running end-2-end tests with protractor, adjust to multiple html-root-docume ([1423384a](https://github.com/w11k/fabs/commit/1423384aae06e3231382610abefbfdafcdda9c63))
* **tests:**


### Features

* **configuration:** move spec and e2e configuration into tests block ([19e94a16](https://github.com/w11k/fabs/commit/19e94a16cfdf416ca5749ea28bb14f2b9ada5aa4))
* **dependencies:** do not load grunt plugins as peer dependencies anymore ([8514e150](https://github.com/w11k/fabs/commit/8514e1502f30a0c6662818dd9fd4aa101b111619))
* **protractor:** write protractor test results to junit-xml-file ([f31c8098](https://github.com/w11k/fabs/commit/f31c809826df25b47eb752218ec289fc6abf89b5))
* **tests:** extract test-results-dir to config variable ([49098319](https://github.com/w11k/fabs/commit/49098319db52e39cb16f5157f845aaa947c73871))

### Breaking Changes

* build configuration structure modified
  
  The structure of the build configuration has been modified. The ```spec``` and the ```e2e``` objects has moved to the new tests object.
  
  before:
  
  ```
  build: {
    spec: {},
    e2e: {}
  }
  ```
  
  after:
  
  ```
  build: {
    tests: {
      spec: {},
      e2e: {}
    }
  }
  ```
  

<a name="0.9.0"></a>
## 0.9.0 (2015-04-14)


#### Bug Fixes

* **dependencies:** update karma, jasmine and phantomjs to improve tests ([21c368e5](https://github.com/w11k/fabs/commit/21c368e5ceca9d6e1405be0da7aa1d37dfe34530))


#### Features

* **vendor:** make vendor directory configurable via build-configuration vendor.base ([7afebc38](https://github.com/w11k/fabs/commit/7afebc38f4dce6e5e6366120d5b35f3776fb505e))


<a name="0.8.1"></a>
## 0.8.1 (2015-04-08)


#### Bug Fixes

* **dependencies:** update ng-annotate to be able to run with node 0.12 ([8aace477](https://github.com/w11k/fabs/commit/8aace477dedded6d2c79733597eab48640fcdd63))
* **dev-mode:** repair inclusion of separated js files ([a3d39966](https://github.com/w11k/fabs/commit/a3d39966d9f9cee7c2869add00809cfa28f5b664))


<a name="0.8.0"></a>
## 0.8.0 (2015-03-24)


#### Features

* **configuration:** export fabs build configuration ([10a33752](https://github.com/w11k/fabs/commit/10a337520440330f25df9e29a24ed85075ff5f00))


#### Breaking Changes

* additional indirection added
You have to crate a configuration object first and then request the grunt configuration from that object. Previously the grunt configuration was requested at the required fabs module.
require fabs -> createConfig -> getGruntConfig / getBuildConfig
 ([10a33752](https://github.com/w11k/fabs/commit/10a337520440330f25df9e29a24ed85075ff5f00))


<a name="0.7.3"></a>
## 0.7.3 (2015-03-24)


#### Bug Fixes

* **configuration:** revert export of merged build configuration, use 0.8.0 instead ([6ad4b549](https://github.com/w11k/fabs/commit/6ad4b549297ff853245995d92ed8b152a3f40e1a))


<a name="0.7.2"></a>
### 0.7.2 (2015-03-23)


### Bug Fixes

* **configuration:** export merged build configuration ([76e77d3c](https://github.com/w11k/fabs/commit/76e77d3c6c172283ce40e610c419ebec0c0f8a23))


<a name="0.7.1"></a>
## 0.7.1 (2015-03-20)


#### Bug Fixes

* **dependencies:** update grunt-contrib-compress to avoid usage of is binaryfile 0.10.0 with russia ([54108c78](https://github.com/w11k/fabs/commit/54108c7837a5064a4adeebc890f30cff20f14d92))


<a name="0.7.0"></a>
## 0.7.0 (2015-03-19)


#### Bug Fixes

* **config:** fix broken build with build output folder with 2 levels (e.g. 'build/fabs') ([f404aa73](https://github.com/w11k/fabs/commit/f404aa7349b543d8de6d7e3d35cd8f4e076c3371))
* **css:** do not compress css in dev mode ([80f15438](https://github.com/w11k/fabs/commit/80f15438ee8f99689c97e1684a44dfbebd5c9850))


#### Features

* **entry-page:** make entry-pages (previously hard coded index.html) configurable ([f08c1087](https://github.com/w11k/fabs/commit/f08c1087bad7e319c0ade0b75ecd18c69f025357))
* **jshint:** use jshintrc near by code file ([0c5e98da](https://github.com/w11k/fabs/commit/0c5e98dacb5089a975d9991c14c3978f0fea4539))
* **tasks:** break up dist-task into 'build' and 'test' to be able to call them separately fr ([4ce52e4e](https://github.com/w11k/fabs/commit/4ce52e4e663d32b390be6382b60b660488a15413))
* **watch:** watch bower.json for changes and run bower automatically to install dependencies ([1949b6d0](https://github.com/w11k/fabs/commit/1949b6d0a156efe45dc00195e0a406ac6f29d054))


#### Breaking Changes

* src/common and all configuration for common is removed. There is only one src folder now which holds all the code for your app, common code and app specific code.
As before you are free to organise your app code with subfolders. So you can leave your src/common and src/app folder unchanged but you have to adjust your app.files configuration to mach files in both. Or you merge the code of src/common and src/app to one folder.
 ([e470e6f2](https://github.com/w11k/fabs/commit/e470e6f2292762fa9374a6c691402c5d34151940))


<a name="0.6.5"></a>
## 0.6.5 (2014-11-18)


### Bug Fixes

* **sass:** fix sass compilation with compass 1.0 ([88d41f02](https://github.com/w11k/fabs/commit/88d41f02df83b74ac0201d4a8dac993e9f5477ef))


<a name="0.6.4"></a>
## 0.6.4 (2014-10-22)


### Bug Fixes

* **tests:** update karma to run spec tests with PhantomJS from node module ([7ec65554](https://github.com/w11k/fabs/commit/7ec65554924b9651b7c0639e9a6095b7e9deb16d))


<a name="v0.6.3"></a>
## v0.6.3 (2014-10-20)


### Bug Fixes

* **config:** fix usage of old config variables 'runInPrepare' instead of new 'runInDev' ([2fa4f112](https://github.com/w11k/fabs/commit/2fa4f112dc352a4db6ffa3be2b3fea5026376256))
* **tests:** install and use PhantomJS as Node module to avoid version conflicts ([532e343d](https://github.com/w11k/fabs/commit/532e343d984798f762783001d74e605c7a0edfc7))

<a name="v0.6.2"></a>
## v0.6.2 (2014-07-28)


### Bug Fixes

* **grunt:** move grunt and all grunt plugins from dependencies to peerDependencies to avoid loading different grunt versions inside of fabs and Grunfile.js of the project ([42c0691f](https://github.com/w11k/fabs/commit/42c0691f79cf6c6b9a66920a4de331489dd56b9a))
* **installation:** make installation of webdriver lazy ([08f303ec](https://github.com/w11k/fabs/commit/08f303ec2801fb44dd61a32c6aacd2f9d74da1b3))

<a name="v0.6.1"></a>
## v0.6.1 (2014-07-16)


### Bug Fixes

* **bump:** adjust commit message to angular-commit-message-guidline and commit bumped files only ([c18045de](https://github.com/w11k/fabs/commit/c18045de641a3682f024341877a4a1569aae764c))


<a name="v0.6.0"></a>
## v0.6.0 (2014-07-16)


### Bug Fixes

* **spec:**
  * run karma only if there are spec tests to run, avoid failing because of no tests ([af7419e2](https://github.com/w11k/fabs/commit/af7419e21db1c71d487374261a7f0b9b4387d0f5))
  * add karma-chrome-launcher plugin to karma config to be able to launch chrome aut ([1d9d5ae5](https://github.com/w11k/fabs/commit/1d9d5ae59adaf2eec2f7ca2f26625a793207e9ac))


### Features

* **e2e:** add support protractor to run end-2-end tests with ([1e83d468](https://github.com/w11k/fabs/commit/1e83d46811a277790527b1c68f0558afb7691758))
* **ng-annotate:** replace ng-min with ng-annotate (which has support for explicit @ngInject annotation) ([3d51f9ff](https://github.com/w11k/fabs/commit/3d51f9ffba70c1acc3230a37ac14dfd7c7f8361d))
* **bower:** unify options - use runInDev and runInDist instead of runInPrepare ([333facb3](https://github.com/w11k/fabs/commit/333facb38ad566ae4659925229b977d21719ef1e))
* **spec:** unify options - use runInDev and runInDist instead of runInPrepare ([0783e86b](https://github.com/w11k/fabs/commit/0783e86bd45ca61da737c43c182d1cf4d62b4af4))


### Breaking Changes

* Running end-2-end tests in dev-mode is not supported anymore
* end-2-end tests can be run with protractor or karma + ng-scenario-runner but protractor is the new default. karma + ng-scenario-runner is disabled by default. To restore old behaviour set build.e2e.karma.enabled = true and build.e2e.protractor.endabled = false in your config file
* config build.bower.runInPrepare is now splitted into build.bower.runInDev and build.bower.runInDist
* config build.spec.runInPrepare is now splitted into build.spec.runInDev and build.spec.runInDist


<a name="v0.5.6"></a>
## v0.5.6 (2014-07-16)


### Bug Fixes

* **jshint:** unify usage of 'runInDev' and 'runInPrepare' in config.build.jshint to 'runInDev' ([0f6ad996](https://github.com/w11k/fabs/commit/0f6ad9966cfa9ad96b6532fa2dbd1eee1041f0ac), closes [#28](https://github.com/w11k/fabs/issues/28))


<a name="v0.5.5"></a>
## v0.5.5 (2014-06-19)


### Bug Fixes

* **css:** add css files from app to output ([205518c1](https://github.com/w11k/fabs/commit/205518c19686be8516e583d3d43c1a34c67ae1eb))
* **jshint:** add options to deactivate jshint in dev and dist mode ([5f499e9b](https://github.com/w11k/fabs/commit/5f499e9b1f1455166c603f39fa30f37ffe0fa168))


<a name="v0.5.4"></a>
## v0.5.4 (2014-06-03)


### Bug Fixes

* **bump:** do not fail if bower.json does not contain version number ([59641968](https://github.com/w11k/fabs/commit/596419684e6342cdf8fe99a65b9a756a99e9a2dc))


<a name="v0.5.3"></a>
## v0.5.3 (2014-04-26)


### Bug Fixes

* **bless:** fix include order of blessed css files ([ef0d33cb](https://github.com/w11k/fabs/commit/ef0d33cbb4927692a0e2224fbf309337f3c2738e))

<a name="v0.5.2"></a>
## v0.5.2 (2014-04-18)


### Bug Fixes

* **bless:** refactor blessed css files for IE8 and IE9 ([dc6c6ee5](https://github.com/w11k/fabs/commit/dc6c6ee5e0bbc7a70ca2249300cf1df6272e6ed5))


### Breaking Changes

* Blessed CSS files has to be imported separately from regular CSS files in index.html like this:

  ```
  <!--[if lte IE 9]>
  <% blessedStyles.forEach( function ( file ) { %><link rel="stylesheet" type="text/css" href="<%= file %>"/><% }); %>
  <![endif]-->
  <!--[if gt IE 9]> -->
  <% styles.forEach( function ( file ) { %>
  <link rel="stylesheet" type="text/css" href="<%= file %>"/>
  <% }); %>
  <!-- <![endif]-->
  ```


<a name="v0.5.1"></a>
## v0.5.1 (2014-04-17)

* update grunt from 0.4.2 to 0.4.4 ([6ac7dcd](https://github.com/w11k/fabs/commit/6ac7dcd9f0a1f9e5cfaf2cd3c9a6816fbf478def))


<a name="v0.5.0"></a>
## v0.5.0 (2014-04-17)


### Features

* **hooks:** add empty hook tasks for each phase (prepare and compile) and for each mode (dev and dist) ([73a3170c](https://github.com/w11k/fabs/commit/73a3170cecfd3fd5e86daca91dfeb664a703a9de))
* **bless:** add bless task to split long css files for IE 9 and older ([980d85cd](https://github.com/w11k/fabs/commit/980d85cd2eb87c32b3a949bab1b5a075e0c3b6e4))
* **templates:** change extension for templates from .tpl.html to .html ([84dc2f2e](https://github.com/w11k/fabs/commit/84dc2f2ec68a300c60598b2c3710949ef2528e77), closes [#24](https://github.com/w11k/fabs/issues/24))


### Breaking Changes

* Default extension for templates changed from .tpl.html to .html
  All templates with .tpl.html will be matched by .html as well. So you can rename all your template files or leave them as they are. If you rename your templates from .tpl.html to .html, don't forget to adjust your mocks to bypass template calls.
  If you have ohter .html files that should not be treated as templates, you have to adjust your project config to restore the old behaviour.

  ```
  app: {
    templates: [
      '**/*.tpl.html'
    ],
    templates2js: [
      'partial/**/*.tpl.html',
      'route/home/home.tpl.html'
    ]
  },
  common: {
    templates: [
      '**/*.tpl.html'
    ]
  }
  ```

  

* Array with CSS files to include into index.html has changed from strings to objects { regular: ..., blessed: ... }.

  To migrate your index.html replace

  ```
  <% styles.forEach( function ( file ) { %>
  <link rel="stylesheet" type="text/css" href="<%= file %>"/>
  <% }); %>
  ```

  with

  ```
  <% styles.forEach( function ( file ) { %>
  <!--[if lte IE 9]><link rel="stylesheet" type="text/css" href="<%= file.blessed %>"/><![endif]-->
  <!--[if gt IE 9]> --><link rel="stylesheet" type="text/css" href="<%= file.regular %>"/><!-- <![endif]-->
  <% }); %>
  ```

<a name="v0.4.3"></a>
## v0.4.3 (2014-03-12)


### Bug Fixes

* **tests:** update karma plugins and do not run tests on start of 'grunt dev' ([d6ab4cb5](https://github.com/w11k/fabs/commit/d6ab4cb58fad3742cbbc829ea2550f3ad5ad2815))
* **watch:** increase watch interval to reduce cpu load ([998441de](https://github.com/w11k/fabs/commit/998441de87c9053f6ef4bb0c8ea948a9c47622bd))

<a name="v0.4.2"></a>
## v0.4.2 (2014-03-12)


### Bug Fixes

* **tests:** update grunt-karma to 0.8.0 ([d71f5b74](https://github.com/w11k/fabs/commit/d71f5b7473d77c3bc8464dc79702a565a40d88eb), closes [#25](https://github.com/w11k/fabs/issues/25))

<a name="v0.4.1"></a>
## v0.4.1 (2014-02-03)


### Bug Fixes

* **watch:** watch all less and sass files under src ([ac52572e](https://github.com/w11k/fabs/commit/ac52572e15bedb91d8afb0f165e511615fb71bb5), closes [#23](https://github.com/w11k/fabs/issues/23))

<a name="v0.4.0"></a>
## v0.4.0 (2014-01-31)

### Features

* **config:** make all ports used by fabs configurable ([fca82393](https://github.com/w11k/fabs/commit/fca82393038cff33e1b8f6eeb42842f080a060d6), closes [#21](https://github.com/w11k/fabs/issues/21))


<a name="v0.3.3"></a>
## v0.3.3 (2014-01-28)

### Bug Fixes

* **cacheBusting:** prevent false positives with files with equal parts in path ([80f637f3](https://github.com/w11k/fabs/commit/80f637f33cb6d41fe83e0e2c8b8d7699b8cd4ee5), closes [#20](https://github.com/w11k/fabs/issues/20))


<a name="v0.3.2"></a>
## v0.3.2 (2014-01-28)

### Bug Fixes

* **config:** add caching for assembled build config ([10b824e6](https://github.com/w11k/fabs/commit/10b824e6935d7f92292fc7932c7e72b0cac6306c), closes [#17](https://github.com/w11k/fabs/issues/17))
* **test:**
  * run tests with no browser started automatically ([bc0c4e59](https://github.com/w11k/fabs/commit/bc0c4e59ead7faa27a7c8f7ed55393fd27c339b7), closes [#18](https://github.com/w11k/fabs/issues/18))
  * update the karma-junit-reporter plugin from 0.1.0 to 0.2.1 ([51ef015f](https://github.com/w11k/fabs/commit/51ef015f7843694406d00ab4e34c42c1ae2c1ab5))
  * support Firefox, Safari and Opera as test browser ([5d6bd13b](https://github.com/w11k/fabs/commit/5d6bd13b57c282055c96bc9c01705c1ec7e4df87), closes [#19](https://github.com/w11k/fabs/issues/19))


<a name="v0.3.1"></a>
## v0.3.1 (2014-01-28)

### Documentation

* Fixes version number in changelog ([2df2946](https://github.com/w11k/fabs/commit/2df29460d558d480d22a4a8d52ef760ab05d2c48))


<a name="v0.3.0"></a>
## v0.3.0 (2014-01-28)

### Features

* **dev:** add possibility to deactivate LiveReload in dev mode ([56c7a989](https://github.com/w11k/fabs/commit/56c7a9899bba6d0d8a65186b46df6ad2ed0c98c6), closes [#10](https://github.com/w11k/fabs/issues/10))
* **test:** make browser to run tests with configurable ([8e084658](https://github.com/w11k/fabs/commit/8e084658a31b263be9270f6708865c0e72dae87f), closes [#15](https://github.com/w11k/fabs/issues/15))


<a name="v0.2.0"></a>
## v0.2.0 (2013-12-09)

### Features

* **bump:** add bump task ([e3321d4c](https://github.com/w11k/fabs/commit/e3321d4cee3d7d4dbd1bcffb1369bfe1e1a4ab8d), closes [#8](https://github.com/w11k/fabs/issues/8))
* **changelog:** Add changelog task ([9e0a6737](https://github.com/w11k/fabs/commit/9e0a67373c64788b8020c65038b5a403898f76c8), closes [#9](https://github.com/w11k/fabs/issues/9))
* **plugins:** load Grunt plugins as dependencies of fabs ([89e78bcf](https://github.com/w11k/fabs/commit/89e78bcf2b94f6677cd3c9dd196977d28c77eef8), closes [#1](https://github.com/w11k/fabs/issues/1))


<a name="v0.1.0"></a>
## v0.1.0 (2013-12-06)

First Release

### Features

* Dev-Mode with Server, Proxy and LiveReload
* SASS 3.2 and LESS 1.5 support
* Spec and End-2-End Test
* Mock Data for Tests and Dev-Mode
* Running Bower to Install and Update Frontend Dependencies
* Project- and Per-Developer Configuration as well as Command Line Arguments
* Building Distribution with
    * Embedding Templates and Translations
    * Annotating AngularJS Dependencies (Transform to Array-Notation)
    * Code Minimization
    * Cache Busting
    * Running End-2-End Tests Against Build Application
