import { log } from "console"
import { open } from "fs/promises"
import { createServer } from "http"
import { basename, extname, join } from "path"
import { createGzip } from "zlib"
import data from "./data.js"

createServer()
  .on("request", async (req, res) => {
    if (req.url === "/api/v1/people") {
      res.writeHead(200, { "Content-Type": "application/json" })
      return res.end(JSON.stringify({ status: true, data }))
    }

    const fileName = req.url === "/" ? "index.html" : basename(req.url)
    const filePath = join(process.cwd(), "public", fileName)
    const extName = extname(fileName)
    let contentType = "text/html"

    switch (extName) {
      case ".css":
        contentType = "text/css"
        break
      case ".js":
        contentType = "text/javascript"
        break
    }

    try {
      const fh = await open(filePath, "r")

      const readStream = fh.createReadStream({ encoding: "utf8" })
      const transformStream = createGzip()

      res.writeHead(200, {
        "Content-Type": contentType,
        "content-encoding": "gzip",
      })

      readStream.on("close", () => {
        readStream.unpipe(transformStream).unpipe(res)
        fh.close()
      })

      readStream.pipe(transformStream).pipe(res)
    } catch (err) {
      const fh = await open(join(process.cwd(), "public", "404.html"), "r")

      const readStream = fh.createReadStream({ encoding: "utf8" })
      const transformStream = createGzip()

      res.writeHead(404, {
        "Content-Type": contentType,
        "content-encoding": "gzip",
      })

      readStream.on("close", () => {
        readStream.unpipe(transformStream).unpipe(res)
        fh.close()
      })

      readStream.pipe(transformStream).pipe(res)
    }
  })
  .listen(5500, () => log("Listening on port 5500"))
