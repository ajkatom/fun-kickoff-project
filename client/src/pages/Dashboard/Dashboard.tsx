import React, { useEffect } from 'react';
import { useAuth } from '../../context/useAuthContext';
import { useSocket } from '../../context/useSocketContext';
import { useHistory } from 'react-router-dom';
import { CircularProgress, Typography, Grid } from '@mui/material';
import { Navbar } from '../../components/Navbar/Navbar';
import { RandomFactCard } from '../../components/FactCard/RandomFactCard';
import { facts } from '../../mocks/mockFacts';

export default function Dashboard(): JSX.Element {
  const { loggedInUser } = useAuth();
  const { initSocket } = useSocket();
  const history = useHistory();

  useEffect(() => {
    initSocket();
  }, [initSocket]);

  if (loggedInUser === undefined) return <CircularProgress />;
  if (!loggedInUser) {
    history.push('/login');
    // loading for a split seconds until history.push works
    return <CircularProgress />;
  }

  return (
    <>
      <Navbar />
      <Grid sx={{ padding: 5 }} container rowSpacing={5} columnSpacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4" component="h1">
            Welcome to random facts!
          </Typography>
        </Grid>
        {facts.map(({ id, fact, coverUrl: cover }) => (
          <Grid item key={id} xs={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <RandomFactCard fact={fact} cover={cover} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
