
import {
  serveDir,
} from '@std/http'

const handler = {
  fetch: async (request: Request) => {
    const response = await serveDir(request, {
      fsRoot: './src',
      showDirListing: true,
    })
    return response
  },
}

export default handler
