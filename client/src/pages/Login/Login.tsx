import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { FormikHelpers } from 'formik';
import useStyles from './useStyles';
import login from '../../helpers/APICalls/login';
import LoginForm from './LoginForm/LoginForm';
import AuthHeader from '../../components/AuthHeader/AuthHeader';
import { useAuth } from '../../context/useAuthContext';
import { useSnackBar } from '../../context/useSnackbarContext';
import logo from '../../Images/logo.png';
import { Link } from 'react-router-dom';

export default function Login(): JSX.Element {
  const classes = useStyles();
  const { updateLoginContext } = useAuth();
  const { updateSnackBarMessage } = useSnackBar();

  const handleSubmit = (
    { email, password }: { email: string; password: string },
    { setSubmitting }: FormikHelpers<{ email: string; password: string }>,
  ) => {
    login(email, password).then((data) => {
      if (data.error) {
        setSubmitting(false);
        updateSnackBarMessage(data.error.message);
      } else if (data.success) {
        updateLoginContext(data.success);
      } else {
        // should not get here from backend but this catch is for an unknown issue
        console.error({ data });

        setSubmitting(false);
        updateSnackBarMessage('An unexpected error occurred. Please try again');
      }
    });
  };

  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={12} marginBottom={8} bgcolor={'white'} boxShadow={'light'} display={'inline-flex'}>
        <Box paddingTop={3} marginLeft={3} paddingRight={25}>
          <img src={logo} width={150} height={30} />
        </Box>
        <Box marginLeft={25}>
          <AuthHeader linkTo="/signup" asideText="Don't have an account?" btnText="sign up" />
        </Box>
      </Grid>
      <Grid item xs={12} sm={8} md={7} elevation={6} component={Paper} marginBottom={20} square>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
          flexDirection="column"
          className={classes.authWrapper}
        >
          <Box width="100%" maxWidth={450} p={3} alignSelf="center">
            <Grid container>
              <Grid item xs>
                <Typography sx={{ fontWeight: 'bold' }} className={classes.welcome} component="h1" variant="h5">
                  Welcome back!
                </Typography>
              </Grid>
            </Grid>
            <LoginForm handleSubmit={handleSubmit} />
          </Box>
          <Box p={1} alignSelf="center" />
        </Box>
        <Box marginLeft={50}>
          <Typography fontWeight={'bolder'} fontSize={15} paddingTop={10} paddingBottom={10}>
            Not a member?{' '}
            <Link to="/SignUp" color={'#f14140'}>
              sign up
            </Link>
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}
