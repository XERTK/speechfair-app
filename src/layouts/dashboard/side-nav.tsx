import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import PropTypes from 'prop-types';
import React from 'react';

import {
  Box,
  Divider,
  Drawer,
  Stack,
  useMediaQuery,
} from '@mui/material';
import { items } from './config';
import { SideNavItem } from './side-nav-item';
import { Scrollbar } from '@/components/scrollbar';
import { Logo } from '@/components/logo';

export const SideNav = (props: any) => {
  const { open, onClose } = props;
  const pathname = usePathname();
  const lgUp = useMediaQuery((theme: any) =>
    theme.breakpoints.up('lg')
  );

  const content = (
    <Scrollbar
      sx={{
        height: '100%',
        '& .simplebar-content': {
          height: '100%',
        },
        '& .simplebar-scrollbar:before': {
          background: 'neutral.400',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        <Box sx={{ p: 3 }}>
          <Box
            component={NextLink}
            href="/"
            sx={{
              display: 'inline-flex',
              height: 32,
              width: 32,
            }}
          >
            <Logo />
          </Box>
        </Box>
        <Divider sx={{ borderColor: 'neutral.700' }} />
        <Box
          component="nav"
          sx={{
            flexGrow: 1,
            px: 2,
            py: 3,
          }}
        >
          <Stack
            component="ul"
            spacing={0.5}
            sx={{
              listStyle: 'none',
              p: 0,
              m: 0,
            }}
          >
            {items.map((item: any) => {
              if (item.subItems) {
                // Render dropdown menu and its sub-items
                return (
                  <React.Fragment key={item.title}>
                    {/* Render Dropdown Item */}
                    <SideNavItem
                      title={item.title}
                      icon={item.icon}
                      disabled={item.disabled}
                      external={item.external}
                    />
                    {/* Render Sub-items */}
                    {item.subItems.map((subItem: any) => (
                      <SideNavItem
                        key={subItem.title}
                        title={subItem.title}
                        path={subItem.path}
                        disabled={subItem.disabled}
                        external={subItem.external}
                      />
                    ))}
                  </React.Fragment>
                );
              } else {
                // Render regular item
                const active = item.path
                  ? pathname === item.path
                  : false;
                return (
                  <SideNavItem
                    key={item.title}
                    active={active}
                    disabled={item.disabled}
                    external={item.external}
                    icon={item.icon}
                    path={item.path}
                    title={item.title}
                  />
                );
              }
            })}
          </Stack>
        </Box>
      </Box>
    </Scrollbar>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: 'neutral.800',
            color: 'common.white',
            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: 'neutral.800',
          color: 'common.white',
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

SideNav.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
