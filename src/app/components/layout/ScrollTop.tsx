import { useState } from 'react';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Fab from '@mui/material/Fab';
import Fade from '@mui/material/Fade';

import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const ScrollTop = ({
  children,
  window,
  open,
}: {
  window?: () => Window;
  children: React.ReactElement;
  open: boolean;
}) => {
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const backToTopHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    const anchor = (
      (event.target as HTMLDivElement).ownerDocument || document
    ).querySelector('#back-to-top-anchor');

    if (anchor) {
      // anchor.scrollIntoView({
      //   block: 'center',
      // });
      anchor.scrollIntoView(true);
    }
  };

  return (
    <>
      {
      // !open && 
      (
        <Fade in={trigger}>
          <Box
            onClick={backToTopHandler}
            role="presentation"
            sx={{ position: 'fixed', bottom: 16, right: 16 }}
          >
            {children}
          </Box>
        </Fade>
      )}
    </>
  );
};

export default ScrollTop;
