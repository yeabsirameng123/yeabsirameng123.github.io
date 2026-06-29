const fs = require('node:fs')
const path = require('node:path')

const root = path.resolve(__dirname, '..')
const dist = path.join(root, 'dist')
const assets = path.join(root, 'assets')

if (!fs.existsSync(dist)) {
  throw new Error('dist does not exist. Run the production build first.')
}

fs.mkdirSync(assets, { recursive: true })
for (const file of fs.readdirSync(assets)) {
  if (/^index-.*\.(js|css)$/.test(file)) {
    fs.unlinkSync(path.join(assets, file))
  }
}

fs.copyFileSync(path.join(dist, 'index.html'), path.join(root, 'index.html'))
fs.copyFileSync(path.join(dist, 'profile.jpg'), path.join(root, 'profile.jpg'))
fs.writeFileSync(path.join(root, '.nojekyll'), '')

for (const file of fs.readdirSync(path.join(dist, 'assets'))) {
  fs.copyFileSync(path.join(dist, 'assets', file), path.join(assets, file))
}
