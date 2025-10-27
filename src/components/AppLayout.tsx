'use client'

import { Drawer, Box, AppBar, Divider, List, ListItemButton, ListItemText, Toolbar, Typography } from '@mui/material'
import { IconButton } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { useState } from 'react'

export function AppLayout({ children }: { children: React.ReactNode }) {
  const drawerWidth = 240
  const [mobileOpen, setMobileOpen] = useState(false)
  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev)
  }

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Header */}
      <AppBar position="fixed" elevation={1} color="primary">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open navigation"
            edge="start"
            sx={{ mr: 2, display: { md: 'none' } }}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="h1" noWrap>
            Bugflow
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{ display: { xs: 'block', md: 'none' }, '& .MuiDrawer-paper': { width: drawerWidth } }}
      >
        <Box role="presentation" sx={{ p: 2 }} onClick={handleDrawerToggle}>
          <List>
            <ListItemButton>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
            <ListItemButton>
              <ListItemText primary="Issues" />
            </ListItemButton>
          </List>
        </Box>
      </Drawer>

      <Drawer
        variant="permanent"
        open
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Divider />
        <List>
          <ListItemButton>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
          <ListItemButton>
            <ListItemText primary="Issues" />
          </ListItemButton>
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ml: { md: `${drawerWidth}px` },
          p: { xs: 2, sm: 3 },
          overflow: 'auto',
          bgcolor: 'background.default',
          minHeight: '100vh',
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  )
}
