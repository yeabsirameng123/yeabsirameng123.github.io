const fs = require('node:fs')
const path = require('node:path')

const root = path.resolve(__dirname, '..')
fs.copyFileSync(path.join(root, 'src', 'index.html'), path.join(root, 'index.html'))
