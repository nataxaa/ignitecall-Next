import '../lib/dayjs'


import type { AppProps } from 'next/app'
import { GlobalStyle } from '../style/global'
import {SessionProvider} from 'next-auth/react'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '../lib/react-query'

GlobalStyle()

function MyApp({ Component, pageProps:{session, ...pageProps} }: AppProps) {
  return(
      <QueryClientProvider client={queryClient}>
        <SessionProvider >
          <Component {...pageProps} />
        </SessionProvider> 
      </QueryClientProvider>
    ) 
}

export default MyApp
