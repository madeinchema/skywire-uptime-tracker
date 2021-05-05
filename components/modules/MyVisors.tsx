import { Grid } from '@chakra-ui/layout'
import React from 'react'
import useMyVisors from '../../hooks/useMyVisors'
import VisorCard from '../VisorCard'

const MyVisors = (): JSX.Element => {
  const {
    myVisors,
    handlers: { updateVisorLabel },
  } = useMyVisors()

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
      {myVisors &&
        myVisors.map((visor) => (
          <VisorCard
            key={visor.key}
            visor={visor}
            onLabelSubmit={updateVisorLabel}
          />
        ))}
    </Grid>
  )
}

export default MyVisors
