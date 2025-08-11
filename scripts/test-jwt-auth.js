#!/usr/bin/env node

/**
 * Test script for Google Service Account JWT authentication
 * This script will test the JWT creation and authentication process
 */

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

// Read .env.local file
function loadEnvFile() {
  try {
    const envPath = path.join(__dirname, '..', '.env.local');
    const envContent = fs.readFileSync(envPath, 'utf8');
    
    // Parse .env file
    const lines = envContent.split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        const [key, ...valueParts] = trimmed.split('=');
        if (key && valueParts.length > 0) {
          let value = valueParts.join('=');
          
          // Remove quotes if present
          if ((value.startsWith('"') && value.endsWith('"')) || 
              (value.startsWith("'") && value.endsWith("'"))) {
            value = value.slice(1, -1);
          }
          
          process.env[key] = value;
        }
      }
    }
    console.log('✓ Environment variables loaded from .env.local');
  } catch (error) {
    console.log('⚠️  Could not load .env.local file, using system environment variables');
  }
}

// Load environment variables
loadEnvFile();

// Base64 URL encoding function
function base64UrlEncode(data) {
  let base64 = '';
  if (typeof data === 'string') {
    base64 = Buffer.from(data, 'utf8').toString('base64');
  } else {
    base64 = data.toString('base64');
  }
  
  return base64
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, ''); // Remove trailing padding
}

// JWT signing function
function signJWT(message, privateKey) {
  try {
    if (!privateKey || typeof privateKey !== 'string') {
      throw new Error('Private key is required and must be a string');
    }
    
    // Clean the private key
    let cleanKey = privateKey.trim();
    
    // Handle quoted keys
    if (cleanKey.startsWith('"') && cleanKey.endsWith('"')) {
      cleanKey = cleanKey.slice(1, -1);
    }
    
    // Replace escaped newlines with actual newlines
    cleanKey = cleanKey.replace(/\\n/g, '\n');
    
    // Validate PEM format
    if (!cleanKey.includes('-----BEGIN PRIVATE KEY-----')) {
      throw new Error('Private key must be in PEM format with -----BEGIN PRIVATE KEY----- header');
    }
    
    if (!cleanKey.includes('-----END PRIVATE KEY-----')) {
      throw new Error('Private key must be in PEM format with -----END PRIVATE KEY----- footer');
    }
    
    // Clean up the key format
    const lines = cleanKey.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    const beginIndex = lines.findIndex(line => line === '-----BEGIN PRIVATE KEY-----');
    const endIndex = lines.findIndex(line => line === '-----END PRIVATE KEY-----');
    
    if (beginIndex === -1 || endIndex === -1) {
      throw new Error('Invalid PEM format: could not find proper BEGIN/END markers');
    }
    
    // Extract and reformat key content
    const keyContent = lines.slice(beginIndex + 1, endIndex).join('');
    const formattedContent = keyContent.match(/.{1,64}/g)?.join('\n') || keyContent;
    
    const finalKey = [
      '-----BEGIN PRIVATE KEY-----',
      formattedContent,
      '-----END PRIVATE KEY-----'
    ].join('\n');
    
    console.log('✓ Private key format validated, length:', finalKey.length);
    
    // Create signature
    const signer = crypto.createSign('RSA-SHA256');
    signer.update(message, 'utf8');
    signer.end();
    
    const signature = signer.sign(finalKey);
    return base64UrlEncode(signature);
    
  } catch (error) {
    console.error('❌ JWT signing error:', error.message);
    throw new Error(`Failed to sign JWT: ${error.message}`);
  }
}

// Create JWT for Google Service Account
function createJWT() {
  const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const serviceAccountKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;

  console.log('🔍 Testing Google Service Account JWT Authentication...\n');

  // Validate environment variables
  console.log('📋 Environment Variables Check:');
  console.log('  GOOGLE_SERVICE_ACCOUNT_EMAIL:', serviceAccountEmail ? '✓ Set' : '❌ Missing');
  console.log('  GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY:', serviceAccountKey ? '✓ Set' : '❌ Missing');
  
  if (serviceAccountEmail) {
    console.log('  Email format:', serviceAccountEmail.includes('@') && serviceAccountEmail.includes('.iam.gserviceaccount.com') ? '✓ Valid' : '❌ Invalid');
  }
  
  if (serviceAccountKey) {
    console.log('  Key length:', serviceAccountKey.length);
    console.log('  Has BEGIN marker:', serviceAccountKey.includes('-----BEGIN PRIVATE KEY-----') ? '✓ Yes' : '❌ No');
    console.log('  Has END marker:', serviceAccountKey.includes('-----END PRIVATE KEY-----') ? '✓ Yes' : '❌ No');
  }

  if (!serviceAccountEmail || !serviceAccountKey) {
    throw new Error('Missing required environment variables');
  }

  // Validate email format
  if (!serviceAccountEmail.includes('@') || !serviceAccountEmail.includes('.iam.gserviceaccount.com')) {
    throw new Error('Invalid service account email format. Expected format: name@project.iam.gserviceaccount.com');
  }

  const now = Math.floor(Date.now() / 1000);
  const expiry = now + 3600; // 1 hour from now

  // JWT Header
  const header = {
    alg: 'RS256',
    typ: 'JWT'
  };

  // JWT Payload
  const payload = {
    iss: serviceAccountEmail,
    sub: serviceAccountEmail,
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: expiry,
    scope: 'https://www.googleapis.com/auth/spreadsheets.readonly'
  };

  console.log('\n🔧 JWT Creation:');
  console.log('  Header:', JSON.stringify(header, null, 2));
  console.log('  Payload:', JSON.stringify({
    ...payload,
    iss: payload.iss.substring(0, 20) + '...',
    sub: payload.sub.substring(0, 20) + '...'
  }, null, 2));

  try {
    // Encode header and payload
    const headerEncoded = base64UrlEncode(JSON.stringify(header));
    const payloadEncoded = base64UrlEncode(JSON.stringify(payload));
    const message = `${headerEncoded}.${payloadEncoded}`;

    console.log('\n🔐 JWT Signing:');
    console.log('  Message to sign length:', message.length);

    // Sign the message
    const signature = signJWT(message, serviceAccountKey);
    const jwt = `${message}.${signature}`;

    console.log('  Signature length:', signature.length);
    console.log('  Final JWT length:', jwt.length);
    console.log('✓ JWT created successfully');

    return jwt;

  } catch (error) {
    console.error('❌ JWT creation failed:', error.message);
    throw error;
  }
}

// Test the access token request
async function testAccessToken(jwt) {
  console.log('\n🌐 Testing Google OAuth2 Token Request...');
  
  try {
    const response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        assertion: jwt,
      }),
    });

    const responseText = await response.text();
    console.log('  Response status:', response.status);

    if (!response.ok) {
      console.error('❌ OAuth2 error response:', responseText);
      
      try {
        const errorData = JSON.parse(responseText);
        if (errorData.error === 'invalid_grant') {
          console.error('❌ Invalid JWT signature - this usually means:');
          console.error('   • Private key format is incorrect');
          console.error('   • Private key doesn\'t match the service account');
          console.error('   • Service account email is wrong');
          console.error('   • Clock skew (time difference) issue');
        }
        throw new Error(`${errorData.error}: ${errorData.error_description}`);
      } catch (parseError) {
        throw new Error(`HTTP ${response.status}: ${responseText}`);
      }
    }

    const tokenData = JSON.parse(responseText);
    console.log('✅ Authentication successful!');
    console.log('  Access token received:', tokenData.access_token ? 'Yes' : 'No');
    console.log('  Token type:', tokenData.token_type);
    console.log('  Expires in:', tokenData.expires_in, 'seconds');
    
    return tokenData.access_token;

  } catch (error) {
    console.error('❌ Access token request failed:', error.message);
    throw error;
  }
}

// Main test function
async function runTest() {
  try {
    console.log('🚀 Google Service Account JWT Authentication Test\n');
    console.log('=' * 50);
    
    // Create JWT
    const jwt = createJWT();
    
    // Test authentication
    const accessToken = await testAccessToken(jwt);
    
    console.log('\n🎉 All tests passed! JWT authentication is working correctly.');
    console.log('✅ Your Google Service Account configuration is valid.');
    
  } catch (error) {
    console.error('\n💥 Test failed:', error.message);
    console.error('\n🔧 Troubleshooting tips:');
    console.error('  1. Check your .env.local file has the correct values');
    console.error('  2. Ensure the private key is properly formatted (with \\n for newlines)');
    console.error('  3. Verify the service account email is correct');
    console.error('  4. Make sure the service account has the necessary permissions');
    console.error('  5. Check that the private key matches the service account');
    
    process.exit(1);
  }
}

// Run the test
runTest();
