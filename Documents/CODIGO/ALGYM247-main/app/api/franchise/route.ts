import { NextResponse } from 'next/server'
import { submitFranchiseInquiry, validateFranchiseInquiry, type FranchiseInquiry } from '@/lib/monday-franchise'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate the inquiry
    const validation = validateFranchiseInquiry(body)

    if (!validation.isValid) {
      return NextResponse.json(
        { success: false, errors: validation.errors },
        { status: 400 }
      )
    }

    // Submit to Monday.com
    const itemId = await submitFranchiseInquiry(body as FranchiseInquiry)

    return NextResponse.json({
      success: true,
      message: '¡Gracias! Hemos recibido tu solicitud. Nuestro equipo se pondrá en contacto contigo pronto.',
      itemId,
    })
  } catch (error) {
    console.error('Error processing franchise inquiry:', error)

    return NextResponse.json(
      {
        success: false,
        message: 'Hubo un error al enviar tu solicitud. Por favor, intenta de nuevo o contáctanos directamente.',
      },
      { status: 500 }
    )
  }
}
