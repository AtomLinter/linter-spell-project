'use babel'

import fs from 'fs-plus'
import { Disposable } from 'atom'

export default class ProjectDictionary extends Disposable {

  constructor (languagePath) {
    super(() => {
      if (this.watcher) this.watcher.close()
    })
    this.languagePath = languagePath
    this.watcher = null
    this.loadWords()
  }

  getWords () {
    this.loadWords()
    return this.data ? this.data.knownWords : []
  }

  saveWords () {
    try {
      this.closeWatcher()
      fs.writeFile(this.languagePath, JSON.stringify(this.data, null, '\t'), err => {
        if (!err) this.addWatcher()
      })
    } catch (e) {}
  }

  loadWords (force = false) {
    try {
      if (this.data && !force) return
      this.data = JSON.parse(fs.readFileSync(this.languagePath))
      this.addWatcher()
    } catch (e) {
      this.data = null
    }
  }

  addWatcher () {
    if (!this.watcher) {
      this.watcher = fs.watch(this.languagePath, type => {
        if (type === 'change') {
          this.loadWords(true)
        }
      })
    }
  }

  closeWatcher () {
    if (this.watcher) {
      this.watcher.close()
      this.watcher = null
    }
  }

  addWord (word) {
    this.loadWords()
    if (this.data) {
      this.data.knownWords.push(word)
    } else {
      this.data = { knownWords: [word] }
    }
    this.saveWords()
  }

}
