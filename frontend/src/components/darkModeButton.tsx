import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useColorScheme } from '@mui/material/styles';

export default function DarkModeButton() {
  const { mode, setMode } = useColorScheme();
  if (!mode) {
    return null;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 1,
        borderRadius: 10,
        border: '2px solid',
        borderColor: 'divider',
      }}
    >
      <IconButton
        onClick={() => setMode('light')}
        sx={{
          bgcolor:'light',
          color:'black' ,
        }}
      >
        <LightModeIcon />
      </IconButton>

      <IconButton
        onClick={() => setMode('dark')}
        sx={{
          bgcolor:'dark',
          color:'white' ,
        }}
      >
        <DarkModeIcon />
      </IconButton>
    </Box>
  );
}