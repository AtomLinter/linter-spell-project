'use babel'

import { Disposable } from 'atom'

export default class ProjectManager extends Disposable {

  constructor () {
    super(() => {

    })
    this.projects = new Map()
  }

  provideDictionary () {
    return [{
      name: 'linter-spell-project',
      checkWord: (textEditor, languages, range) => {
        return new Promise((resolve, reject) => resolve({
          isWord: false, // return true if word is found
          suggestions: ['bar'],
          actions: [{
            title: "Add to Markdown dictionary",
            apply: () => { /* add word to your dictionary. Return true if warning should be removed. */ }
          }]
        })
      }
    }]
  }

}
