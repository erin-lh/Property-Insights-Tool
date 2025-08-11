const crypto = require('crypto')
const fs = require('fs')

// Manually read .env.local file
function loadEnv() {
  try {
    const envFile = fs.readFileSync('.env.local', 'utf8')
    const lines = envFile.split('\n')
    const env = {}
    
    for (const line of lines) {
      if (line.trim() && !line.startsWith('#')) {
        const [key, ...valueParts] = line.split('=')
        if (key && valueParts.length > 0) {
          let value = valueParts.join('=').trim()
          // Remove quotes if present
          if ((value.startsWith('"') && value.endsWith('"')) || 
              (value.startsWith("'") && value.endsWith("'"))) {
            value = value.slice(1, -1)
          }
          env[key.trim()] = value
        }
      }
    }
    return env
  } catch (error) {
    console.error('Error loading .env.local:', error.message)
    return {}
  }
}

function base64UrlEncode(str) {
  return Buffer.from(str)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '')
}

async function debugJWT() {
  const env = loadEnv()
  
  console.log('=== Environment Variables ===')
  console.log('GOOGLE_SERVICE_ACCOUNT_EMAIL:', env.GOOGLE_SERVICE_ACCOUNT_EMAIL)
  console.log('GOOGLE_SERVICE_ACCOUNT_KEY_ID:', env.GOOGLE_SERVICE_ACCOUNT_KEY_ID)
  console.log('GOOGLE_PROJECT_ID:', env.GOOGLE_PROJECT_ID)
  console.log('Private key length:', env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.length || 0)
  console.log('Private key preview:', env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.substring(0, 50) + '...')
  
  const serviceAccountEmail = env.GOOGLE_SERVICE_ACCOUNT_EMAIL
  const serviceAccountKey = env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY
  const keyId = env.GOOGLE_SERVICE_ACCOUNT_KEY_ID

  if (!serviceAccountEmail || !serviceAccountKey || !keyId) {
    console.error('Missing required environment variables')
    return
  }

  console.log('\n=== JWT Creation ===')
  const now = Math.floor(Date.now() / 1000)
  const expiry = now + 3600

  const header = {
    alg: 'RS256',
    typ: 'JWT'
    // Temporarily removing kid to test if that's the issue
  }

  const payload = {
    iss: serviceAccountEmail,
    sub: serviceAccountEmail,
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: expiry,
    scope: 'https://www.googleapis.com/auth/cloud-platform'
  }

  console.log('Header:', JSON.stringify(header, null, 2))
  console.log('Payload:', JSON.stringify(payload, null, 2))

  const headerEncoded = base64UrlEncode(JSON.stringify(header))
  const payloadEncoded = base64UrlEncode(JSON.stringify(payload))
  const message = `${headerEncoded}.${payloadEncoded}`

  console.log('Message to sign:', message)

  // Test private key processing
  try {
    console.log('\n=== Private Key Processing ===')
    let cleanKey = serviceAccountKey.trim()
    
    // Replace literal \n with actual newlines
    cleanKey = cleanKey.replace(/\\n/g, '\n')
    
    if (!cleanKey.includes('-----BEGIN PRIVATE KEY-----')) {
      cleanKey = `-----BEGIN PRIVATE KEY-----\n${cleanKey}\n-----END PRIVATE KEY-----`
    }
    
    console.log('Cleaned key length:', cleanKey.length)
    console.log('Cleaned key preview:', cleanKey.substring(0, 80) + '...')
    
    // Test signing
    const sign = crypto.createSign('RSA-SHA256')
    sign.update(message)
    sign.end()
    
    const signature = sign.sign(cleanKey)
    const signatureBase64 = base64UrlEncode(signature.toString('base64'))
    
    console.log('Signature created successfully')
    console.log('Signature length:', signatureBase64.length)
    
    const jwt = `${message}.${signatureBase64}`
    console.log('Final JWT length:', jwt.length)
    console.log('JWT preview:', jwt.substring(0, 100) + '...')
    
    // Test with Google's OAuth endpoint
    console.log('\n=== Testing with Google OAuth ===')
    const formData = new URLSearchParams()
    formData.append('grant_type', 'urn:ietf:params:oauth:grant-type:jwt-bearer')
    formData.append('assertion', jwt)

    const response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData,
    })

    console.log('Response status:', response.status)
    const result = await response.text()
    console.log('Response:', result)
    
    if (response.ok) {
      console.log('✅ JWT authentication successful!')
    } else {
      console.log('❌ JWT authentication failed')
    }
    
  } catch (error) {
    console.error('Error:', error.message)
  }
}

debugJWT().catch(console.error)
