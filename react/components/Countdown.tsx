import React, { useState } from 'react'
import { TimeSplit } from '../typings/global'
import { tick, getTwoDaysFromNow } from '../utils/time'
import { useCssHandles } from 'vtex.css-handles'
import { useQuery } from 'react-apollo'
import useProduct from 'vtex.product-context/useProduct'
import productReleaseDate from '../queries/productReleaseDate.graphql'

interface CountdownProps {
  targetDate: string
}
const DEFAULT_TARGET_DATE = getTwoDaysFromNow()

const CSS_HANDLES = [
  'countdown'
]

const Countdown: StorefrontFunctionComponent<CountdownProps> = () => {
  
  const handles = useCssHandles(CSS_HANDLES)
  const { product } = useProduct()

  const { data, loading, error } = useQuery(productReleaseDate, {
    variables: {
      slug: product?.linkText
    },
    ssr: false
  })
  

  const [timeRemaining, setTime] = useState<TimeSplit>({
    hours: '00',
    minutes: '00',
    seconds: '00'
  })

  if (!product) {
    return (
      <div>
        <span>There is no product context.</span>
      </div>
    )
  }
  if (loading) {
    return (
      <div>
        <span>Loading...</span>
      </div>
    )
  }
  if (error) {
    return (
      <div>
        <span>Error!</span>
      </div>
    )
  }

  tick(data?.product?.releaseDate ||  DEFAULT_TARGET_DATE, setTime)
  console.log('d',data)

  return (
    <div className={`${handles.countdown} c-muted-1 db tc`}>
      <h1>{`${timeRemaining.hours}:${timeRemaining.minutes}:${timeRemaining.seconds}`}</h1>
    </div>
  )
}

Countdown.schema = {
  title: 'editor.countdown.title',
  description: 'editor.countdown.description',
  type: 'object',
  properties: {
    title: {
      title: 'I am a title',
      type: 'string',
      default: null,
    },
    targetDate: {
      title: 'Final date',
      description: 'Final date used in the countdown',
      type: 'string',
      default: null,
    },
  },
}

export default Countdown
