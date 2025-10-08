import { createServer } from 'node:http'
import server from './dist/server/server.js'

const PORT = process.env.PORT || 3000
const HOST = process.env.HOST || '0.0.0.0'

const httpServer = createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`)

  const request = new Request(url, {
    method: req.method,
    headers: req.headers,
    body: req.method !== 'GET' && req.method !== 'HEAD' ? req : undefined,
  })

  const response = await server.fetch(request)

  res.statusCode = response.status
  res.statusMessage = response.statusText

  response.headers.forEach((value, key) => {
    res.setHeader(key, value)
  })

  if (response.body) {
    for await (const chunk of response.body) {
      res.write(chunk)
    }
  }

  res.end()
})

httpServer.listen(PORT, HOST, () => {
  console.log(`Server listening on http://${HOST}:${PORT}`)
})
