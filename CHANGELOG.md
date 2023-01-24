# [2.3.0](https://github.com/nuance-communications/mix-cli/compare/v2.2.1...v2.3.0) (2023-01-24)


### Bug Fixes

* Add common handling of HTTP 403 errors ([#105](https://github.com/nuance-communications/mix-cli/issues/105)) ([fc965e7](https://github.com/nuance-communications/mix-cli/commit/fc965e781ae14a2ae5fa16357dab36b30f9991ea))
* add support for flag 'live-only' in applications:list ([#132](https://github.com/nuance-communications/mix-cli/issues/132)) ([791bf6f](https://github.com/nuance-communications/mix-cli/commit/791bf6fed5f0e4178a4a6e208ae0929531f785a5))
* add support for live-only flag to bots:list ([#127](https://github.com/nuance-communications/mix-cli/issues/127)) ([3065ccf](https://github.com/nuance-communications/mix-cli/commit/3065ccf804d4a198b71e3e7d9fdcd22cce175341))
* align wording around flag names ([#137](https://github.com/nuance-communications/mix-cli/issues/137)) ([93433e6](https://github.com/nuance-communications/mix-cli/commit/93433e60b27c548f43285bb6c5894199997968cd))
* app-credentials-list desc ([ea460ef](https://github.com/nuance-communications/mix-cli/commit/ea460efe9cc92387b77e7bb29a00a17b34ff24e8))
* app-credentials-list desc ([52825e7](https://github.com/nuance-communications/mix-cli/commit/52825e708d3c9f70c5be520d56716b51891d9f98))
* bot-interfaces:export command output ([#126](https://github.com/nuance-communications/mix-cli/issues/126)) ([6333232](https://github.com/nuance-communications/mix-cli/commit/6333232f8cdf68d71ec175e72c5154ada13d723a))
* build-label description ([#139](https://github.com/nuance-communications/mix-cli/issues/139)) ([d406119](https://github.com/nuance-communications/mix-cli/commit/d406119435189d50fb9cf1a1e3df5ed42aa57850))
* correct use of pluralize() in deployment-flows:list ([#130](https://github.com/nuance-communications/mix-cli/issues/130)) ([c15c7f1](https://github.com/nuance-communications/mix-cli/commit/c15c7f113c7266ece24f2409593d585c87247c00))
* data-types-list unit test ([#120](https://github.com/nuance-communications/mix-cli/issues/120)) ([7fd8087](https://github.com/nuance-communications/mix-cli/commit/7fd8087d36b9d827ebeff55920195b574b9694c8))
* Handle empty/white space project and channel names ([#107](https://github.com/nuance-communications/mix-cli/issues/107)) ([6742b3c](https://github.com/nuance-communications/mix-cli/commit/6742b3c0b5c9f8240fda167531649b455a87c862))
* Provide additional info in jobs:get output ([#113](https://github.com/nuance-communications/mix-cli/issues/113)) ([8e9d866](https://github.com/nuance-communications/mix-cli/commit/8e9d8669618e52aae491885ddebae81fc7da2cfc))
* refresh token when watching job ([#146](https://github.com/nuance-communications/mix-cli/issues/146)) ([eac0291](https://github.com/nuance-communications/mix-cli/commit/eac0291d8aa501e093a22abea6cea73b952a3c92))
* Show deployment comments in app-configs:deploy command ([#112](https://github.com/nuance-communications/mix-cli/issues/112)) ([315d47c](https://github.com/nuance-communications/mix-cli/commit/315d47ccbc16e41292e94a4c04ea898a92648d74))
* update documentation links to point to new url ([#138](https://github.com/nuance-communications/mix-cli/issues/138)) ([28b9966](https://github.com/nuance-communications/mix-cli/commit/28b99667b1534e40b504665d73327e50450f8915))
* Update references to "mix.cli" to "mix-cli" ([#111](https://github.com/nuance-communications/mix-cli/issues/111)) ([19b98cc](https://github.com/nuance-communications/mix-cli/commit/19b98cc4c60ccecf6fbe344958d693aad47f7c3f))


### Features

* add applications:get command ([#131](https://github.com/nuance-communications/mix-cli/issues/131)) ([97b48e9](https://github.com/nuance-communications/mix-cli/commit/97b48e91e2730bb842c122e600b299c7afb6a6ed))
* update applications-list to newer ListApplicationsV2 endpoint ([#129](https://github.com/nuance-communications/mix-cli/issues/129)) ([52c9760](https://github.com/nuance-communications/mix-cli/commit/52c9760874fe5b9d0c2a4b103cc36e0d6a73c6b0))

## [2.2.1](https://github.com/nuance-communications/mix-cli/compare/v2.2.0...v2.2.1) (2022-11-08)


### Bug Fixes

* builds-export default file path ([#109](https://github.com/nuance-communications/mix-cli/issues/109)) ([7070765](https://github.com/nuance-communications/mix-cli/commit/7070765e4a5e652b8c1931b62d5e597c7c8ee730))

# [2.2.0](https://github.com/nuance-communications/mix-cli/compare/v2.1.0...v2.2.0) (2022-11-08)


### Bug Fixes

* add not found treatment to get and list command output ([#96](https://github.com/nuance-communications/mix-cli/issues/96)) ([20dc1f7](https://github.com/nuance-communications/mix-cli/commit/20dc1f7f3a587545e5dc46ad66fc5bb76fa156a0))
* add support for default file names in export commands ([#94](https://github.com/nuance-communications/mix-cli/issues/94)) ([ff5780e](https://github.com/nuance-communications/mix-cli/commit/ff5780ec022e329e074e542fa0c8ff141609ca54))
* correct color in output of commands ([#91](https://github.com/nuance-communications/mix-cli/issues/91)) ([7a06a20](https://github.com/nuance-communications/mix-cli/commit/7a06a20412768a6ab13ca7880375882f3dbb1b0a))


### Features

* add data-hosts:latest command ([#100](https://github.com/nuance-communications/mix-cli/issues/100)) ([fbfbc6a](https://github.com/nuance-communications/mix-cli/commit/fbfbc6a8b0c0b34274eaf0925203c32e274b11fe))
* add data-types:list command ([#99](https://github.com/nuance-communications/mix-cli/issues/99)) ([afc6145](https://github.com/nuance-communications/mix-cli/commit/afc6145682b9d74c419b28a53dd057f6dfb67f13))
* add entity-types:list command ([#98](https://github.com/nuance-communications/mix-cli/issues/98)) ([6f7f3a4](https://github.com/nuance-communications/mix-cli/commit/6f7f3a4ebb3e639fe0d8969e35484e7fc6f4d83d))
* add grammars commands ([#101](https://github.com/nuance-communications/mix-cli/issues/101)) ([bc4a802](https://github.com/nuance-communications/mix-cli/commit/bc4a8022f8973e1b93e2fa4840f329471b145cde))

# [2.1.0](https://github.com/nuance-communications/mix-cli/compare/v2.0.0...v2.1.0) (2022-11-01)


### Bug Fixes

* app-configs:destroy color correction ([#89](https://github.com/nuance-communications/mix-cli/issues/89)) ([98d2f48](https://github.com/nuance-communications/mix-cli/commit/98d2f48550222f4090ef85af967405b4465f73fa))


### Features

* add bot-related commands ([#88](https://github.com/nuance-communications/mix-cli/issues/88)) ([8c819f5](https://github.com/nuance-communications/mix-cli/commit/8c819f53aedf8d46ca035609207a0f08bd8cab2e))

# [2.0.0](https://github.com/nuance-communications/mix-cli/compare/v1.5.0...v2.0.0) (2022-08-12)


### Features

* bump to version 2.0.0 ([#48](https://github.com/nuance-communications/mix-cli/issues/48)) ([42eb92d](https://github.com/nuance-communications/mix-cli/commit/42eb92d15a983295fe8cc0cc604c6ecd1265ad7b))


### BREAKING CHANGES

* bump to version 2.0.0

# [2.0.0-beta.2](https://github.com/nuance-communications/mix-cli/compare/v2.0.0-beta.1...v2.0.0-beta.2) (2022-08-12)


### Bug Fixes

* add warning regarding pattern values ([#45](https://github.com/nuance-communications/mix-cli/issues/45)) ([50d7ff3](https://github.com/nuance-communications/mix-cli/commit/50d7ff355893fd48b4d027fa0d66ebef17d88a72))

# [2.0.0-beta.1](https://github.com/nuance-communications/mix-cli/compare/v1.4.0-beta.18...v2.0.0-beta.1) (2022-08-11)


### Features

* drop Node.js 12 support ([#42](https://github.com/nuance-communications/mix-cli/issues/42)) ([f2d0e08](https://github.com/nuance-communications/mix-cli/commit/f2d0e083e7ed0868911c887232014f8b43464b02))


### BREAKING CHANGES

* Node.js >= 14 required

# [1.4.0-beta.18](https://github.com/nuance-communications/mix-cli/compare/v1.4.0-beta.17...v1.4.0-beta.18) (2022-08-11)


### Features

* update documentation for api client ([51c67fd](https://github.com/nuance-communications/mix-cli/commit/51c67fd0c10e4ae5914f09ca2e879aa208d67de3))

# [1.4.0-beta.17](https://github.com/nuance-communications/mix-cli/compare/v1.4.0-beta.16...v1.4.0-beta.17) (2022-08-11)


### Bug Fixes

* remove N/As from entities:get output ([#40](https://github.com/nuance-communications/mix-cli/issues/40)) ([b308b52](https://github.com/nuance-communications/mix-cli/commit/b308b52395e8997050596fde731db402cc9bda64))

# [1.4.0-beta.16](https://github.com/nuance-communications/mix-cli/compare/v1.4.0-beta.15...v1.4.0-beta.16) (2022-08-11)


### Bug Fixes

* change from --name to --new-name in rename commands ([72cd71f](https://github.com/nuance-communications/mix-cli/commit/72cd71f72c66aa32c95554eaa7e0e8abaf84d3ae))

# [1.4.0-beta.15](https://github.com/nuance-communications/mix-cli/compare/v1.4.0-beta.14...v1.4.0-beta.15) (2022-08-10)


### Bug Fixes

* make --to-entity-type flag required in entities:convert ([056ee97](https://github.com/nuance-communications/mix-cli/commit/056ee97233e57b85486d8132d132fd249c4cf4ec))


### Features

* add channels topic and commands ([cda55a9](https://github.com/nuance-communications/mix-cli/commit/cda55a97bf22cc6538e0b622452a38907e209215))

# [1.4.0-beta.14](https://github.com/nuance-communications/mix-cli/compare/v1.4.0-beta.13...v1.4.0-beta.14) (2022-08-10)


### Bug Fixes

* make consistent use of color in entities commands output ([096a0cf](https://github.com/nuance-communications/mix-cli/commit/096a0cf4dbf080b575896340ded96804be17739e))

# [1.4.0-beta.13](https://github.com/nuance-communications/mix-cli/compare/v1.4.0-beta.12...v1.4.0-beta.13) (2022-08-09)


### Bug Fixes

* add --entity-type flag to examples in entities:configure ([c993d5c](https://github.com/nuance-communications/mix-cli/commit/c993d5ca574accf3185b0ace11917e83b1a046f3))

# [1.4.0-beta.12](https://github.com/nuance-communications/mix-cli/compare/v1.4.0-beta.11...v1.4.0-beta.12) (2022-08-09)


### Bug Fixes

* add MIX_PROJECT as default for entities commands ([3bf30cb](https://github.com/nuance-communications/mix-cli/commit/3bf30cb85e689045f19cd656f179c082161958d5))

# [1.4.0-beta.11](https://github.com/nuance-communications/mix-cli/compare/v1.4.0-beta.10...v1.4.0-beta.11) (2022-08-09)


### Bug Fixes

* correct typos and wording in README.md ([#35](https://github.com/nuance-communications/mix-cli/issues/35)) ([43fb599](https://github.com/nuance-communications/mix-cli/commit/43fb5995e01959e90b64d68a62def3222aeabd4b))

# [1.4.0-beta.10](https://github.com/nuance-communications/mix-cli/compare/v1.4.0-beta.9...v1.4.0-beta.10) (2022-08-08)


### Bug Fixes

* add organizationId to projects:get output ([#34](https://github.com/nuance-communications/mix-cli/issues/34)) ([66e0cbd](https://github.com/nuance-communications/mix-cli/commit/66e0cbdb1bbfcc79b285dfd21e67b44234d01b3e))

# [1.4.0-beta.9](https://github.com/nuance-communications/mix-cli/compare/v1.4.0-beta.8...v1.4.0-beta.9) (2022-08-08)


### Bug Fixes

* add MIX_PROJECT as default for project flag in all intents commands ([#33](https://github.com/nuance-communications/mix-cli/issues/33)) ([96e322e](https://github.com/nuance-communications/mix-cli/commit/96e322ec791cae86df9d36a8b15b47bed7b5aeaf))

# [1.4.0-beta.8](https://github.com/nuance-communications/mix-cli/compare/v1.4.0-beta.7...v1.4.0-beta.8) (2022-07-27)


### Bug Fixes

* correct set of issues with entities:configure ([#32](https://github.com/nuance-communications/mix-cli/issues/32)) ([8a958d2](https://github.com/nuance-communications/mix-cli/commit/8a958d221849a4a81b58a1633bbe62240d4a6a9a))

# [1.4.0-beta.7](https://github.com/nuance-communications/mix-cli/compare/v1.4.0-beta.6...v1.4.0-beta.7) (2022-07-26)


### Features

* add entities:convert command ([#31](https://github.com/nuance-communications/mix-cli/issues/31)) ([e9dd567](https://github.com/nuance-communications/mix-cli/commit/e9dd567f7b7b828d11887b714efc0d29a17982b5))

# [1.4.0-beta.6](https://github.com/nuance-communications/mix-cli/compare/v1.4.0-beta.5...v1.4.0-beta.6) (2022-07-20)


### Features

* add entities:configure command ([#29](https://github.com/nuance-communications/mix-cli/issues/29)) ([ba64bb1](https://github.com/nuance-communications/mix-cli/commit/ba64bb1ed6c95730efe8e6849162a99a781df1cc))

# [1.4.0-beta.5](https://github.com/nuance-communications/mix-cli/compare/v1.4.0-beta.4...v1.4.0-beta.5) (2022-07-18)


### Features

* add entities:create command ([#28](https://github.com/nuance-communications/mix-cli/issues/28)) ([8a31f40](https://github.com/nuance-communications/mix-cli/commit/8a31f404723aa56d8ad631ab1fc0f7c5194d8ad7))

# [1.4.0-beta.4](https://github.com/nuance-communications/mix-cli/compare/v1.4.0-beta.3...v1.4.0-beta.4) (2022-07-15)


### Features

* add entities:rename command ([#24](https://github.com/nuance-communications/mix-cli/issues/24)) ([6ae3287](https://github.com/nuance-communications/mix-cli/commit/6ae32875bbe1def133cb78f54d3f564a964d2a3e))
* add intents commands ([#25](https://github.com/nuance-communications/mix-cli/issues/25)) ([c92b6af](https://github.com/nuance-communications/mix-cli/commit/c92b6af71155e17e9f7bcae5fe86d5db13878c5e))

# [1.4.0-beta.3](https://github.com/nuance-communications/mix-cli/compare/v1.4.0-beta.2...v1.4.0-beta.3) (2022-07-12)


### Features

* add entities:destroy command ([#23](https://github.com/nuance-communications/mix-cli/issues/23)) ([a87860a](https://github.com/nuance-communications/mix-cli/commit/a87860a9cc3a6fc0565b942792e83be2b7fb0c17))

# [1.4.0-beta.2](https://github.com/nuance-communications/mix-cli/compare/v1.4.0-beta.1...v1.4.0-beta.2) (2022-07-12)


### Features

* add entities:list command ([#21](https://github.com/nuance-communications/mix-cli/issues/21)) ([6ea0280](https://github.com/nuance-communications/mix-cli/commit/6ea0280d1c56799f3a23f8da7e12ab91a7374de1))

# [1.4.0-beta.1](https://github.com/nuance-communications/mix-cli/compare/v1.3.1-beta.1...v1.4.0-beta.1) (2022-07-11)


### Features

* add entities:get command ([#20](https://github.com/nuance-communications/mix-cli/issues/20)) ([e7ee8cd](https://github.com/nuance-communications/mix-cli/commit/e7ee8cde4aee2614e4ddc83524c212325531b223))

## [1.3.1-beta.1](https://github.com/nuance-communications/mix-cli/compare/v1.3.0...v1.3.1-beta.1) (2022-07-03)


### Bug Fixes

* amend minor auth message typo ([#8](https://github.com/nuance-communications/mix-cli/issues/8)) ([#9](https://github.com/nuance-communications/mix-cli/issues/9)) ([7513003](https://github.com/nuance-communications/mix-cli/commit/7513003259799127f5cb81272b1493cd44a5bd9d))

# [1.3.0](https://github.com/nuance-communications/mix-cli/compare/v1.2.3...v1.3.0) (2022-07-03)


### Features

* abstract captureOptions() to MixCommand superclass ([#12](https://github.com/nuance-communications/mix-cli/issues/12)) ([467a151](https://github.com/nuance-communications/mix-cli/commit/467a151431ea8d13e5f7de5d6fdce230bf269d56))

## [1.2.3](https://github.com/nuance-communications/mix-cli/compare/v1.2.2...v1.2.3) (2022-05-31)


### Bug Fixes

* fix minor typo ([#14](https://github.com/nuance-communications/mix-cli/issues/14)) ([0cc483f](https://github.com/nuance-communications/mix-cli/commit/0cc483fb39e0d8c9685cd297e91b8f47cb5792cf))

## [1.2.2](https://github.com/nuance-communications/mix-cli/compare/v1.2.1...v1.2.2) (2022-05-27)


### Bug Fixes

* bump @oclif/plugin-autocomplete version ([#10](https://github.com/nuance-communications/mix-cli/issues/10)) ([31e60aa](https://github.com/nuance-communications/mix-cli/commit/31e60aadb46cbae71cae76db96d988ce8c13b40a))

## [1.2.1](https://github.com/nuance-communications/mix-cli/compare/v1.2.0...v1.2.1) (2022-04-01)


### Bug Fixes

* correct creation of config directory ([#3](https://github.com/nuance-communications/mix-cli/issues/3)) ([1e4e034](https://github.com/nuance-communications/mix-cli/commit/1e4e0346b6c28cfcc8f0bc65c976ce40f4261c39))
* correct deployment ([#4](https://github.com/nuance-communications/mix-cli/issues/4)) ([022e19a](https://github.com/nuance-communications/mix-cli/commit/022e19abb88e9acd5fca3c5a354547c43434d091))

# [1.2.0](https://github.com/nuance-communications/mix-cli/compare/v1.1.0...v1.2.0) (2022-03-31)
Initial release. Versioning starts at 1.2.0 as this tool was used internally before
getting open-sourced.
