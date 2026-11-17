'use client'

import type { AnchorHTMLAttributes } from 'react'
import { getWhatsAppURL, openWhatsApp } from '@/config/contacts'

export function WhatsAppLink(props: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a {...props} href={getWhatsAppURL()} onClick={event => {
    event.preventDefault()
    void openWhatsApp()
  }} />
}
