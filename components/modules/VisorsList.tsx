import React, { useEffect, useState } from 'react'
import { Heading, VStack } from '@chakra-ui/layout'
import { Button } from '@chakra-ui/button'
import useVisorsUptimeList from '../../hooks/useVisorsUptimeList'
import VisorsTable from '../VisorsTable'

const VisorsList = (): JSX.Element => {
  const [showList, setShowList] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const { visorsUptimeList } = useVisorsUptimeList()

  const handleShowList = () => {
    setShowList((prevState) => !prevState)
  }

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 1500)
  }, [])

  return (
    <VStack spacing={4} w="100%">
      <Heading as="h1" size="lg">
        Visors List
      </Heading>
      {!isLoading && showList && (
        <>
          <Button size="sm" onClick={handleShowList}>
            Hide list
          </Button>
          <VisorsTable dataSource={visorsUptimeList} />
        </>
      )}
      {!showList && (
        <Button
          isLoading={isLoading}
          colorScheme="blue"
          onClick={handleShowList}
        >
          Show list
        </Button>
      )}
    </VStack>
  )
}

export default VisorsList
