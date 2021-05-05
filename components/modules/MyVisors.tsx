import { Grid } from '@chakra-ui/layout'
import React from 'react'
import useMyVisors from '../../hooks/useMyVisors'
import { VisorUptime } from '../../interfaces'
import VisorCard from '../VisorCard'

const MyVisors = (): JSX.Element => {
  const { myVisors } = useMyVisors()
  const { handlers } = useMyVisors()

  const handleLabelSubmit = () => {
    console.log('handleLabelSubmit')
  }

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
            onLabelSubmit={handleLabelSubmit}
          />
        ))}
    </Grid>
  )
}

export default MyVisors
