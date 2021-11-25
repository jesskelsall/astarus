const fs = require('fs')
const { isUndefined } = require('lodash')
const { dropRight, flatten, flow, identity, isString, keys, last, map, orderBy, replace, set } = require('lodash/fp')
const path = require('path')

// Files not added to the library of potential links.
// These pages won't get linked to at all
const unmappedFiles = [
  'README.md',
]

// Files that don't have links applied to them
const unlinkedFiles = [
  'characters/non-astarus',
  'README.md',
]

const applyAccentReplacements = (contents) => [
  ['Asterr', 'Astérr'],
  ['Cote', 'Côte'],
  ['Cotedouce', 'Côtedouce'],
  ['Dunnesland', 'Dünnesland'],
  ['Saoirse o Dochartaigh', 'Saoirse ó Dochartaigh'],
  ['Vetrall', 'Vētrall'],
  ['Zolne', 'Zolné'],
].reduce(
  (updatedContent, [from, to]) => updatedContent.replace(new RegExp(from, 'g'), to),
  contents,
)

const getFileTitles = (fileContents) => {
  const firstLine = fileContents.split('\n')[0]

  if (!firstLine.startsWith('# ')) return null
  return firstLine.slice(2).split('/').map((title) => title.trim().toLowerCase())
}

const readFileTitles = (directory, titles = {}) => {
  const files = fs.readdirSync(directory)

  return files.reduce(
    (collatedTitles, file) => {
      if (file.startsWith('.')) return collatedTitles

      const filePath = path.join(directory, file)

      if (unmappedFiles.includes(filePath)) return collatedTitles

      const isDirectory = fs.lstatSync(filePath).isDirectory()

      if (isDirectory) return readFileTitles(filePath, collatedTitles)

      if (file.endsWith('.md')) {
        const fileContents = fs.readFileSync(filePath).toString()

        const formattedTitles = getFileTitles(fileContents)
        if (formattedTitles === null) return collatedTitles

        formattedTitles.forEach((title) => {
          if (title in collatedTitles) console.log(`WARNING: Title already exists: ${title}`)
        })

        return flow(
          ...formattedTitles.map((title) => flow(
            set([title], {
              isPlural: false,
              filePath,
            }),
            title.length > 2
              ? set([`${title}s`], {
                isPlural: true,
                filePath,
              })
              : identity,
          ))
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

  const fileTitles = getFileTitles(fileContents)

  const orderedTitles = flow(
    keys,
    orderBy(['length'], ['desc']),
  )(titles)
  const regexTitles = map(flow(
    replace(/\(/g, '\\('),
    replace(/\)/g, '\\)'),
    replace(/\./g, '\\.'),
  ), orderedTitles)

  const splitRegex = new RegExp(`\\b(${regexTitles.join('|')})(s|)\\b`, 'gi')

  const linkedContentParts = flatten(contentParts.map((part) => {
    if (typeof part !== 'string') return part
    if (part.startsWith('<img')) return part

    return part
      .split(splitRegex)
      .map((splitPart) => {
        const titleObject = titles[splitPart.toLowerCase()]
        if (titleObject) {
          const { isPlural } = titleObject
          const samePluralisationTitles = isPlural ? fileTitles.map((title) => `${title}s`) : fileTitles
          if (samePluralisationTitles.includes(splitPart.toLowerCase())) return splitPart
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
    if (unlinkedFiles.some((unlinkedFile) => filePath.includes(unlinkedFile))) return

    const isDirectory = fs.lstatSync(filePath).isDirectory()

    if (isDirectory) return writeLinksToFiles(filePath)

    if (file.endsWith('.md')) {
      const fileContents = fs.readFileSync(filePath).toString()
      const accentedFileContents = applyAccentReplacements(fileContents)
      const linkedContent = applyLinksToFile(filePath, accentedFileContents)

      if (fileContents === linkedContent) return

      console.log('Writing:', filePath)
      fs.writeFileSync(filePath, linkedContent)
    }
  })
}

writeLinksToFiles('.')
