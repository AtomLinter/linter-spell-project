'use babel'

import * as _ from 'lodash'
import * as path from 'path'
import { Range } from 'atom'

describe('Project dictionary for Atom Linter', () => {
  beforeEach(() => {
    waitsForPromise(() => {
      atom.project.addPath('.')
      return atom.packages.activatePackage('linter-spell-project')
    })
  })

  it('finds a spelling in "foo.txt"', () => {
    console.log(atom.project.getPaths())
    waitsForPromise(() => {
      return atom.workspace.open(path.join(__dirname, 'files', 'foo.txt')).then(editor => {
        let dictionary = require('../lib/main').provideDictionary()
        return Promise.all([
          dictionary.checkWord(editor, ['en-US'], new Range([0, 0], [0, 3])).then(result => {
            expect(result.isWord).toBe(false, 'Verify that the word "one" is not in the project dictionary.')
          }),
          dictionary.checkWord(editor, ['en-US'], new Range([0, 4], [0, 11])).then(result => {
            expect(result.isWord).toBe(true, 'Verify that the word "morning" is in the project dictionary.')
          })
        ])
      })
    })
  })
})
