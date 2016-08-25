'use babel'

import * as _ from 'lodash'
import * as fs from 'fs-plus'
import { Disposable } from 'atom'

export default class ProjectDictionary extends Disposable {

  constructor (languagePath) {
    super(() => {
      this.disposables.dispose()
      if (this.watcher) this.watcher.close()
    })
    this.languagePath = languagePath
    this.watcher = null
    this.data = null
  }

  getKnownWords () {
    if (this.data) return this.data.knownWords
    if (!fs.isFileSync(this.languagePath)) return []
    this.readData()
    return this.data.knownWords
  }

  addWatcher () {
    this.watcher = fs.watch(this.languagePath, () => {
      this.data = null
    })
  }

  readData () {
    console.log('read')
    this.data = JSON.parse(fs.readFileSync(this.languagePath))
    if (!this.watcher) this.addWatcher
  }

  addWord (word) {
    console.log('add')
    if (this.data) {
      this.data.knownWords.push(word)
    } else {
      this.data = { knownWords: [word] }
    }
    fs.writeFile(this.languagePath, JSON.stringify(this.data, null, '\t'), () => {
      if (!this.watcher) this.addWatcher()
    })
  }

  checkWord (text) {
    for (const word of this.getKnownWords()) {
      if (text === word) {
        return { isWord: true }
      }
    }

    return {
      isWord: false,
      actions: [{
        title: "Add to project dictionary",
        apply: () => {
          this.addWord(text)
        }
      }, {
        title: "Add to project dictionary (case sensitive)",
        apply: () => {
          this.addWord(text)
        }
      }]
    }
  }

}
