# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [13.0.0](https://github.com/mojaloop/event-sidecar/compare/v12.0.0...v13.0.0) (2023-09-14)


### Chore

* **mojaloop/#3443:** nodejs upgrade ([#54](https://github.com/mojaloop/event-sidecar/issues/54)) ([03994b7](https://github.com/mojaloop/event-sidecar/commit/03994b7ef39ddd8e2d3e32c97ea0d5d5ed2be591)), closes [mojaloop/#3443](https://github.com/mojaloop/project/issues/3443)

## [12.0.0](https://github.com/mojaloop/event-sidecar/compare/v12.0.0-snapshot.6...v12.0.0) (2022-07-18)


### ⚠ BREAKING CHANGES

* **mojaloop/#2092:** Major version bump for node v16 LTS support, re-structuring of project directories to align to core Mojaloop repositories and docker image now uses `/opt/app` instead of `/opt/event-sidecar` which will impact config mounts.

### Features

* **mojaloop/#2092:** upgrade nodeJS version for core services ([#49](https://github.com/mojaloop/event-sidecar/issues/49)) ([138c8bf](https://github.com/mojaloop/event-sidecar/commit/138c8bf0e41e53be71ecd72202c4155df6e3521f)), closes [mojaloop/#2092](https://github.com/mojaloop/project/issues/2092)
