<a name="v0.4.1"></a>
### v0.4.1 (2014-02-03)


#### Bug Fixes

* **watch:** watch all less and sass files under src ([ac52572e](https://github.com/w11k/fabs/commit/ac52572e15bedb91d8afb0f165e511615fb71bb5), closes [#23](https://github.com/w11k/fabs/issues/23))

<a name="v0.4.0"></a>
### v0.4.0 (2014-01-31)

#### Features

* **config:** make all ports used by fabs configurable ([fca82393](https://github.com/w11k/fabs/commit/fca82393038cff33e1b8f6eeb42842f080a060d6), closes [#21](https://github.com/w11k/fabs/issues/21))


<a name="v0.3.3"></a>
### v0.3.3 (2014-01-28)

#### Bug Fixes

* **cacheBusting:** prevent false positives with files with equal parts in path ([80f637f3](https://github.com/w11k/fabs/commit/80f637f33cb6d41fe83e0e2c8b8d7699b8cd4ee5), closes [#20](https://github.com/w11k/fabs/issues/20))


<a name="v0.3.2"></a>
### v0.3.2 (2014-01-28)

#### Bug Fixes

* **config:** add caching for assembled build config ([10b824e6](https://github.com/w11k/fabs/commit/10b824e6935d7f92292fc7932c7e72b0cac6306c), closes [#17](https://github.com/w11k/fabs/issues/17))
* **test:**
  * run tests with no browser started automatically ([bc0c4e59](https://github.com/w11k/fabs/commit/bc0c4e59ead7faa27a7c8f7ed55393fd27c339b7), closes [#18](https://github.com/w11k/fabs/issues/18))
  * update the karma-junit-reporter plugin from 0.1.0 to 0.2.1 ([51ef015f](https://github.com/w11k/fabs/commit/51ef015f7843694406d00ab4e34c42c1ae2c1ab5))
  * support Firefox, Safari and Opera as test browser ([5d6bd13b](https://github.com/w11k/fabs/commit/5d6bd13b57c282055c96bc9c01705c1ec7e4df87), closes [#19](https://github.com/w11k/fabs/issues/19))


<a name="v0.3.1"></a>
### v0.3.1 (2014-01-28)

#### Documentation

* Fixes version number in changelog ([2df2946](https://github.com/w11k/fabs/commit/2df29460d558d480d22a4a8d52ef760ab05d2c48))


<a name="v0.3.0"></a>
### v0.3.0 (2014-01-28)

#### Features

* **dev:** add possibility to deactivate LiveReload in dev mode ([56c7a989](https://github.com/w11k/fabs/commit/56c7a9899bba6d0d8a65186b46df6ad2ed0c98c6), closes [#10](https://github.com/w11k/fabs/issues/10))
* **test:** make browser to run tests with configurable ([8e084658](https://github.com/w11k/fabs/commit/8e084658a31b263be9270f6708865c0e72dae87f), closes [#15](https://github.com/w11k/fabs/issues/15))


<a name="v0.2.0"></a>
### v0.2.0 (2013-12-09)

#### Features

* **bump:** add bump task ([e3321d4c](https://github.com/w11k/fabs/commit/e3321d4cee3d7d4dbd1bcffb1369bfe1e1a4ab8d), closes [#8](https://github.com/w11k/fabs/issues/8))
* **changelog:** Add changelog task ([9e0a6737](https://github.com/w11k/fabs/commit/9e0a67373c64788b8020c65038b5a403898f76c8), closes [#9](https://github.com/w11k/fabs/issues/9))
* **plugins:** load Grunt plugins as dependencies of fabs ([89e78bcf](https://github.com/w11k/fabs/commit/89e78bcf2b94f6677cd3c9dd196977d28c77eef8), closes [#1](https://github.com/w11k/fabs/issues/1))


<a name="v0.1.0"></a>
### v0.1.0 (2013-12-06)

First Release

#### Features

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
