# linter-spell-project

[![Travis-CI Build Status](https://img.shields.io/travis/AtomLinter/linter-spell-project/master.svg?label=Linux/OSX%20build)](https://travis-ci.org/AtomLinter/linter-spell-project)
[![AppVeyor Build Status](https://img.shields.io/appveyor/ci/yitzchak/linter-spell-project/master.svg?label=Windows%20build)](https://ci.appveyor.com/project/yitzchak/linter-spell-project)
[![David](https://img.shields.io/david/AtomLinter/linter-spell-project.svg)](https://david-dm.org/AtomLinter/linter-spell-project)

Provider for Atom [linter-spell](https://atom.io/packages/linter-spell) package
to enable project specific dictionaries.

## Installing

Use the Atom package manager and search for "linter-spell-project", or run
`apm install linter-spell-project` from the command line.

## Prerequisites

This package relies upon [linter-spell](https://atom.io/packages/linter-spell).

## Usage

Project specific dictionaries are accomplished by providing a `language.json` in
the project root. This is intended to be compatible with
[spell-check-project](https://atom.io/packages/spell-check-project). Note that
case sensitive words should be preceded with an exclamation sign.

```json
{
  "knownWords": [
    "foo",
    "!Bar"
  ]
}
```

## Status

Please note that this package is in an **beta** state.
