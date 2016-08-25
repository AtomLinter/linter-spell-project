'use babel'

import * as fs from 'fs-plus'
import { Disposable } from 'atom'

export default class ProjectDictionary extends Disposable {

  constructor (languagePath) {
    super(() => {
      this.disposables.dispose()
    })
    this.languagePath = languagePath

    if (fs.isFileSync(languagePath)) {
      this.data = require(languagePath)
    } else {
      this.data = { knownWords: [] }
    }

  }

  checkWord (text) {
    for (const word of this.data.knownWords) {
      if (text === word) {
        return { isWord: true }
      }
    }

    return {
      isWord: false,
      actions: [{
        title: "Add to project dictionary",
        apply: () => {
          this.data.knownWords.push(text)
        }
      }, {
        title: "Add to project dictionary (case sensitive)",
        apply: () => {
          this.data.knownWords.push(text)
        }
      }]
    }
  }

}
