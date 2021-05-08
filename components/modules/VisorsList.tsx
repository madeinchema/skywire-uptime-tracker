import React, { useState } from 'react'
import { Heading, VStack } from '@chakra-ui/layout'
import { Button } from '@chakra-ui/button'
import useVisorsUptimeList from '../../hooks/useVisorsUptimeList'
import VisorsTable from '../VisorsTable'

const VisorsList = (): JSX.Element => {
  const [showList, setShowList] = useState(false)
  const { visorsUptimeList } = useVisorsUptimeList()

  const handleShowList = () => {
    setShowList((prevState) => !prevState)
  }

  return (
    <VStack spacing={4} w="100%">
      <Heading as="h1" size="lg">
        Visors List
      </Heading>
      {showList ? (
        <>
          <Button size="sm" onClick={handleShowList}>
            Hide list
          </Button>
          <VisorsTable dataSource={visorsUptimeList} />
        </>
      ) : (
        <Button colorScheme="blue" onClick={handleShowList}>
          Show list
        </Button>
      )}
    </VStack>
  )
}

export default VisorsList
