import { useState, useEffect } from 'react'
import axios from 'axios'

type MenuDataFullType = {
  name: string
  id: string
  thumbnailImage?: string
  fullPrice: number
  discountedPercent: number
  discountedTimePeriod?: {
    begin: string
    end: string
  }
  sold: number
  totalInStock: number
  largeImage?: string
  options: {
    label: string
    choices: {
      label: string
    }[]
  }[]
}

export function useFetchMenu(restaurantId: number, menuName: string) {
  const [menuData, setMenuData] = useState<MenuDataFullType>({
    name: '',
    id: '',
    thumbnailImage: '',
    fullPrice: 0,
    discountedPercent: 0,
    discountedTimePeriod: {
      begin: '',
      end: '',
    },
    sold: 0,
    totalInStock: 0,
    options: [],
  })
  const [error, setError] = useState<null | Error>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    ;(async function () {
      try {
        setLoading(true)
        const response = await axios.get(
          `http://localhost:3001/api/restaurants/${restaurantId}/menus/${menuName}/full.json`
        )
        setMenuData(response.data)
      } catch (err) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    })()
  }, [restaurantId, menuName])

  return { menuData, error, loading }
}
