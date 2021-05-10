import { Heading, Text, VStack } from '@chakra-ui/layout'
import { Spinner } from '@chakra-ui/spinner'
import React from 'react'
import useMyVisors from '../../../hooks/useMyVisors'

import VisorsTable from '../../common/VisorsTable/VisorsTable'
import URLGenerator from './components/URLGenerator'

const MyVisors = (): JSX.Element => {
  const {
    myVisors: { data, isLoading },
    handlers: { updateVisorLabel },
  } = useMyVisors()

  const isEmptyData = data?.length === 0

  return (
    <VStack spacing={4} w="100%">
      <Heading as="h1" size="lg">
        Your Visors
      </Heading>
      {isLoading && <Spinner />}
      {isEmptyData && !isLoading ? (
        <Text>No visors have been added yet.</Text>
      ) : (
        <>
          <VisorsTable dataSource={data} onLabelSubmit={updateVisorLabel} />
          <URLGenerator />
        </>
      )}
    </VStack>
  )
}

export default MyVisors
