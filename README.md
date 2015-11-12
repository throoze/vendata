Vendata
=======

A platform for a hosted repository and the interfaces to help people ask
information from it.

## Important!

Use `nodejs` engine version less than `v0.12.7`. This is due to a dependency
on the `jquery` CommonJS Package, that won't work while running on the server
side, unless it uses `jsdom@3.1.2` which depends on `contextify` which will
only compile with the mentioned `nodejs` engine, since its `node-gyp` package
is the only one able to compile it.

## Getting Started

- Clone this repository
- `cd` to the repo's root folder
- `$ npm install`
- `$ bundle`
- `$ bundle exec rails server`
