import { Avatar, IconButton, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import MenuIcon from '@mui/icons-material/Menu';
import PowerIcon from '@mui/icons-material/PowerSettingsNew';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import styled from '@emotion/styled';
import TelegramIcon from '@mui/icons-material/Telegram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TicktokIcon from '@mui/icons-material/YouTube';

const SocialIconButton = styled(IconButton)(
  ({ theme, ownerState }: any) => {
    return {
      backgroundColor: '#333333',
    };
  }
);

export const TopNav = (props: any) => {
  return (
    <div
      style={{
        textAlign: 'center',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
      }}
    >
      <Stack direction="row" alignItems="center">
        <div
          style={{
            display: 'flex',
            alignItems: 'left',
            flexGrow: '1',
            paddingBottom: '5px',
            borderBottom: '1px solid black',
            paddingLeft: '10px',
          }}
        >
          <MenuIcon
            sx={{
              color: 'black',
              fontSize: '30px',
            }}
          />
        </div>
        <h1
          style={{
            display: 'flex',
            flexGrow: '1',
            justifyContent: 'center',
          }}
        >
          The Speech Fair
        </h1>
        <div
          style={{
            display: 'flex',
            justifyContent: 'right',
            flexGrow: '1',
            paddingBottom: '5px',
            borderBottom: '1px solid black',
            paddingRight: '10px',
          }}
        >
          <PowerIcon
            sx={{
              color: 'red',
              fontSize: '30px',
            }}
          />
        </div>
      </Stack>
      Still Your Home For Speech, Today, Monday, 30 October, 2023
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
        spacing={2}
        padding="10px"
      >
        <Typography variant="body1">Digest Your World</Typography>
        <Stack alignItems="center" direction="row" spacing={1}>
          <Typography
            variant="body2"
            sx={{
              display: 'flex',
              alignItems: 'center',
              color: '#000000',
              fontSize: 16,
              fontWeight: 'bold',
            }}
          >
            In case you’re lost 😊, follow us on:
          </Typography>

          <SocialIconButton size="small">
            <FacebookOutlinedIcon
              sx={{
                color: 'white',
                fontSize: '12.61px',
              }}
            />
          </SocialIconButton>
          <SocialIconButton size="small">
            <WhatsAppIcon
              sx={{
                color: 'white',
                fontSize: '12.61px',
              }}
            />
          </SocialIconButton>
          <SocialIconButton size="small">
            <LinkedInIcon
              sx={{
                color: 'white',
                fontSize: '12.61px',
              }}
            />
          </SocialIconButton>
          <SocialIconButton size="small">
            <TwitterIcon
              sx={{
                color: 'white',
                fontSize: '12.61px',
              }}
            />
          </SocialIconButton>
          <SocialIconButton size="small">
            <TelegramIcon
              sx={{
                color: 'white',
                fontSize: '12.61px',
              }}
            />
          </SocialIconButton>
          <SocialIconButton size="small">
            <YouTubeIcon
              sx={{
                color: 'white',
                fontSize: '12.61px',
              }}
            />
          </SocialIconButton>
          <SocialIconButton size="small">
            <TicktokIcon
              sx={{
                color: 'white',
                fontSize: '12.61px',
              }}
            />
          </SocialIconButton>
        </Stack>
      </Stack>
    </div>
  );
};

TopNav.propTypes = {
  onNavOpen: PropTypes.func,
};
