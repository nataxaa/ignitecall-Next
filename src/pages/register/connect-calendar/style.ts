import { Box, styled, Text } from "@ignite-ui/react";



export const ConnectBox = styled(Box ,{
    display:'flex',
    flexDirection: 'column',
    marginTop: '1rem',
})


export const ConnectItem = styled(Box,{
    display: 'flex',
    alignItems: 'center',
    justifyContent:'space-between',

    border:'1px solid $gray600',
    padding:'1rem, 1.5rem',
    borderRadius:'5px', 
    marginBottom: '1rem',
    
})

export const AuthError = styled(Text, {
    color: '#f75a68',
    marginBottom: '0.8rem',
})
