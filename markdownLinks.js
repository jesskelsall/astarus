const fs = require('fs')
const { dropRight, flow, keys, last, flatten, set, orderBy, isString } = require('lodash/fp')
const path = require('path')

const ignoredFiles = [
  'README.md',
  'astarus/gods/README.md',
]

const getFileTitle = (fileContents) => {
  const firstLine = fileContents.split('\n')[0]

  if (!firstLine.startsWith('# ')) return null
  return firstLine.slice(2).trim().toLowerCase()
}

const readFileTitles = (directory, titles = {}) => {
  const files = fs.readdirSync(directory)

  return files.reduce(
    (collatedTitles, file) => {
      if (file.startsWith('.')) return collatedTitles

      const filePath = path.join(directory, file)
      if (ignoredFiles.includes(filePath)) return collatedTitles

      const isDirectory = fs.lstatSync(filePath).isDirectory()

      if (isDirectory) return readFileTitles(filePath, collatedTitles)

      if (file.endsWith('.md')) {
        const fileContents = fs.readFileSync(filePath).toString()

        const formattedTitle = getFileTitle(fileContents)
        if (formattedTitle === null) return collatedTitles

        if (formattedTitle in collatedTitles) console.log(`WARNING: Title already exists: ${formattedTitle}`)

        return flow(
          set([formattedTitle], {
            isPlural: false,
            filePath,
          }),
          set([`${formattedTitle}s`], {
            isPlural: true,
            filePath,
          }),
        )(collatedTitles)
      }

      return collatedTitles
    },
    titles,
  )
}

const titles = readFileTitles('.')

const splitLinksFromContent = (content) => {
  const linkRegex = /\[(.+?)\]\((.*?)\)/
  const imageRegex = /(<img.*?>)/ig

  const contentParts = []
  let remainingContent = content

  while (remainingContent) {
    const match = remainingContent.match(linkRegex)

    if (!match) {
      contentParts.push(remainingContent)
      remainingContent = ''
    } else {
      const { index } = match

      if (index > 0) {
        contentParts.push(remainingContent.slice(0, index))
        remainingContent = remainingContent.slice(index)
      } else {
        if (Object.keys(titles).includes(match[1].toLowerCase())) {
          contentParts.push(match[1])
        } else {
          contentParts.push({
            text: match[1],
            path: match[2],
          })
        }

        remainingContent = remainingContent.slice(match[0].length)
      }
    }
  }

  const joinedStrings = contentParts.reduce((joinedParts, part) => {
    if (!joinedParts.length) return [part]

    if (isString(last(joinedParts)) && isString(part)) {
      return [...dropRight(1, joinedParts), [last(joinedParts), part].join('')]
    }

    return [...joinedParts, part]
  }, [])

  const splitImageLinks = flatten(joinedStrings.map((part) => {
    if (typeof part !== 'string') return part
    return part.split(imageRegex)
  }))

  return splitImageLinks
}

applyLinksToFile = (filePath, fileContents) => {
  const contentParts = splitLinksFromContent(fileContents)

  const fileTitle = getFileTitle(fileContents)

  const orderedTitles = flow(
    keys,
    orderBy(['length'], ['desc'])
  )(titles)
  const splitRegex = new RegExp(`\\b(${orderedTitles.join('|')})(s|)\\b`, 'gi')

  const linkedContentParts = flatten(contentParts.map((part) => {
    if (typeof part !== 'string') return part
    if (part.startsWith('<img')) return part

    return part
      .split(splitRegex)
      .map((splitPart) => {
        const titleObject = titles[splitPart.toLowerCase()]
        if (titleObject) {
          const { isPlural } = titleObject
          const singularFileTitle = isPlural ? `${fileTitle}s` : fileTitle
          if (splitPart.toLowerCase() === singularFileTitle) return splitPart
        }

        if (orderedTitles.includes(splitPart.toLowerCase())) return { text: splitPart }
        return splitPart
      })
  }))

  const appliedLinks = linkedContentParts.map((part) => {
    if (typeof part === 'string') return part

    const titlePath = titles[part.text.toLowerCase()]
    if (!titlePath) return `[${part.text}](${part.path || ''})`

    const relativePath = path.relative(filePath, titlePath.filePath).replace('../', '')
    return `[${part.text}](${relativePath})`
  })

  return appliedLinks.join('')
}

const writeLinksToFiles = (directory) => {
  const files = fs.readdirSync(directory)

  files.forEach((file) => {
    if (file.startsWith('.')) return

    const filePath = path.join(directory, file)
    if (ignoredFiles.includes(filePath)) return

    const isDirectory = fs.lstatSync(filePath).isDirectory()

    if (isDirectory) return writeLinksToFiles(filePath)

    if (file.endsWith('.md')) {
      const fileContents = fs.readFileSync(filePath).toString()
      const linkedContent = applyLinksToFile(filePath, fileContents)

      if (fileContents === linkedContent) return

      console.log('Writing:', filePath)
      fs.writeFileSync(filePath, linkedContent)
    }
  })
}

writeLinksToFiles('.')
