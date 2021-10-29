# Changelog

All the notable changes made to the [todohipo](https://todohipo.com) project.

## [Unreleased]

### Changed

- Updated dependencies.

## [1.1.0] - 2020-05-01

### Added

- Show rating and click totals for each tip if ADMIN.

### Changed

- Check for 'ADMIN' user role to allow to see certain pages and areas instead of hardcoding my email.
- Restrict access to the _new tip_, _tip update_, and _bulk-add_ pages. 🤦‍♂️
- Pass environment to pug through res.locals.

### Fixed

- Only show GA code on production.
- Only show User Register Form on development. On prod, just flash error and redirect home.
- Actually show a 404 error page and text on production. Can be improved.
- Big changes regarding the `express-validator` module for register.

### Removed

- Sitemap removed, need to fix this but package is very different now.
- Remove some unnecessary packages and helper functions.

## [1.0.0] - 2020-02-09

### Added

- Add pushing to prod with GIT
- Add proper logging on DigitalOcean

### Changed

- Change folders to make everything more clear, app into its separate folder

## [0.0.1] - 2018-02-12

Initial release 🎊

(Some untracked posterior small tweaks were made)
