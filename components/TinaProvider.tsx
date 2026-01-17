'use client'

import { TinaProvider } from 'tinacms/dist/react'
import { TinaCMS } from 'tinacms'

const cms = new TinaCMS({
    enabled: process.env.NODE_ENV === 'development',
    clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
    branch: process.env.GITHUB_BRANCH || 'main',
    tokenUrl: '/api/tina/auth',
})

export default function TinaProvider({ children }: { children: React.ReactNode }) {
    return <TinaProvider cms={cms}>{children}</TinaProvider>
}
