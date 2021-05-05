import { Grid } from '@chakra-ui/layout'
import React from 'react'
import { VisorUptime } from '../../interfaces'
import VisorCard from '../VisorCard'

type Props = {
  visors: VisorUptime[] | undefined
}

const MyVisors = ({ visors }: Props): JSX.Element => {
  return (
    <Grid
      templateColumns={{
        base: '1fr',
        md: '1fr 1fr',
        xl: 'repeat(3, 1fr)',
      }}
      gap={5}
      px={2}
    >
      {visors &&
        visors.map((visor) => <VisorCard key={visor.key} visor={visor} />)}
    </Grid>
  )
}

export default MyVisors
