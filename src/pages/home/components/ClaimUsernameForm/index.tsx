import { Button, TextInput } from "@ignite-ui/react";
import { Form } from "./style";
import {ArrowRight} from 'phosphor-react'
import { z } from "zod";
import { useForm } from "react-hook-form";
import {zodResolver} from '@hookform/resolvers/zod'
import { useRouter } from "next/router";
import { useEffect } from "react";


const clainUsernameFormSchema = z.object({
    username: z.string()
               .min(3, {message: 'o usuario precisa pelo menos ter 3 letras'})
               .regex(/^([a-z\\-]+)$/i, 
               {message: 'O usuario pode ter apenas letras e hifens'})
               .transform((username)=> username.toLowerCase())
})

type ClainUsernameFormData = z.infer<typeof clainUsernameFormSchema>

export function ClaimUsernameForm(){

    const {register, handleSubmit, formState: {errors}} = useForm<ClainUsernameFormData>({
        resolver: zodResolver(clainUsernameFormSchema)
    })

    const router = useRouter()

    async function handleClainUsername(data: ClainUsernameFormData) {
        const {username} = data
        await router.push(`/register?username=${username}`)
    }

    return(
        <>
        <Form as='form' onSubmit={handleSubmit(handleClainUsername)}>
            <TextInput 
                size='sm' 
                prefix="ignite.com/" 
                placeholder="Seu usuario." 
                {...register('username')}
                />
            <Button size='sm' type="submit">
                Reservar Usuario
                <ArrowRight/>
            </Button>
        </Form>
        {errors.username ? errors.username?.message : 'Digite o nome do usuario desejado'}
        </>
        
    )
}