import React from 'react'
import { Heading, VStack } from '@chakra-ui/layout'
import { Button } from '@chakra-ui/button'
import useVisorsList from '../../hooks/useVisorsList'
import VisorsTable from '../common/VisorsTable/VisorsTable'

const VisorsList = (): JSX.Element => {
  const {
    visorsList: { data, isLoading, isHidden },
    handlers: { toggleShowVisorsList },
  } = useVisorsList()

  return (
    <VStack spacing={4} w="100%">
      <Heading as="h1" size="lg">
        Visors List
      </Heading>
      {!isLoading && !isHidden && (
        <>
          <Button size="sm" onClick={toggleShowVisorsList}>
            Hide list
          </Button>
          <VisorsTable dataSource={data} />
        </>
      )}
      {isHidden && (
        <Button
          isLoading={isLoading}
          colorScheme="blue"
          onClick={toggleShowVisorsList}
        >
          Show list
        </Button>
      )}
    </VStack>
  )
}

export default VisorsList
