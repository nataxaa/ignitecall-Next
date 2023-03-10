import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Calendar } from "../../../../../components/Calendar";
import { api } from "../../../../../lib/axios";
import { Container, TimePicker, TimePickerHeader, TimePickerItem, TimePickerList } from "./style";
import { useRouter } from 'next/router'
import { useQuery } from "@tanstack/react-query";


interface Availability {
    possibleTimes: number[]
    availableTimes: number[]
  }

  interface CalendarStep {
    onSelectDateTime:(date: Date) => void
  }

export function CalendarStep({onSelectDateTime}: CalendarStep){
    
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)
    const isDateSelected = !!selectedDate
    const weekDay = selectedDate ? dayjs(selectedDate).format('dddd') : null
  //  const [availability, setAvailability] = useState<Availability | null>(null)
    const router = useRouter()
    const username = String(router.query.username)

    const describedDate = selectedDate
    ? dayjs(selectedDate).format('DD[ de ]MMMM')
    : null

    const selectedDateWithoutTime = selectedDate
    ? dayjs(selectedDate).format('YYYY-MM-DD')
    : null

    const { data: availability } = useQuery<Availability>(
        ['availability', selectedDateWithoutTime],
        async () => {
          const response = await api.get(`/users/${username}/availability`, {
            params: {
              date: selectedDateWithoutTime,
            },
          })
    
          console.log(response.data)
          return response.data
        },
        {
          enabled: !!selectedDate,
        },
      )

      function handleSelectTime(hour: number){
        const dateWithTime = dayjs(selectedDate).set('hour', hour).startOf('hour').toDate()

        onSelectDateTime(dateWithTime)

      }


    /*
    useEffect(()=>{
        if(!selectedDate){
            return 
        }

        api.get(`/users/${username}/availability`,{
            params:{
                date: dayjs(selectedDate).format('YYYY-MM-DD')
            }
        }).then(response => {
            setAvailability(response.data)
        })
    }, [selectedDate, username])
*/
    return(
    <Container isTimePickerOpen={isDateSelected}>
        <Calendar selectedDate={selectedDate} onDateSelected={setSelectedDate}/>

        {isDateSelected && (
            <TimePicker>
                <TimePickerHeader>
                    {weekDay}, <span>{describedDate}</span>
                </TimePickerHeader>

                <TimePickerList>
                    {availability?.possibleTimes.map(hour => {
                        return(
                            <TimePickerItem 
                                key={hour} 
                                disabled={!availability.availableTimes.includes(hour)}
                                onClick={()=>handleSelectTime(hour)}
                                >
                                {String(hour).padStart(2, '0')}:00h
                            </TimePickerItem>
                        )
                    })}
                </TimePickerList>
            </TimePicker>
        )}
    </Container>
 
 ) 
}