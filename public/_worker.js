addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  
  // If the request is for a file that exists, serve it
  if (url.pathname.includes('.')) {
    return fetch(request)
  }
  
  // For all other requests, serve index.html
  const indexUrl = new URL(request.url)
  indexUrl.pathname = '/index.html'
  
  return fetch(indexUrl)
} 