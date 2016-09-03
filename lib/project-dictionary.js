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
    this.data = null
  }

  getWords () {
    try {
      if (this.data) return this.data.knownWords
      if (!fs.isFileSync(this.languagePath)) return []
      this.data = JSON.parse(fs.readFileSync(this.languagePath))
      if (!this.watcher) this.addWatcher()
      return this.data.knownWords
    } catch (e) {
    }
  }

  addWatcher () {
    this.watcher = fs.watch(this.languagePath, () => {
      this.data = null
    })
  }

  addWord (word) {
    try {
      if (this.data) {
        this.data.knownWords.push(word)
      } else {
        this.data = { knownWords: [word] }
      }
      fs.writeFile(this.languagePath, JSON.stringify(this.data, null, '\t'), (err) => {
        if (!err && !this.watcher) this.addWatcher()
      })
    } catch (e) {
    }
  }

}
