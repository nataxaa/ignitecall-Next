import { Button, Heading, MultiStep, Text, TextInput } from "@ignite-ui/react";
import { ArrowRight } from "phosphor-react";
import { useForm } from "react-hook-form";
import { Container, Form, FormError, Header } from "./style";
import {string, z} from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { api } from "../../lib/axios";
import { AxiosError } from "axios";


const registerFormSchema = z.object({
    username: z
               .string()
               .min(3, {message: 'o usuario precisa pelo menos ter 3 letras'})
               .regex(/^([a-z\\-]+)$/i, 
               {message: 'O usuario pode ter apenas letras e hifens'})
               .transform((username)=> username.toLowerCase()),
    name: z
            .string()
            .min(3, {message: 'Digite o nome do usuario'})
})

type RegisterFormData = z.infer<typeof registerFormSchema>

export default function Register(){

    const {register, handleSubmit,setValue, formState:{errors, isSubmitting}} = useForm<RegisterFormData>({
        resolver: zodResolver(registerFormSchema)
    })

    const router = useRouter()
    
    useEffect(()=>{
        if(router.query.username){
            setValue('username', String(router.query.username))
        }
    }, [router.query?.username, setValue])

    async function handleRegister(data: RegisterFormData) {
        try{
            await api.post('/users', {
                name: data.name,
                username: data.username
            })
            await router.push('register/connect-calendar')
        }catch(err){
            if( err instanceof AxiosError && err?.response?.data?.message){
                alert(err.response.data.message)
            }
        }
    }


    
    return(
        <Container>
            <Header>
                <Heading as='strong'>Bem vindo ao ignite call!</Heading>
                <Text>
                Precisamos de algumas informações para criar seu perfil! Ah, você pode editar essas informações depois.
                </Text>

                <MultiStep size={4} currentStep={1}/>
            </Header>

            <Form as='form' onSubmit={handleSubmit(handleRegister)}>
                <label>
                    <Text size={'sm'}>Nome de Usuario.</Text>
                    <TextInput prefix="ignite.com/" placeholder="seu usuario" {...register('username')}/>
                    {errors.username && (
                        <FormError size='sm'>{errors.username?.message}</FormError>
                    )}
                </label>

                <label>
                    <Text size={'sm'}>Nome Completo.</Text>
                    <TextInput placeholder="seu nome" {...register('name')}/>
                    {errors.name && (
                        <FormError size='sm'>{errors.name?.message}</FormError>
                    )}
                </label>
                <Button type="submit">
                    Proximo Passo
                    <ArrowRight/>
                </Button>
            </Form>
        </Container>
    )
}