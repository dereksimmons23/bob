/**
 * Vercel Serverless Function — ElevenLabs TTS proxy for BOB
 * Keeps API key server-side. Frontend calls /api/speak.
 */
export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const apiKey = process.env.ELEVENLABS_API_KEY
  const voiceId = process.env.ELEVENLABS_VOICE_ID || 'Bj9UqZbhQsanLzgalpEG' // Austin - Good ol' Texas

  if (!apiKey) {
    return res.status(503).json({ error: 'Voice not configured' })
  }

  const { text } = req.body || {}
  if (!text || !text.trim()) {
    return res.status(400).json({ error: 'Text required' })
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
      return res.status(response.status).json({ error: 'TTS failed' })
    }

    const buffer = Buffer.from(await response.arrayBuffer())
    res.setHeader('Content-Type', 'audio/mpeg')
    res.setHeader('Cache-Control', 'public, max-age=86400')
    return res.status(200).send(buffer)
  } catch {
    return res.status(500).json({ error: 'Voice error' })
  }
}
