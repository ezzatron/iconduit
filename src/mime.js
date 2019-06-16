const mime = require('mime')
const {extname} = require('path')

module.exports = {
  getType,
}

function getType (filename) {
  const result = mime.getType(filename)

  if (result) return result

  switch (extname(filename)) {
    case '.icns':
      return 'image/icns'
  }

  throw new Error(`Unable to determine MIME type for ${filename}`)
}
