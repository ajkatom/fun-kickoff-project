import React from 'react';
import { Typography, CardContent, Card, CardMedia, CardActions, IconButton } from '@mui/material';
import { ThumbUp as UpvoteIcon, ThumbDown as DownvoteIcon } from '@mui/icons-material/';

interface RandomFactProps {
  fact: string;
  cover: string;
}

const RandomFactCard: React.FC<RandomFactProps> = ({ fact, cover }) => {
  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', height: 400 }}>
      <CardMedia component="img" height="150" image={cover} alt="A randomly generated cover image" />
      <CardContent sx={{ flex: '1 0 0', overflowY: 'auto' }}>
        <Typography variant="h5" component="h6" color="text.secondary">
          Did you know that,
        </Typography>
        <Typography variant="body1">{fact}</Typography>
      </CardContent>
      <CardActions sx={{ flex: '0 0 %20', justifyContent: 'flex-end', alignItems: 'flex-end' }} disableSpacing>
        <IconButton color="primary" size="large">
          <UpvoteIcon />
        </IconButton>
        <IconButton color="error" size="large">
          <DownvoteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export { RandomFactCard };
