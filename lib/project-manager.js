'use babel'

import * as path from 'path'
import { Disposable, CompositeDisposable } from 'atom'
import ProjectDictionary from './project-dictionary'

export default class ProjectManager extends Disposable {

  constructor () {
    super(() => {
      this.disposables.dispose()
    })
    this.projects = new Map()
    this.disposables = new CompositeDisposable()
  }

  getProject (textEditor) {
    const filePath = textEditor.getPath()
    if (filePath) {
      const [projectPath, relativePath] = atom.project.relativizePath(filePath)
      if (projectPath) {
        let project = this.projects.get(projectPath)
        if (!project) {
          project = new ProjectDictionary(path.join(projectPath, 'language.json'))
          this.projects.set(projectPath, project)
          this.disposables.add(project)
        }
        return project
      }
    }
  }

  provideDictionary () {
    return [{
      name: 'linter-spell-project',
      checkWord: (textEditor, languages, range) => {
        return new Promise((resolve, reject) => {
          const text = textEditor.getTextInBufferRange(range)
          const project = this.getProject(textEditor)
          resolve(project ? project.checkWord(text) : { isWord: false })
        })
      }
    }]
  }

}
