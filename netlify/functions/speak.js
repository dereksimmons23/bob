/**
 * Netlify Function — ElevenLabs TTS proxy for BOB
 * Keeps API key server-side. Frontend calls /.netlify/functions/speak
 */
export default async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    })
  }

  if (req.method !== 'POST') {
    return Response.json({ error: 'Method not allowed' }, { status: 405 })
  }

  const apiKey = process.env.ELEVENLABS_API_KEY
  const voiceId = process.env.ELEVENLABS_VOICE_ID || 'Bj9UqZbhQsanLzgalpEG' // Austin - Good ol' Texas

  if (!apiKey) {
    return Response.json({ error: 'Voice not configured' }, { status: 503 })
  }

  let body
  try {
    body = await req.json()
  } catch {
    return Response.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { text } = body || {}
  if (!text || !text.trim()) {
    return Response.json({ error: 'Text required' }, { status: 400 })
  }

  try {
    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
      {
        method: 'POST',
        headers: {
          'xi-api-key': apiKey,
          'Content-Type': 'application/json',
          'Accept': 'audio/mpeg',
        },
        body: JSON.stringify({
          text: text.trim(),
          model_id: 'eleven_turbo_v2_5',
          voice_settings: {
            stability: 0.4,
            similarity_boost: 0.8,
            style: 0.4,
            use_speaker_boost: true,
          },
        }),
      }
    )

    if (!response.ok) {
      return Response.json({ error: 'TTS failed' }, { status: response.status })
    }

    const audioBuffer = await response.arrayBuffer()

    return new Response(audioBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'audio/mpeg',
        'Cache-Control': 'public, max-age=86400',
      },
    })
  } catch {
    return Response.json({ error: 'Voice error' }, { status: 500 })
  }
}
