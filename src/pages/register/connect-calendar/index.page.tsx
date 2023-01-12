import { Button, Heading, MultiStep, Text, TextInput } from "@ignite-ui/react";
import { ArrowRight, Check } from "phosphor-react";
import { Container,Header } from "../style";
import { AuthError, ConnectBox, ConnectItem } from "./style";
import {signIn, useSession} from 'next-auth/react'
import { useRouter } from "next/router";


export default function ConnectCalendar(){
    const router = useRouter()
    const session = useSession()

    const hasAuthRouter = !! router.query.error
    const isSignedIn = session.status === 'authenticated'

    

    async function handleNavigateToNextStep(){
        await router.push('/register/time-intervals')
    }

    console.log(session)

    return(
        <Container>
            <Header>
                <Heading as='strong'>Conecte sua agenda!</Heading>
                <Text>
                Conecte o seu calendário para verificar automaticamente as horas
                ocupadas e os novos eventos à medida em que são agendados.
                </Text>

                <MultiStep size={4} currentStep={2}/>
            </Header>
            
            <ConnectBox>
                <ConnectItem>
                    <Text>Google Calendar</Text>
                    { isSignedIn ? (
                        <Button size={'sm'} disabled>
                            Conectado
                            <Check/>
                        </Button>
                    ) : (
                        <Button
                     variant={'secondary'}
                     size='sm'
                     onClick={()=>signIn('google')}
                     >
                        Conectar
                        <ArrowRight/>
                    </Button>
                    )
                    }
                </ConnectItem>
                {hasAuthRouter && (
                    <AuthError size={'sm'}>
                        Falha ao conectar ao google, verifique se voce habilitou as 
                        permissões de acesso ao Google Calendar
                    </AuthError>
                )}
                <Button onClick={handleNavigateToNextStep} type="submit" disabled={!isSignedIn}>
                    Proximo Passo
                    <ArrowRight/>
                </Button>
            </ConnectBox>

            
        </Container>
    )
}