import { Box, Container, LinearProgress } from '@mui/material'
import Menu from './Menu'

import InfiniteScroll from 'react-infinite-scroll-component'
import { useEffect, useRef, useState } from 'react'
import axios from 'axios'

type MenuListProps = {
  menuList: string[]
  resturantId: number
}

type MenuItemType = {
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
}

export default function MenuList({ menuList, resturantId }: MenuListProps) {
  const [menuItems, setItems] = useState<MenuItemType[]>([])
  const [nextItemIdIndex, setNextItemIdIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const infiniteScrollRef = useRef<InfiniteScroll>(null)

  const fetchMoreData = async () => {
    if (isLoading || nextItemIdIndex >= menuList.length) return
    setIsLoading(true)

    try {
      const nextItemId = menuList[nextItemIdIndex]
      const response = await axios(
        `http://localhost:3001/api/restaurants/${resturantId}/menus/${nextItemId}/short.json`
      )
      const newItem = await response.data
      setItems((prevItems) => [...prevItems, newItem])
      setNextItemIdIndex(nextItemIdIndex + 1)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchMoreData()
  }, [resturantId, menuList])

  return (
    <Box>
      <Container>
        <InfiniteScroll
          dataLength={menuItems.length}
          next={fetchMoreData}
          hasMore={true}
          loader={<LinearProgress />}
          ref={infiniteScrollRef}
        >
          {menuItems.map(
            (
              {
                name,
                fullPrice,
                discountedPercent,
                thumbnailImage,
                id,
                sold,
                totalInStock,
              },
              index
            ) => (
              <Menu
                returanId={resturantId}
                id={id}
                key={crypto.randomUUID()}
                name={name}
                fullPrice={fullPrice}
                discountedPercent={discountedPercent}
                thumbnailImage={thumbnailImage}
                sold={sold}
                totalInStock={totalInStock}
              />
            )
          )}
        </InfiniteScroll>
      </Container>
    </Box>
  )
}
