# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [12.0.0](https://github.com/mojaloop/event-sidecar/compare/v12.0.0-snapshot.6...v12.0.0) (2022-07-18)


### ⚠ BREAKING CHANGES

* **mojaloop/#2092:** Major version bump for node v16 LTS support, re-structuring of project directories to align to core Mojaloop repositories and docker image now uses `/opt/app` instead of `/opt/event-sidecar` which will impact config mounts.

### Features

* **mojaloop/#2092:** upgrade nodeJS version for core services ([#49](https://github.com/mojaloop/event-sidecar/issues/49)) ([138c8bf](https://github.com/mojaloop/event-sidecar/commit/138c8bf0e41e53be71ecd72202c4155df6e3521f)), closes [mojaloop/#2092](https://github.com/mojaloop/project/issues/2092)
