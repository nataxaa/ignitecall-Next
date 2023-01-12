import { Box, styled, Text } from "@ignite-ui/react";
import { GridFour } from "phosphor-react";



export const Form = styled(Box, {
    display: "grid",
    gridTemplateColumns: "1fr auto",
    gap:'6px',
    marginTop:'10px',
    padding:'$4',
    
    '@media(max-width: 600px)':{
        gridTemplateColumns:'1fr'
    }
    
})

export const FormAnnotation = styled('div', {
    margin: '$2',
    [`> ${Text}`]: {
        color:'$gray400'
    }
})