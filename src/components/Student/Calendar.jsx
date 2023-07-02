import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isEqual,
  isSameDay,
  isSameMonth,
  isToday,
  parse,
  parseISO,
  isFuture,
  startOfToday,
} from 'date-fns'
import { useState } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import TimeSlot from './TimeSlot'
import { useGetAppointmentsQuery } from '../../features/appointments/appointmentsApiSlice'
import LoadingSpinner from '../LoadingSpinner'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Calendar({
  timeslots,
  selectedDay,
  setSelectedDay,
  id,
}) {
  let today = startOfToday()

  let [currentMonth, setCurrentMonth] = useState(
    format(selectedDay, 'MMM-yyyy')
  )
  let firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date())

  let days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  })

  function previousMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 })
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
  }

  function nextMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 })
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
  }

  let selectedDayTimeSlots = timeslots.filter((timeslot) =>
    isSameDay(parseISO(timeslot.startTime), selectedDay)
  )

  const { data, isLoading, isSuccess, error, isError } =
    useGetAppointmentsQuery({
      userId: id,
    })

  return (
    <div className='mx-auto max-w-md px-4 py-2 sm:px-7 md:max-w-5xl md:px-6'>
      <div className='md:grid md:grid-cols-2 md:divide-x md:divide-gray-200'>
        <div className='md:pr-14'>
          <div className='flex items-center'>
            <h2 className='flex-auto font-semibold text-gray-900'>
              {format(firstDayCurrentMonth, 'MMMM yyyy')}
            </h2>
            <button
              type='button'
              onClick={previousMonth}
              className='-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500'
            >
              <span className='sr-only'>Previous month</span>
              <FiChevronLeft className='h-5 w-5' aria-hidden='true' />
            </button>
            <button
              onClick={nextMonth}
              type='button'
              className='-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500'
            >
              <span className='sr-only'>Next month</span>
              <FiChevronRight className='h-5 w-5' aria-hidden='true' />
            </button>
          </div>
          <div className='mt-10 grid grid-cols-7 text-center text-xs leading-6 text-gray-500'>
            <div>S</div>
            <div>M</div>
            <div>T</div>
            <div>W</div>
            <div>T</div>
            <div>F</div>
            <div>S</div>
          </div>
          <div className='mt-2 grid grid-cols-7 text-sm'>
            {days.map((day, dayIdx) => (
              <div
                key={day.toString()}
                className={classNames(
                  dayIdx === 0 && colStartClasses[getDay(day)],
                  'py-1.5'
                )}
              >
                <button
                  type='button'
                  onClick={() => {
                    if (isFuture(day) || isEqual(day, today)) {
                      setSelectedDay(day)
                    }
                  }}
                  className={classNames(
                    isEqual(day, selectedDay) && 'text-white',
                    !isEqual(day, selectedDay) &&
                      isToday(day) &&
                      'text-red-500',
                    !isEqual(day, selectedDay) &&
                      !isToday(day) &&
                      isSameMonth(day, firstDayCurrentMonth) &&
                      'text-gray-900',
                    !isEqual(day, selectedDay) &&
                      !isToday(day) &&
                      !isSameMonth(day, firstDayCurrentMonth) &&
                      'text-gray-400',
                    isEqual(day, selectedDay) && isToday(day) && 'bg-red-500',
                    isEqual(day, selectedDay) && !isToday(day) && 'bg-gray-900',
                    !isEqual(day, selectedDay) && 'hover:bg-gray-200',
                    (isEqual(day, selectedDay) || isToday(day)) &&
                      'font-semibold',
                    'mx-auto flex h-8 w-8 items-center justify-center rounded-full'
                  )}
                >
                  <time dateTime={format(day, 'yyyy-MM-dd')}>
                    {format(day, 'd')}
                  </time>
                </button>

                <div className='mx-auto mt-1 h-1 w-1'>
                  {timeslots.some((timeslot) =>
                    isSameDay(parseISO(timeslot.startTime), day)
                  ) && <div className='h-1 w-1 rounded-full bg-primary'></div>}
                </div>
              </div>
            ))}
          </div>
        </div>
        <section className='mt-12 md:mt-0 md:pl-5 lg:pl-14'>
          <h2 className='font-semibold text-gray-900'>
            <time dateTime={format(selectedDay, 'yyyy-MM-dd')}>
              {format(selectedDay, 'MMM dd, yyy')}
            </time>
          </h2>
          {isLoading ? (
            <LoadingSpinner />
          ) : isSuccess ? (
            <ol className='mt-4 space-y-1 text-sm leading-6 text-gray-500'>
              {selectedDayTimeSlots.length > 0 ? (
                selectedDayTimeSlots.map((timeslot) => {
                  if (
                    // have a meeting with the advisor
                    data.some(
                      (appointment) =>
                        appointment.supervisor._id === timeslot.supervisor._id
                    )
                  ) {
                    return (
                      <TimeSlot
                        timeslot={timeslot}
                        key={timeslot._id}
                        id={id}
                        meeting={true}
                        appointments={data}
                      />
                    )
                  } else {
                    return (
                      <TimeSlot
                        timeslot={timeslot}
                        key={timeslot._id}
                        id={id}
                        meeting={false}
                      />
                    )
                  }
                })
              ) : (
                <p>No meetings for this day.</p>
              )}
            </ol>
          ) : null}
        </section>
      </div>
    </div>
  )
}

let colStartClasses = [
  '',
  'col-start-2',
  'col-start-3',
  'col-start-4',
  'col-start-5',
  'col-start-6',
  'col-start-7',
]
