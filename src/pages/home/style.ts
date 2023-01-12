import { Heading, styled, Text } from "@ignite-ui/react";


export const Container = styled('div', {

    display:"flex",
    gap: '60px',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '4rem 0 0 0 ',
    

})

export const Hero = styled('div', {
    width: '26rem',
    marginLeft: '9rem',

    [` > ${Text}`]: {
        color:"$gray200",
        marginTop:'5px',
    }
    
})


export const Preview = styled('div', {})