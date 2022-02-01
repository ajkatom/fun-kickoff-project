import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#E9EEF9',
    marginLeft: 0,
    height: '50px',
    lineHeight: '18px',
    width: `calc(${drawerWidth} - 2rem)`,
  },
  searchRoot: {
    color: 'inherit',
    width: '100%',
    height: '100%',
    padding: '0 0.5rem',
  },
  searchInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    width: '100%',
    fontWeight: 600,
  },
  searchIcon: {
    height: '100%',
    position: 'absolute',
    right: 15,
    pointerEvents: 'none',
  },
}));

export default useStyles;
