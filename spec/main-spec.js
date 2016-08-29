'use babel'

import * as _ from 'lodash'
import * as path from 'path'

describe('Project dictionary for Atom Linter', () => {
  const dictionary = require('../lib/main').provideDictionary()

  beforeEach(() => {
    waitsForPromise(() => {
      return atom.packages.activatePackage('linter-spell-project')
    })
  })

  it('finds a spelling in "foo.txt"', () => {
    waitsForPromise(() => {
      return atom.workspace.open(path.join(__dirname, 'files', 'foo.txt')).then(editor => {
        return lint(editor).then(messages => {
          expect(_.some(messages, (message) => { return message.text.match(/^armour( ->|$)/) })).toBe(true)
        })
      })
    })
  })
})
