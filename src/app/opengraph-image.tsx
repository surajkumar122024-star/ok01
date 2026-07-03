import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'OpticShift Pro — Free Online Image, PDF & Text Tools'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 50%, #e0e7ff 100%)',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 20,
            marginBottom: 32,
          }}
        >
          <div
            style={{
              width: 88,
              height: 88,
              borderRadius: 20,
              background: '#2563eb',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 24px rgba(37, 99, 235, 0.35)',
            }}
          >
            <svg width="48" height="48" viewBox="0 0 24 24" fill="white">
              <path d="M13 2L3 14h7v8l10-12h-7z" />
            </svg>
          </div>
          <div style={{ display: 'flex', fontSize: 64, fontWeight: 700, color: '#0f172a' }}>
            OpticShift <span style={{ color: '#2563eb', marginLeft: 16 }}>Pro</span>
          </div>
        </div>
        <div
          style={{
            fontSize: 32,
            color: '#475569',
            textAlign: 'center',
            maxWidth: 900,
            display: 'flex',
          }}
        >
          Free Online Image, PDF &amp; Text Tools
        </div>
        <div
          style={{
            marginTop: 40,
            display: 'flex',
            gap: 16,
          }}
        >
          {['Compress', 'Convert', 'Resize', 'Edit'].map((tag) => (
            <div
              key={tag}
              style={{
                display: 'flex',
                padding: '10px 24px',
                background: 'white',
                borderRadius: 999,
                fontSize: 22,
                color: '#2563eb',
                fontWeight: 600,
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
