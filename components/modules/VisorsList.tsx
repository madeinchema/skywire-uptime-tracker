import { Heading, VStack } from '@chakra-ui/layout'
import React from 'react'
import useVisorsUptimeList from '../../hooks/useVisorsUptimeList'
import VisorsTable from '../VisorsTable'

const VisorsList = (): JSX.Element => {
  const { visorsUptimeList } = useVisorsUptimeList()

  return (
    <VStack spacing={4} w="100%">
      <Heading as="h1" size="lg">
        Visors List
      </Heading>
      <VisorsTable dataSource={visorsUptimeList} />
    </VStack>
  )
}

export default VisorsList
