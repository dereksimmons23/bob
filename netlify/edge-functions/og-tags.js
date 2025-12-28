// Netlify Edge Function for dynamic OG tags on shared brackets/vaults
// Intercepts /b/[id] and /v/[id] requests to inject dynamic meta tags

const SUPABASE_URL = 'https://vvroarbpvfsoiznkbfvt.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ2cm9hcmJwdmZzb2l6bmtiZnZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYxOTgzMDQsImV4cCI6MjA4MTc3NDMwNH0.nI9kUemYIkVaAULWs3piPVfQeCoUqZ8CYGX8MwNn0Wk'

async function fetchBracket(id) {
  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/shared_brackets?id=eq.${id}&select=*`,
    {
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      },
    }
  )
  const data = await response.json()
  return data?.[0] || null
}

async function fetchVault(id) {
  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/shared_vaults?id=eq.${id}&select=*`,
    {
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      },
    }
  )
  const data = await response.json()
  return data?.[0] || null
}

function generateOgTags(type, data, url) {
  if (type === 'bracket' && data) {
    const title = `${data.champion} wins ${data.category}!`
    const description = `${data.champion} crowned champion of "${data.category}" in Battle o' Brackets! Defeated ${data.runner_up} in the final.`

    return `
    <meta property="og:type" content="website" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="https://bob.claudewill.io/og-image.png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(title)}" />
    <meta name="twitter:description" content="${escapeHtml(description)}" />
    <meta name="twitter:image" content="https://bob.claudewill.io/og-image.png" />`
  }

  if (type === 'vault' && data) {
    const title = `The Vault - ${data.champion_count} Champions`
    const description = `${data.champion_count} champions crowned in Battle o' Brackets! Check out this legendary vault.`

    return `
    <meta property="og:type" content="website" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="https://bob.claudewill.io/og-image.png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(title)}" />
    <meta name="twitter:description" content="${escapeHtml(description)}" />
    <meta name="twitter:image" content="https://bob.claudewill.io/og-image.png" />`
  }

  return ''
}

function escapeHtml(text) {
  if (!text) return ''
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export default async function handler(request, context) {
  const url = new URL(request.url)
  const path = url.pathname

  // Only process /b/[id] and /v/[id] paths
  const bracketMatch = path.match(/^\/b\/([a-f0-9-]+)$/i)
  const vaultMatch = path.match(/^\/v\/([a-f0-9-]+)$/i)

  if (!bracketMatch && !vaultMatch) {
    return context.next()
  }

  // Get the original response
  const response = await context.next()
  const html = await response.text()

  let ogTags = ''

  if (bracketMatch) {
    const id = bracketMatch[1]
    const bracket = await fetchBracket(id)
    ogTags = generateOgTags('bracket', bracket, url.href)
  } else if (vaultMatch) {
    const id = vaultMatch[1]
    const vault = await fetchVault(id)
    ogTags = generateOgTags('vault', vault, url.href)
  }

  if (ogTags) {
    // Replace existing OG tags with dynamic ones
    const modifiedHtml = html
      .replace(/<!-- Open Graph -->[\s\S]*?<!-- Twitter -->[\s\S]*?<meta name="twitter:image"[^>]*>/g, ogTags)
      // Also update the title
      .replace(/<title>[^<]*<\/title>/, (match) => {
        if (bracketMatch) {
          return `<title>Battle o' Brackets | Shared Bracket</title>`
        }
        return match
      })

    return new Response(modifiedHtml, {
      headers: {
        'content-type': 'text/html',
        ...Object.fromEntries(response.headers),
      },
    })
  }

  return response
}

export const config = {
  path: ['/b/*', '/v/*'],
}
