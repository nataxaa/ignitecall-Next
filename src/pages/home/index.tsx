import { Heading, Text } from '@ignite-ui/react'
import { Container, Hero, Preview } from './style'
import Image from 'next/image'

import preview_image from '../../assets/imagem1.png'
import { ClaimUsernameForm } from './components/ClaimUsernameForm'

export default function Home() {
  return(
      <Container>
        <Hero>
            <Heading size='3xl'>Agendamento descomplicado</Heading>
            <Text size='lg'>
            Conecte seu calendário e permita que as pessoas marquem agendamentos no seu tempo livre.
            </Text>
            <ClaimUsernameForm/>
        </Hero>

        <Preview>
          <Image
            src={preview_image}
            height={400}
            quality={100}
            priority
            alt='Calendario simbolizando aplicação em funcionamento.'
          >

          </Image>
        </Preview>
      </Container>
    )
}