import { RemixBrowser } from '@remix-run/react'
import { startTransition } from 'react'
import { hydrateRoot } from 'react-dom/client'
import './i18n/config'

startTransition(() => {
	hydrateRoot(document, <RemixBrowser />)
})
