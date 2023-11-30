## [2.5.3](https://github.com/nuance-communications/mix-cli/compare/v2.5.2...v2.5.3) (2023-11-30)


### Bug Fixes

* upgrade axios to 1.6.2 ([#204](https://github.com/nuance-communications/mix-cli/issues/204)) ([3a0bbf6](https://github.com/nuance-communications/mix-cli/commit/3a0bbf6cfab76eed68c5c0696f9d2883e07afa1b))

## [2.5.2](https://github.com/nuance-communications/mix-cli/compare/v2.5.1...v2.5.2) (2023-10-25)


### Bug Fixes

* upgrade zod to 3.22.4 ([#198](https://github.com/nuance-communications/mix-cli/issues/198)) ([e873a04](https://github.com/nuance-communications/mix-cli/commit/e873a04fcf6bb65b96df4b53d8b74be3196d5ef4))

## [2.5.1](https://github.com/nuance-communications/mix-cli/compare/v2.5.0...v2.5.1) (2023-07-26)


### Bug Fixes

* upgrade semver package ([#194](https://github.com/nuance-communications/mix-cli/issues/194)) ([22d893f](https://github.com/nuance-communications/mix-cli/commit/22d893f1f788ef00cbbb2587b309cf7033caf46a))

# [2.5.0](https://github.com/nuance-communications/mix-cli/compare/v2.4.0...v2.5.0) (2023-07-14)


### Bug Fixes

* add case sensitive to with-name flag ([#169](https://github.com/nuance-communications/mix-cli/issues/169)) ([cc1ee19](https://github.com/nuance-communications/mix-cli/commit/cc1ee193bdeaa5b7dd7b05b4f86a8342db8c9964))
* add failed message on error requests ([#184](https://github.com/nuance-communications/mix-cli/issues/184)) ([02cf308](https://github.com/nuance-communications/mix-cli/commit/02cf308eb3347d7035f8ef5575762bca5b50af29))
* add warning instead of error message on redeploying an app-config ([#174](https://github.com/nuance-communications/mix-cli/issues/174)) ([ac6983f](https://github.com/nuance-communications/mix-cli/commit/ac6983f5d87d0b59ce8f22a4e131facb1dc39ab4))
* correct help for subcommands ([#173](https://github.com/nuance-communications/mix-cli/issues/173)) ([08f8c18](https://github.com/nuance-communications/mix-cli/commit/08f8c18b47b9ad0bc99b6df86626e5191de218bb))
* improve suggestion on auth failure ([#167](https://github.com/nuance-communications/mix-cli/issues/167)) ([9c51bc3](https://github.com/nuance-communications/mix-cli/commit/9c51bc372c3977da07d1ada6b234ebc5fdd9e837))


### Features

* add env-configs:configure command ([#183](https://github.com/nuance-communications/mix-cli/issues/183)) ([66b0330](https://github.com/nuance-communications/mix-cli/commit/66b0330ffcc3bf0fae899c02b22c49c801c70f02))
* add env-configs:destroy command ([#186](https://github.com/nuance-communications/mix-cli/issues/186)) ([fceee8b](https://github.com/nuance-communications/mix-cli/commit/fceee8bbcb33e031522a49b00ce4d310a92114f6))
* add env-configs:list command ([#177](https://github.com/nuance-communications/mix-cli/issues/177)) ([44b602e](https://github.com/nuance-communications/mix-cli/commit/44b602efd2db04c7cf503ac9c49c5db91891021c))
* add support for multiple configs ([#185](https://github.com/nuance-communications/mix-cli/issues/185)) ([08323da](https://github.com/nuance-communications/mix-cli/commit/08323da4acd80a94cae77bbb5ac7b135a1c01f58))
* add voices:list command ([#179](https://github.com/nuance-communications/mix-cli/issues/179)) ([9721a08](https://github.com/nuance-communications/mix-cli/commit/9721a08dc0dab02784dec1be56854f98a6144e3a))

# [2.4.0](https://github.com/nuance-communications/mix-cli/compare/v2.3.0...v2.4.0) (2023-05-12)


### Bug Fixes

* add oclif (for cli) and update to latest semantic-release ([#159](https://github.com/nuance-communications/mix-cli/issues/159)) ([4d48558](https://github.com/nuance-communications/mix-cli/commit/4d4855846dd5850f04cd60e42744cc5f611e2e53))
* app-configs-get undefined options error ([#156](https://github.com/nuance-communications/mix-cli/issues/156)) ([82f0316](https://github.com/nuance-communications/mix-cli/commit/82f03169ead5655f2352f63ee0603b2d1c07a45a))
* display info from endpoint response property "message" in app-configs-undeploy ([#141](https://github.com/nuance-communications/mix-cli/issues/141)) ([5e62bf0](https://github.com/nuance-communications/mix-cli/commit/5e62bf0922a48144b389a710fde509a662be9cf8))
* exclude node_modules from zip packged for Veracode ([5a66061](https://github.com/nuance-communications/mix-cli/commit/5a66061a7a1286e527b2b054259fd95beb481d59))
* migrating from oclif v1 to v2 ([#152](https://github.com/nuance-communications/mix-cli/issues/152)) ([cbcb6c4](https://github.com/nuance-communications/mix-cli/commit/cbcb6c4947fb63b710a437d374b3c15a733f2632))
* standardize output of offset-limited list commands ([#140](https://github.com/nuance-communications/mix-cli/issues/140)) ([47e6bb9](https://github.com/nuance-communications/mix-cli/commit/47e6bb9b36fe1e79e0e113f1b0df07c75ca692f0))


### Features

* upgrade projects:list command to use ListExtendedProjects endpoint ([#128](https://github.com/nuance-communications/mix-cli/issues/128)) ([0baeab8](https://github.com/nuance-communications/mix-cli/commit/0baeab8dcd4dcbb1c8425b2684c85cf627e1d52a))

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
