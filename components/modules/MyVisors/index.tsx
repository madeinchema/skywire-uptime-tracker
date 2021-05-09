import { Heading, VStack } from '@chakra-ui/layout'
import { Spinner } from '@chakra-ui/spinner'
import React from 'react'
import useMyVisors from '../../../hooks/useMyVisors'
import VisorsTable from '../../common/VisorsTable/VisorsTable'

const MyVisors = (): JSX.Element => {
  const {
    myVisors: { data, isLoading },
    handlers: { updateVisorLabel },
  } = useMyVisors()

  return (
    <VStack spacing={4} w="100%">
      <Heading as="h1" size="lg">
        Your Visors
      </Heading>
      {isLoading ? (
        <Spinner />
      ) : (
        <VisorsTable dataSource={data} onLabelSubmit={updateVisorLabel} />
      )}
    </VStack>
  )
}

export default MyVisors
