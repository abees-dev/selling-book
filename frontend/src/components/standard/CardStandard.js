import PropTypes from 'prop-types';
import { styled, Typography, Card, Stack, Avatar, Box, Button } from '@mui/material';
import { m } from 'framer-motion';
import { varFade } from '../animate';

const CardStandard = ({ image, title, description }) => {
  const DescriptionStyle = styled(Typography)(({ theme }) => ({
    marginBottom: theme.spacing(3),
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: '4',
    WebkitBoxOrient: 'vertical',
    color: theme.palette.text.secondary,
  }));

  return (
    <Card sx={{ px: 2, py: 3, minHeight: 256 }}>
      <Stack alignItems="center">
        <Avatar component={m.div} variants={varFade().inDown} src={image} sx={{ mb: 2 }} />
        <Typography component={m.div} variants={varFade().inLeft} variant="h6" sx={{ mb: 3 }}>
          {title}
        </Typography>
        <DescriptionStyle variant="body2" component={m.div} variants={varFade().inUp} align="center">
          {description}
        </DescriptionStyle>
        <Box>
          <Button variant="outlined" component={m.div} variants={varFade().inRight}>
            Class Details
          </Button>
        </Box>
      </Stack>
    </Card>
  );
};
CardStandard.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
};

export default CardStandard;
