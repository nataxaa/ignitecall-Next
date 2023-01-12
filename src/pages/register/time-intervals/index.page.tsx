import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Checkbox, Heading, MultiStep, Text, TextInput } from "@ignite-ui/react";
import { useRouter } from "next/router";
import { ArrowArcRight, ArrowRight } from "phosphor-react";
import { Controller, useForm } from "react-hook-form";
import { useFieldArray } from "react-hook-form";
import { z } from "zod";
import { api } from "../../../lib/axios";
import { ConvertTimeStringToMinutes } from "../../../utils/convert-time-string-to-minutes";
import { getWeekDays } from "../../../utils/get-week-days";

import { Container,Header } from "../style";
import { IntervalBox, IntervalContainer, IntervalDay, IntervalInputs, IntervalItem, FormError } from "./style";



const timeIntervalsFormSchema = z.object({
    intervals: z.array(z.object({
        weekday: z.number().min(0).max(6),
        enabled: z.boolean(),
        startTime: z.string(),
        endTime: z.string()
    }))
    .length(7)
    .transform((intervals)=>intervals.filter((interval) => interval.enabled))
    .refine((intervals)=> intervals.length > 0 ,{
        message: 'Você precisa selecionar pelo menos uma dia da semana!'
    })
    .transform(intervals => {
        return intervals.map(interval=> {
            return{
                weekday: interval.weekday,
                startTimeInMinutes: ConvertTimeStringToMinutes(interval.startTime),
                endTimeInMinutes: ConvertTimeStringToMinutes(interval.endTime)

            }
        })
    })
    .refine((intervals) => {
        return intervals.every(
            (interval) => 
            interval.endTimeInMinutes - 60 >= interval.startTimeInMinutes
        )  
    }, {
        message: 'O horario de termino deve ser pelo menos 1 hora distante do inicio!'
    })
})


type TimeIntervalsFormInput = z.input<typeof timeIntervalsFormSchema>
type TimeIntervalsFormOutput = z.output<typeof timeIntervalsFormSchema>

export default function TimeIntervals(){
    const {
        register,
        handleSubmit,
        control,
        watch,
        formState: { isSubmitting, errors }
    } = useForm<TimeIntervalsFormInput>({
        resolver: zodResolver(timeIntervalsFormSchema),
        defaultValues:{
            intervals:[
                {weekday: 0, enabled: false, startTime: '08:00', endTime: '18:00'},
                {weekday: 1, enabled: true, startTime: '08:00', endTime: '18:00'},
                {weekday: 2, enabled: true, startTime: '08:00', endTime: '18:00'},
                {weekday: 3, enabled: true, startTime: '08:00', endTime: '18:00'},
                {weekday: 4, enabled: true, startTime: '08:00', endTime: '18:00'},
                {weekday: 5, enabled: true, startTime: '08:00', endTime: '18:00'},
                {weekday: 6, enabled: false, startTime: '08:00', endTime: '18:00'},

            ]
        }
    })
    
    const router = useRouter()
    const weekDays = getWeekDays()

    const {fields} = useFieldArray({
        control,
        name: 'intervals'
    })

    const intervals = watch('intervals')

    async function handleSetTimeIntervals(data: any){
        const {intervals} = data as TimeIntervalsFormOutput
        
        await api.post('/users/time-intervals', {
            intervals,
          })
      
        await router.push('/register/update-profile')
          
    }

    return(
        <Container>
            <Header>
                <Heading as='strong'>Quase lá!</Heading>
                <Text>
                Defina o intervalo de horário que você esta disponível
                em cada dia da semana
                </Text>

                <MultiStep size={4} currentStep={3}/>
            </Header>
            
            <IntervalBox as={'form'} onSubmit={handleSubmit(handleSetTimeIntervals)}>
                <IntervalContainer>
                   {fields.map((field, index) => {
                    return(
                        <IntervalItem key={field.id}>
                        <IntervalDay>
                            <Controller
                                name={`intervals.${index}.enabled`}
                                control={control}
                                render={({field}:any)=>{
                                    return(
                                        <Checkbox
                                            onCheckedChange={cheked => {
                                                field.onChange(cheked == true)
                                            }}
                                            checked={field.value}
                                        />
                                    )
                                }}
                            />
                            <Text>{weekDays[field.weekday]}</Text>
                        </IntervalDay>
                        <IntervalInputs>
                            <TextInput
                                size='sm'
                                type='time'
                                step={60}
                                disabled={intervals[index].enabled == false}
                                {...register(`intervals.${index}.startTime`)}
                            />
                            <TextInput
                                size='sm'
                                type='time'
                                step={60}
                                disabled={intervals[index].enabled == false}
                                {...register(`intervals.${index}.endTime`)}
                            />
                        </IntervalInputs>
                    </IntervalItem>
                    )
                   })}
                </IntervalContainer>

                   {errors.intervals && (
                    <FormError size='sm'>{errors.intervals.message}</FormError>
                   )}

                <Button type="submit">
                    Proximo Passo 
                    <ArrowRight/> 
                </Button>
            </IntervalBox>
           

            
        </Container>
    )
}