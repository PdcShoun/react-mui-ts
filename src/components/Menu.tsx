import { useState } from 'react'
import { Box, Typography, Button } from '@mui/material'
import MenuDialog from './MenuDialog'

type MenuProps = {
  returanId: number
  discountedPercent: number
  fullPrice: number
  id: string
  name: string
  sold: number
  thumbnailImage?: string
  totalInStock: number
}

export default function Menu({
  discountedPercent,
  fullPrice,
  id,
  name,
  sold,
  thumbnailImage,
  totalInStock,
  returanId,
}: MenuProps) {
  const [open, setOpen] = useState(false)
  const discountPrice = fullPrice - (fullPrice * discountedPercent) / 100
  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  return (
    <>
      <Button
        sx={{
          display: 'flex',
          my: 2,
          color: 'black',
          width: '100%',
          justifyContent: 'flex-start',
        }}
        onClick={handleClickOpen}
      >
        <img src={thumbnailImage} width={200} style={{ borderRadius: '5%' }} />
        <Box sx={{ ml: 2 }}>
          <Typography className="">{name}</Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Typography
              sx={{ textDecorationLine: discountedPercent && `line-through` }}
            >
              {fullPrice} บาท
            </Typography>
            {discountedPercent ? (
              <Typography>{`${discountPrice} บาท`}</Typography>
            ) : null}
          </Box>
        </Box>
      </Button>
      <MenuDialog
        open={open}
        handleClose={handleClose}
        name={name}
        resturantId={returanId}
      />
    </>
  )
}
