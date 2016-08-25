'use babel'

import { Disposable, CompositeDisposable } from 'atom'

export default {
  disposables: null,
  projectManager: null,

  provideDictionary () {
    return this.projectManager.provideDictionary()
  },

  activate () {
    this.disposables = new CompositeDisposable()

    let ProjectManager = require('./project-manager')
    this.projectManager = new ProjectManager()
    this.disposables.add(this.projectManager)

    require('atom-package-deps').install('linter-spell-project')
      .then(() => {
        console.log('All dependencies installed, good to go')
      })
  },

  deactivate () {
    this.disposables.dispose()
  }
}
