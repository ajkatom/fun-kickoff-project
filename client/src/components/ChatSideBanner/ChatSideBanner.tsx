import { ChangeEvent, useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import useStyles from './useStyles';
import { User } from '../../interface/User';
import AvatarDisplay from '../AvatarDisplay/AvatarDisplay';
import Search from '../Search/Search';
import AuthMenu from '../AuthMenu/AuthMenu';

interface Props {
  loggedInUser: User;
  handleDrawerToggle?: () => void;
}

const ChatSideBanner = ({ loggedInUser }: Props): JSX.Element => {
  const [search, setSearch] = useState<string>('test');
  const [newChatUser, setNewChatUser] = useState<User | null>(null);
  const classes = useStyles();

  // React.FormEvent<FormControl & FormControlProps>)
  const handleChange = (e: ChangeEvent<HTMLInputElement>, newInputValue: string) => {
    setSearch(newInputValue);
    if (newChatUser) {
      setNewChatUser(null);
    }
  };

  return (
    <Grid container display="flex" flexDirection="column" className={classes.chatSideBanner}>
      <Grid item display="flex" alignItems="center" className={classes.userPanel}>
        <AvatarDisplay loggedIn user={loggedInUser} />
        <Typography className={classes.userText} variant="h5">
          {loggedInUser.username}
        </Typography>
        <AuthMenu />
      </Grid>
      <Grid item>
        <Typography className={classes.chatTitle} variant="h5">
          Users
        </Typography>
        <Search search={search} handleChange={handleChange} />
      </Grid>
    </Grid>
  );
};

export default ChatSideBanner;
