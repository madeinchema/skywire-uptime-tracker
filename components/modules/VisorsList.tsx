import React from 'react'
import { Heading, VStack } from '@chakra-ui/layout'
import { Button } from '@chakra-ui/button'
import useVisorsUptimeList from '../../hooks/useVisorsUptimeList'
import VisorsTable from '../VisorsTable'

const VisorsList = (): JSX.Element => {
  const {
    visorsUptimeList: { data, isLoading, isHidden },
    handlers: { toggleShowVisorsUptimeList },
  } = useVisorsUptimeList()

  return (
    <VStack spacing={4} w="100%">
      <Heading as="h1" size="lg">
        Visors List
      </Heading>
      {!isLoading && !isHidden && (
        <>
          <Button size="sm" onClick={toggleShowVisorsUptimeList}>
            Hide list
          </Button>
          <VisorsTable dataSource={data} />
        </>
      )}
      {isHidden && (
        <Button
          isLoading={isLoading}
          colorScheme="blue"
          onClick={toggleShowVisorsUptimeList}
        >
          Show list
        </Button>
      )}
    </VStack>
  )
}

export default VisorsList
