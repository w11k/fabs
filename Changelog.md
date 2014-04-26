<a name="v0.5.2"></a>
## v0.5.2 (2014-04-18)


### Bug Fixes

* **bless:** refactors blessed css files for IE8 and IE9 ([dc6c6ee5](https://github.com/w11k/fabs/commit/dc6c6ee5e0bbc7a70ca2249300cf1df6272e6ed5))


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
