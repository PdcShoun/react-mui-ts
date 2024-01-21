import Header from './components/Header'
import MenuList from './components/MenuList'

import { useFetchResturant } from './hooks/useFetchResturant'
import { Container } from '@mui/material'

function App() {
  const resturantId = 227018
  const { resturantData } = useFetchResturant(resturantId)
  const { coverImage, id, menus, activeTimePeriod, name } = resturantData

  return (
    <Container sx={{ border: 1 }} role="contentinfo">
      <Header
        coverImage={coverImage}
        name={name}
        activeTimePeriod={activeTimePeriod}
      />
      {/* <MenuList menuList={menus} resturantId={resturantId} /> */}
    </Container>
  )
}

export default App
