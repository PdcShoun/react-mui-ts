import { Alert, Box, Container, Typography } from '@mui/material'

type HeaderType = {
  coverImage: string
  name: string
  activeTimePeriod: { open: string; close: string }
}

export default function Header({
  coverImage,
  name,
  activeTimePeriod,
}: HeaderType) {
  const [openHour, openMinute] = activeTimePeriod.open.split(':')
  const openTime = new Date()
  openTime.setHours(+openHour, +openMinute, 0, 0)

  const [closeHour, closeMinute] = activeTimePeriod.close.split(':')
  const closeTime = new Date()
  closeTime.setHours(+closeHour, +closeMinute, 0, 0)

  const currentTime = new Date()
  const isOpen = currentTime >= openTime && currentTime < closeTime

  return (
    <Box>
      <Box sx={{ height: 400, overflow: 'hidden' }}>
        <img
          className=""
          src={coverImage}
          alt="Picture"
          style={{ width: '100%', height: '100%' }}
        />
      </Box>
      <Container sx={{ mt: 3 }}>
        <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
          <Typography variant="h3">{name}</Typography>
          <Alert
            sx={{
              height: '100%',
              bgcolor: isOpen ? 'success.light' : 'error.main',
              px: 5,
            }}
            icon={false}
            variant="filled"
          >
            {isOpen ? 'เปิด' : 'ปิด'}
          </Alert>
        </Box>
      </Container>
    </Box>
  )
}
