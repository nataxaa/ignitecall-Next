import { globalCss } from '@ignite-ui/react'

export const GlobalStyle = globalCss({
  '*': {
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
  },
  body: {
    backgroundColor: '$gray900',
    color: '$gray100',
  },
})
