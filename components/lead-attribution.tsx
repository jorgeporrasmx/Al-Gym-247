'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { captureBrowserAttribution } from '@/lib/lead-attribution'

export function LeadAttributionCapture() {
  const pathname = usePathname()
  const search = useSearchParams()
  useEffect(() => { captureBrowserAttribution() }, [pathname, search])
  return null
}
