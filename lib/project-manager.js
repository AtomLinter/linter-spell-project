'use babel'

import path from 'path'
import fs from 'fs-plus'
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
    try {
      const filePath = textEditor.getPath()
      if (filePath) {
        const [projectPath, relativePath] = atom.project.relativizePath(filePath)
        if (projectPath) {
          let project = this.projects.get(projectPath)
          if (!project) {
            const languagePath = path.join(projectPath, 'language.json')
            fs.accessSync(languagePath, fs.R_OK | fs.W_OK)
            project = new ProjectDictionary(languagePath)
            this.projects.set(projectPath, project)
            this.disposables.add(project)
          }
          return project
        }
      }
    } catch (e) {
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
