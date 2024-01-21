import Dialog from '@mui/material/Dialog'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Slide from '@mui/material/Slide'
import { TransitionProps } from '@mui/material/transitions'
import { forwardRef } from 'react'
import { useFetchMenu } from '../hooks/useFetchMenu'
import { Box, Checkbox, ListItemIcon } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListSubheader from '@mui/material/ListSubheader'

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />
})

type MenuDialogProps = {
  open: boolean
  handleClose: () => void
  name: string
  resturantId: number
}

export default function MenuDialog({
  open,
  handleClose,
  name,
  resturantId,
}: MenuDialogProps) {
  const {
    menuData: { largeImage, options, fullPrice },
  } = useFetchMenu(resturantId, name)

  return (
    <>
      <Dialog
        fullWidth
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        maxWidth="md"
      >
        <Box sx={{ display: 'flex', justifyContent: 'center', pt: 3 }}>
          <Typography paragraph variant="h4">
            {name}
          </Typography>
          <IconButton
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
            }}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <img src={largeImage} width={200} style={{ borderRadius: '5%' }} />
        </Box>
        <Box sx={{ my: 3, mx: 3 }}>
          <Typography variant="h5">ราคา {fullPrice} บาท</Typography>
        </Box>
        <Divider sx={{ mx: 3 }} />
        {options ? (
          <List
            sx={{
              width: '100%',
              bgcolor: 'background.paper',
              position: 'relative',
              overflow: 'auto',
              maxHeight: 300,
              '& ul': { padding: 0 },
            }}
            subheader={<li />}
          >
            {options.map((option, indexOption) => (
              <li key={`section-${indexOption}`}>
                <ul>
                  <ListSubheader key={`section-${indexOption}`}>
                    {option.label}
                  </ListSubheader>
                  {option.choices.map((choice, indexChoice) => (
                    <ListItem key={`item-${indexOption}-${indexChoice}`}>
                      <ListItemIcon>
                        <Checkbox edge="start" tabIndex={-1} disableRipple />
                      </ListItemIcon>
                      <ListItemText primary={choice.label} />
                    </ListItem>
                  ))}
                </ul>
              </li>
            ))}
          </List>
        ) : null}
      </Dialog>
    </>
  )
}
