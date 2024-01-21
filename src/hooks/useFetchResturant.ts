import { useState, useEffect } from 'react'
import axios from 'axios'

type ResturantDataType = {
  name: string
  id: string
  coverImage: string
  menus: string[]
  activeTimePeriod: { open: string; close: string }
}

export function useFetchResturant(restaurantId: number) {
  const [resturantData, setResturantData] = useState<ResturantDataType>({
    name: '',
    id: '',
    coverImage: '',
    menus: [],
    activeTimePeriod: { open: '', close: '' },
  })
  const [error, setError] = useState<null | Error>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    ;(async function () {
      try {
        setLoading(true)
        const response = await axios.get(
          `http://localhost:3001/api/restaurants/${restaurantId}.json`
        )
        setResturantData(response.data)
      } catch (err) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    })()
  }, [restaurantId])

  return { resturantData, error, loading }
}
