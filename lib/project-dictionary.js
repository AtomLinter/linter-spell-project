'use babel'

import * as fs from 'fs-plus'
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

  getKnownWords () {
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

  checkWord (text) {
    for (const word of this.getKnownWords()) {
      if ((word.startsWith('!') && text === word.substring(1)) || text.toLowerCase() === word.toLowerCase()) {
        return { isWord: true }
      }
    }

    const result = {
      isWord: false,
      actions: [{
        title: 'Add to project dictionary',
        apply: () => {
          this.addWord(text.toLowerCase())
        }
      }]
    }
    // If the text has uppercase letters then include option for case sensitive add
    if (text.toLowerCase() !== text) {
      result.actions.push({
        title: 'Add to project dictionary (case sensitive)',
        apply: () => {
          this.addWord('!' + text)
        }
      })
    }

    return result
  }

}
