const fs = require('fs')
const path = require('path')
const { assign } = require('lodash/fp')

// Read all of the markdown files in the directory
// Build a list of paths and h1 titles

const basePath = '.'

const readFileTitles = (directory) => {
  const files = fs.readdirSync(directory)

  return files.reduce(
    (directoryFiles, file) => {
      if (file.startsWith('.')) return directoryFiles

      const filePath = path.join(directory, file)
      const isDirectory = fs.lstatSync(filePath).isDirectory()

      if (isDirectory) return [...directoryFiles, ...readFileTitles(filePath)]

      if (file.endsWith('.md')) {
        const fileContents = fs.readFileSync(filePath).toString()
        const firstLine = fileContents.split('\n')[0]

        if (!firstLine.startsWith('# ')) return directoryFiles
        console.dir(firstLine)

        return [...directoryFiles, filePath]
      }

      return directoryFiles
    },
    [],
  )
}

const titles = readFileTitles(basePath)
console.log({ titles })