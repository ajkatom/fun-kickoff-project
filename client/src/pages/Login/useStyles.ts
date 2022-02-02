import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  root: {
    justifyContent: 'center',
    backgroundColor: '#f2f2f2',
    minHeight: '100vh',
    '& .MuiInput-underline:before': {
      borderBottom: '1.2px solid rgba(0, 0, 0, 0.2)',
    },
  },
  authWrapper: {
    display: 'flex',
    lignItems: 'flex-start',
    justifyContent: 'space-between',
    flexDirection: 'column',
    minHeight: '100vh',
    paddingTop: 23,
  },
  welcome: {
    paddingLeft: 150,
    fontSize: 40,
    paddingBottom: 20,
    color: '#000000',
    fontWeight: 'bold',
  },
}));

export default useStyles;
