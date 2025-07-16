# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

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
