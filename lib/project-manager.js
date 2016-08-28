'use babel'

import * as path from 'path'
import { Disposable, CompositeDisposable } from 'atom'
import ProjectDictionary from './project-dictionary'
import { WordList } from 'linter-spell-word-list'

export default class ProjectManager extends WordList {

  constructor () {
    super({
      name: 'project'
    })
    this.projects = new Map()
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

  getWords (textEditor, languages) {
    const project = this.getProject(textEditor)
    return project ? project.getWords() : []
  }

  addWord (textEditor, languages, word) {
    const project = this.getProject(textEditor)
    if (project) project.addWord(word)
  }

}
