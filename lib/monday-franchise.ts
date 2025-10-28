/**
 * Monday.com Franchise Integration
 *
 * This module handles submitting franchise inquiries to Monday.com board via GraphQL API.
 *
 * Monday.com Board Structure (expected columns):
 * - name: Full name (name column)
 * - email: Email address (email column)
 * - phone: Phone number (phone column)
 * - city: City/Location (text column)
 * - investment_capacity: Investment capacity (text/numbers column)
 * - message: Additional message (long text column)
 * - status: Lead status (status column - defaults to "New Lead")
 */

export interface FranchiseInquiry {
  name: string
  email: string
  phone: string
  city: string
  investmentCapacity: string
  message?: string
}

interface MondayCreateItemResponse {
  data: {
    create_item: {
      id: string
    }
  }
}

/**
 * Makes a GraphQL mutation to Monday.com API
 */
async function mondayMutation(query: string): Promise<any> {
  const apiToken = process.env.MONDAY_API_TOKEN

  if (!apiToken) {
    console.error('MONDAY_API_TOKEN is not configured')
    throw new Error('Monday.com API is not configured')
  }

  try {
    const response = await fetch('https://api.monday.com/v2', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': apiToken,
      },
      body: JSON.stringify({ query }),
      cache: 'no-store', // Don't cache mutations
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Monday.com API error:', response.status, response.statusText, errorText)
      throw new Error(`Monday.com API error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error communicating with Monday.com:', error)
    throw error
  }
}

/**
 * Submits a franchise inquiry to Monday.com
 * @param inquiry Franchise inquiry data
 * @returns Monday.com item ID if successful
 */
export async function submitFranchiseInquiry(inquiry: FranchiseInquiry): Promise<string> {
  const boardId = process.env.MONDAY_FRANCHISE_BOARD_ID

  if (!boardId) {
    console.error('MONDAY_FRANCHISE_BOARD_ID is not configured')
    throw new Error('Monday.com franchise board is not configured')
  }

  // Escape quotes in values for GraphQL
  const escapeValue = (str: string) => str.replace(/"/g, '\\"').replace(/\n/g, '\\n')

  // Build column values JSON
  const columnValues = {
    email: { email: inquiry.email, text: inquiry.email },
    phone: { phone: inquiry.phone, text: inquiry.phone },
    text: escapeValue(inquiry.city), // city
    text4: escapeValue(inquiry.investmentCapacity), // investment_capacity
    long_text: escapeValue(inquiry.message || ''), // message
    status: { label: 'New Lead' },
  }

  const query = `
    mutation {
      create_item (
        board_id: ${boardId},
        item_name: "${escapeValue(inquiry.name)}",
        column_values: "${escapeValue(JSON.stringify(columnValues))}"
      ) {
        id
      }
    }
  `

  try {
    const response: MondayCreateItemResponse = await mondayMutation(query)

    if (!response?.data?.create_item?.id) {
      throw new Error('Failed to create Monday.com item')
    }

    return response.data.create_item.id
  } catch (error) {
    console.error('Error submitting franchise inquiry:', error)
    throw error
  }
}

/**
 * Validates franchise inquiry data
 */
export function validateFranchiseInquiry(inquiry: Partial<FranchiseInquiry>): {
  isValid: boolean
  errors: string[]
} {
  const errors: string[] = []

  if (!inquiry.name || inquiry.name.trim().length < 2) {
    errors.push('El nombre debe tener al menos 2 caracteres')
  }

  if (!inquiry.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inquiry.email)) {
    errors.push('Proporciona un email válido')
  }

  if (!inquiry.phone || !/^\+?[\d\s\-()]{10,}$/.test(inquiry.phone)) {
    errors.push('Proporciona un teléfono válido (mínimo 10 dígitos)')
  }

  if (!inquiry.city || inquiry.city.trim().length < 2) {
    errors.push('Indica la ciudad donde quieres abrir tu franquicia')
  }

  if (!inquiry.investmentCapacity || inquiry.investmentCapacity.trim().length === 0) {
    errors.push('Selecciona tu capacidad de inversión')
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}
