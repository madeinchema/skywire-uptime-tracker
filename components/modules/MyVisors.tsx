import { Heading, VStack } from '@chakra-ui/layout'
import React from 'react'
import useMyVisors from '../../hooks/useMyVisors'
import VisorsUptimeTable from '../VisorsTable'

const MyVisors = (): JSX.Element => {
  const {
    myVisors,
    handlers: { updateVisorLabel },
  } = useMyVisors()

  return (
    <VStack spacing={4} w="100%">
      <Heading as="h1" size="lg">
        Your Visors
      </Heading>
      <VisorsUptimeTable dataSource={myVisors} />
    </VStack>
  )
}

export default MyVisors
