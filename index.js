const express = require("express")

const app = express();
app.get("/",(req,res)=>{
  res.send("connected");
})

app.listen(5000,console.log("Serve Started on PORT 5000"))

async function main() {
  const Hyperdrive = require('hyperdrive')
  const Corestore = require('corestore')

  const store = new Corestore('./storage')
  const drive = new Hyperdrive(store)

  await drive.put('/blob.txt', Buffer.from('example'))
  await drive.put('/images/logo.png', Buffer.from('..'))
  await drive.put('/images/old-logo.png', Buffer.from('..'))

  const buffer = await drive.get('/blob.txt')
  console.log(buffer) 

  const entry = await drive.entry('/blob.txt')
  console.log(entry)

  await drive.del('/images/old-logo.png')

  await drive.symlink('/images/logo.shortcut', '/images/logo.png')

  for await (const file of drive.list('/images')) {
    console.log('list', file) // => { key, value }
  }

  const rs = drive.createReadStream('/blob.txt')
  for await (const chunk of rs) {
    console.log('rs', chunk) 
  }

  const ws = drive.createWriteStream('/blob.txt')
  ws.write('new example')
  ws.end()
  ws.once('close', () => console.log('file saved'))
}

main()
