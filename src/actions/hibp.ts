'use server'

import axios from 'axios'
import crypto from 'crypto'
import { BreachData, PasteData } from '@/types/hibp'

const HIBP_API_BASE = 'https://haveibeenpwned.com/api/v3'
const PWNED_PASSWORDS_API = 'https://api.pwnedpasswords.com'
const USER_AGENT = 'Sentinel-App'

// Get API key from environment variables
const getApiKey = () => {
  const apiKey = process.env.HIBP_API_KEY
  if (!apiKey) {
    throw new Error('HIBP_API_KEY environment variable is required')
  }
  return apiKey
}

// Create axios instance with default config
const hibpApi = axios.create({
  baseURL: HIBP_API_BASE,
  timeout: 10000,
  headers: {
    'User-Agent': USER_AGENT,
  },
})

export async function checkBreachByEmail(email: string): Promise<{
  success: boolean
  data?: BreachData[]
  error?: string
}> {
  try {
    const apiKey = getApiKey()
    const response = await hibpApi.get(`/breachedaccount/${encodeURIComponent(email)}`, {
      headers: {
        'hibp-api-key': apiKey,
      },
    })
    return {
      success: true,
      data: response.data,
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        return {
          success: true,
          data: [],
        }
      }
      if (error.response?.status === 429) {
        return {
          success: false,
          error: 'Too many requests. Please wait a moment and try again.',
        }
      }
      if (error.response?.status === 401) {
        return {
          success: false,
          error: 'Invalid API key. Please check your HIBP API key configuration.',
        }
      }
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to check email',
      }
    }
    return {
      success: false,
      error: 'Network error occurred',
    }
  }
}

export async function checkPastesByEmail(email: string): Promise<{
  success: boolean
  data?: PasteData[]
  error?: string
}> {
  try {
    const apiKey = getApiKey()
    const response = await hibpApi.get(`/pasteaccount/${encodeURIComponent(email)}`, {
      headers: {
        'hibp-api-key': apiKey,
      },
    })
    return {
      success: true,
      data: response.data,
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        return {
          success: true,
          data: [],
        }
      }
      if (error.response?.status === 429) {
        return {
          success: false,
          error: 'Too many requests. Please wait a moment and try again.',
        }
      }
      if (error.response?.status === 401) {
        return {
          success: false,
          error: 'Invalid API key. Please check your HIBP API key configuration.',
        }
      }
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to check pastes',
      }
    }
    return {
      success: false,
      error: 'Network error occurred',
    }
  }
}

export async function getAllBreaches(): Promise<{
  success: boolean
  data?: BreachData[]
  error?: string
}> {
  try {
    // The /breaches endpoint does not require an API key according to HIBP docs
    const response = await hibpApi.get('/breaches')
    return {
      success: true,
      data: response.data,
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 429) {
        return {
          success: false,
          error: 'Too many requests. Please wait a moment and try again.',
        }
      }
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to fetch breaches',
      }
    }
    return {
      success: false,
      error: 'Network error occurred',
    }
  }
}

export async function getBreachByName(name: string): Promise<{
  success: boolean
  data?: BreachData
  error?: string
}> {
  try {
    // Note: This endpoint may not require an API key, but we'll include it for consistency
    const apiKey = getApiKey()
    const response = await hibpApi.get(`/breach/${encodeURIComponent(name)}`, {
      headers: {
        'hibp-api-key': apiKey,
      },
    })
    return {
      success: true,
      data: response.data,
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        return {
          success: false,
          error: 'Breach not found',
        }
      }
      if (error.response?.status === 429) {
        return {
          success: false,
          error: 'Too many requests. Please wait a moment and try again.',
        }
      }
      if (error.response?.status === 401) {
        return {
          success: false,
          error: 'Invalid API key. Please check your HIBP API key configuration.',
        }
      }
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to fetch breach',
      }
    }
    return {
      success: false,
      error: 'Network error occurred',
    }
  }
}

export async function checkPasswordPwned(password: string): Promise<{
  success: boolean
  isPwned: boolean
  count?: number
  error?: string
}> {
  try {
    // Hash the password using SHA-1
    const hash = crypto.createHash('sha1').update(password).digest('hex').toUpperCase()

    // Get the first 5 characters of the hash (k-anonymity)
    const hashPrefix = hash.substring(0, 5)
    const hashSuffix = hash.substring(5)

    // Query the Pwned Passwords API with the hash prefix
    const response = await axios.get(`${PWNED_PASSWORDS_API}/range/${hashPrefix}`, {
      timeout: 10000,
      headers: {
        'User-Agent': USER_AGENT,
      },
    })

    // Parse the response to find if our hash suffix exists
    const hashSuffixes = response.data.split('\n')
    for (const line of hashSuffixes) {
      const [suffix, count] = line.split(':')
      if (suffix === hashSuffix) {
        return {
          success: true,
          isPwned: true,
          count: parseInt(count, 10),
        }
      }
    }

    // Password not found in breaches
    return {
      success: true,
      isPwned: false,
      count: 0,
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 429) {
        return {
          success: false,
          isPwned: false,
          error: 'Too many requests. Please wait a moment and try again.',
        }
      }
      return {
        success: false,
        isPwned: false,
        error: error.response?.data?.message || 'Failed to check password',
      }
    }
    return {
      success: false,
      isPwned: false,
      error: 'Network error occurred',
    }
  }
}
