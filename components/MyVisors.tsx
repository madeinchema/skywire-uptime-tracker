import { Grid } from '@chakra-ui/layout';
import React from 'react';
import { VisorUptime } from '../interfaces';
import VisorCard from './VisorCard';

type Props = {
  visors: VisorUptime[] | undefined;
};

const MyVisors = ({ visors }: Props) => {
  return (
    <Grid>
      {visors &&
        visors.map((visor) => <VisorCard key={visor.key} visor={visor} />)}
    </Grid>
  );
};

export default MyVisors;
