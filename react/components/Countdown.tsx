import React, { useState } from 'react'
import { TimeSplit } from '../typings/global'
import { tick, getTwoDaysFromNow } from '../utils/time'
import { useCssHandles } from 'vtex.css-handles'
import { FormattedMessage } from 'react-intl'

interface CountdownProps {
  targetDate: string,
  title: string
}
const DEFAULT_TARGET_DATE = getTwoDaysFromNow()

const CSS_HANDLES = [
  'container',
  'countdown',
  'title'
]

const Countdown: StorefrontFunctionComponent<CountdownProps> = ({
  targetDate = DEFAULT_TARGET_DATE,
  title
}) => {

  const handles = useCssHandles(CSS_HANDLES)

  const titleText = title || <FormattedMessage id="countdown.title" />

  const [timeRemaining, setTime] = useState<TimeSplit>({
    hours: '00',
    minutes: '00',
    seconds: '00'
  })

  tick(targetDate, setTime)

  return (
    <div className={`${handles.container} t-heading-2 fw3 w-100 c-muted-1`}>
      <div className={`${handles.title} db tc`}>{titleText}</div>
        <div className={`${handles.countdown} c-muted-1 db tc`}>
          <h1>{`${timeRemaining.hours}:${timeRemaining.minutes}:${timeRemaining.seconds}`}</h1>
        </div>
    </div>
  )
}

Countdown.schema = {
  title: 'editor.countdown.title',
  description: 'editor.countdown.description',
  type: 'object',
  properties: {
    targetDate: {
      title: 'Final date',
      description: 'Final date used in the countdown',
      type: 'string',
      default: null
    },
    title: {
      title: 'I am a title',
      type: 'string',
      default: null
    }
  },
}

export default Countdown
