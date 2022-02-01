import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) => ({
  chatSideBanner: {
    height: '100vh',
    padding: '1rem 1rem',
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      padding: '2rem 2rem',
      width: '300px',
    },
  },
  userPanel: {
    paddingBottom: '2rem',
  },
  userText: {
    fontWeight: 700,
    paddingLeft: '1rem',
    fontSize: 16,
  },
  chatTitle: {
    fontWeight: 700,
    fontSize: 20,
    padding: '1rem 0',
  },
  chatSummaryContainer: { overflowY: 'auto', marginTop: '1rem' },
  newChatBtn: {
    margin: '1rem 0',
  },
  noChatToSelectText: {
    margin: '1rem 0',
  },
}));

export default useStyles;
