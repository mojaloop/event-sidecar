# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [15.0.0](https://github.com/mojaloop/event-sidecar/compare/v14.2.3...v15.0.0) (2026-09-10)


### ⚠ BREAKING CHANGES

* migrate API to OpenAPI 3.0.3 and openapi-backend [mojaloop/#4479]

### Features

* migrate API to OpenAPI 3.0.3 and openapi-backend [mojaloop/[#4479](https://github.com/mojaloop/event-sidecar/issues/4479)] ([51a67b9](https://github.com/mojaloop/event-sidecar/commit/51a67b90cd51b1ac9f804010d56346c1eafc1056))


### Bug Fixes

* clear SonarCloud Dockerfile findings on the build-deps layer [mojaloop/[#4479](https://github.com/mojaloop/event-sidecar/issues/4479)] ([796c66c](https://github.com/mojaloop/event-sidecar/commit/796c66c1ed3cf423951fda407b7d64273d983e5d))
* drop AJV type coercion and assert every operation has a handler [mojaloop/[#4479](https://github.com/mojaloop/event-sidecar/issues/4479)] ([77fc633](https://github.com/mojaloop/event-sidecar/commit/77fc633d67db84d29f3aa716774bd85f8e184d85))
* name the apk virtual package so S7018 sees a sorted list [mojaloop/[#4479](https://github.com/mojaloop/event-sidecar/issues/4479)] ([a527eb8](https://github.com/mojaloop/event-sidecar/commit/a527eb8ca80f342e725926dc3041d9f48258c319))
* skip lifecycle scripts during docker npm ci [mojaloop/[#4479](https://github.com/mojaloop/event-sidecar/issues/4479)] ([bab207c](https://github.com/mojaloop/event-sidecar/commit/bab207c75baa44f5062d4ab92fa46fd82c1b04bf))
* update js-yaml to 4.3.2 ([03de5e0](https://github.com/mojaloop/event-sidecar/commit/03de5e0ac6342dffeb63ee814a63808f25557ba3))
* update lodash to 4.18.1 ([fd77d2c](https://github.com/mojaloop/event-sidecar/commit/fd77d2c4aeb422ef28fa376b09fba2f9df5747bb))


### Documentation

* record the ERROR_HANDLING_AJV_JOI_PARITY setting [mojaloop/[#4479](https://github.com/mojaloop/event-sidecar/issues/4479)] ([ec704dd](https://github.com/mojaloop/event-sidecar/commit/ec704dd5be9f0f3ba7a4735a530d001827474603))


### Chore

* address review comments on the contributor headers ([d22a16a](https://github.com/mojaloop/event-sidecar/commit/d22a16ac981d43727536e3e2ace7e4c3de814a49)), closes [#82](https://github.com/mojaloop/event-sidecar/issues/82)
* adopt central-services-error-handling 13.2.0 [mojaloop/[#4479](https://github.com/mojaloop/event-sidecar/issues/4479)] ([b72e134](https://github.com/mojaloop/event-sidecar/commit/b72e1347806dd593194ad5fb6e9bc32e1fa28679)), closes [mojaloop/central-services-error-handling#216](https://github.com/mojaloop/central-services-error-handling/issues/216)
* clear grype/audit findings [mojaloop/[#4479](https://github.com/mojaloop/event-sidecar/issues/4479)] ([3afd4da](https://github.com/mojaloop/event-sidecar/commit/3afd4daaf7f866dd83ff62088d4a81b2dff75f2c))
* declare OpenAPI 3.1.0 in the API document [mojaloop/[#4479](https://github.com/mojaloop/event-sidecar/issues/4479)] ([d588b37](https://github.com/mojaloop/event-sidecar/commit/d588b37c7650031bf301d488bcbf99d6f0c7d793))
* declare OpenAPI 3.2.0 in the API document [mojaloop/[#4479](https://github.com/mojaloop/event-sidecar/issues/4479)] ([2bc11cc](https://github.com/mojaloop/event-sidecar/commit/2bc11ccd3b80d686379f44a932fe5ffe4a6ea569))
* **sbom:** update sbom [skip ci] ([3e3f25c](https://github.com/mojaloop/event-sidecar/commit/3e3f25c47c870d68b4ac3b6ef840028bead472e4))
* update build orb to v2.1.7 ([c59e2e6](https://github.com/mojaloop/event-sidecar/commit/c59e2e6a83aeee746726a5c1900cb8883fb24eac))

### [14.2.3](https://github.com/mojaloop/event-sidecar/compare/v14.2.2...v14.2.3) (2026-03-23)


### Bug Fixes

* use per-major-version minimatch override to avoid breaking glob/nyc ([ae47dde](https://github.com/mojaloop/event-sidecar/commit/ae47dde32c898ca0f1b1f0f00544b3706e838672))


### Chore

* add private:true to prevent npm publish ([#4384](https://github.com/mojaloop/event-sidecar/issues/4384)) ([dc911c4](https://github.com/mojaloop/event-sidecar/commit/dc911c49f8131703b0589c96d2a2c7af729447b6))
* **sbom:** update sbom [skip ci] ([bb7c142](https://github.com/mojaloop/event-sidecar/commit/bb7c142ed3ebdcc1deab29158ba81440116c41d1))
* update dependencies and fix vulnerabilities ([665d325](https://github.com/mojaloop/event-sidecar/commit/665d32508a8d8ea0c78a1722db6a62416a3c9f9d))
* update node 22.22.1, orb 1.1.19, fix npm audit overrides ([f325f9f](https://github.com/mojaloop/event-sidecar/commit/f325f9f8ca48f961d36f85b338a126fa6240d019))

### [14.2.2](https://github.com/mojaloop/event-sidecar/compare/v14.2.1...v14.2.2) (2026-02-24)


### Bug Fixes

* add scan-type: source to .grype.yaml to fix Grype CI step ([d81ca96](https://github.com/mojaloop/event-sidecar/commit/d81ca96d1a5deb67d6399df00e1ed38216ceb1f0))
* clean up security configs, fix validator override conflict ([603d7c8](https://github.com/mojaloop/event-sidecar/commit/603d7c8cc9b315df52d7a98829dadcb05d6a68c1))
* remove minimatch 10.2.1 override (major version break) and add to audit-ci allowlist ([fe2f09e](https://github.com/mojaloop/event-sidecar/commit/fe2f09e061db289d5116c679edec62949ab887d5))


### Chore

* **sbom:** update sbom [skip ci] ([13d42db](https://github.com/mojaloop/event-sidecar/commit/13d42dbb4950e211dcaa5f2cb6c4db60e5466de7))
* update dependencies and apply security patches ([918021c](https://github.com/mojaloop/event-sidecar/commit/918021cbb432b65c19721a5df5f6fa9fd0b982c1))
* update Dockerfile NODE_VERSION to 22.22.0-alpine3.23 ([e8a5cff](https://github.com/mojaloop/event-sidecar/commit/e8a5cff4fec97af3ff38efe3fc212ed8369755dd))
* update orb ([79f9213](https://github.com/mojaloop/event-sidecar/commit/79f921397893448232f53f31e19d489ddaa28f91))

### [14.2.1](https://github.com/mojaloop/event-sidecar/compare/v14.2.0...v14.2.1) (2025-12-23)


### Chore

* fix vuls ([58a8532](https://github.com/mojaloop/event-sidecar/commit/58a8532de5813c9f6bafb80a9419b6b6754c5b60))
* meet branches code coverage ([46cb5af](https://github.com/mojaloop/event-sidecar/commit/46cb5af367c19ac3779b81c78c4f72a88b84cf05))
* **sbom:** update sbom [skip ci] ([b6937df](https://github.com/mojaloop/event-sidecar/commit/b6937df2005b08e9677ab50df1f6012a080191e5))

## [14.2.0](https://github.com/mojaloop/event-sidecar/compare/v14.1.2...v14.2.0) (2025-07-16)


### Features

* add initial abom ([9b23bd7](https://github.com/mojaloop/event-sidecar/commit/9b23bd770189a353791a92fbab7d92cba7ca115b))

### [14.1.2](https://github.com/mojaloop/event-sidecar/compare/v14.1.1...v14.1.2) (2025-06-19)


### Chore

* update orb version ([0473785](https://github.com/mojaloop/event-sidecar/commit/04737858f1bf36ba09654b3ee722b517473910a3))

### [14.1.1](https://github.com/mojaloop/event-sidecar/compare/v14.1.0...v14.1.1) (2025-06-16)


### Chore

* **sbom:** add initial sbom ([4f85d54](https://github.com/mojaloop/event-sidecar/commit/4f85d5429829432fe119027965c36b294786fdf7))
* **sbom:** update sbom-v14.1.0.csv [skip ci] ([855bd9c](https://github.com/mojaloop/event-sidecar/commit/855bd9cf981c9d87207cd89c5dfb88e10e0daaf7))

## [14.1.0](https://github.com/mojaloop/event-sidecar/compare/v14.0.3...v14.1.0) (2025-06-11)


### Features

* bump up the node version to v22.15.1 ([4cb5d9f](https://github.com/mojaloop/event-sidecar/commit/4cb5d9fc0ff692b3f6b6c41fc3bf26f27a5c07e8))
* bump up the node version to v22.15.1 ([aaf8ba2](https://github.com/mojaloop/event-sidecar/commit/aaf8ba2e67c6992a854e9d8659f155eab0a383d2))

### [14.0.3](https://github.com/mojaloop/event-sidecar/compare/v14.0.2...v14.0.3) (2025-02-25)


### Chore

* maintenance updates ([7056bbc](https://github.com/mojaloop/event-sidecar/commit/7056bbccaac5ca563b8fda39d2e6084c56eebd49))

### [14.0.2](https://github.com/mojaloop/event-sidecar/compare/v14.0.1...v14.0.2) (2025-01-16)


### Chore

* fix vulnerabilities, update dependencies ([e50a178](https://github.com/mojaloop/event-sidecar/commit/e50a1784ffb63abf1853f5064279d698e5734d03))

### [14.0.1](https://github.com/mojaloop/event-sidecar/compare/v14.0.0...v14.0.1) (2024-06-12)


### Chore

* **deps-dev:** bump ip from 2.0.0 to 2.0.1 ([93c2e76](https://github.com/mojaloop/event-sidecar/commit/93c2e76578581df0c7f8c45024d4522f8507b606))
* **deps:** bump json5 from 1.0.1 to 1.0.2 ([0193410](https://github.com/mojaloop/event-sidecar/commit/0193410d52fa8a5abf137d8288cba021d0ef4e0c))

## [14.0.0](https://github.com/mojaloop/event-sidecar/compare/v13.0.1...v14.0.0) (2023-11-06)


### Bug Fixes

* **mojaloop/#3615:** update dependencies ([#56](https://github.com/mojaloop/event-sidecar/issues/56)) ([e90581f](https://github.com/mojaloop/event-sidecar/commit/e90581f0e6cea2bb787894b5f937d22e6facc6ed)), closes [mojaloop/#3615](https://github.com/mojaloop/project/issues/3615)

### [13.0.1](https://github.com/mojaloop/event-sidecar/compare/v13.0.0...v13.0.1) (2023-10-13)


### Chore

* add missing advisory ([ccc365a](https://github.com/mojaloop/event-sidecar/commit/ccc365ac1fc14273a472c7035ee2cc040dddfd7d))
* update deps ([901a695](https://github.com/mojaloop/event-sidecar/commit/901a6955dbc1b281f64f356c406106736bf987a6))

## [13.0.0](https://github.com/mojaloop/event-sidecar/compare/v12.0.0...v13.0.0) (2023-09-14)


### Chore

* **mojaloop/#3443:** nodejs upgrade ([#54](https://github.com/mojaloop/event-sidecar/issues/54)) ([03994b7](https://github.com/mojaloop/event-sidecar/commit/03994b7ef39ddd8e2d3e32c97ea0d5d5ed2be591)), closes [mojaloop/#3443](https://github.com/mojaloop/project/issues/3443)

## [12.0.0](https://github.com/mojaloop/event-sidecar/compare/v12.0.0-snapshot.6...v12.0.0) (2022-07-18)


### ⚠ BREAKING CHANGES

* **mojaloop/#2092:** Major version bump for node v16 LTS support, re-structuring of project directories to align to core Mojaloop repositories and docker image now uses `/opt/app` instead of `/opt/event-sidecar` which will impact config mounts.

### Features

* **mojaloop/#2092:** upgrade nodeJS version for core services ([#49](https://github.com/mojaloop/event-sidecar/issues/49)) ([138c8bf](https://github.com/mojaloop/event-sidecar/commit/138c8bf0e41e53be71ecd72202c4155df6e3521f)), closes [mojaloop/#2092](https://github.com/mojaloop/project/issues/2092)
