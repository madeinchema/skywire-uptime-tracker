import { Heading, VStack } from '@chakra-ui/react'
import Layout from '../components/layout/Layout'
import useVisorsUptimeList from '../hooks/useVisorsUptimeList'
import AddVisor from '../components/AddVisor'
import VisorsUptimeTable from '../components/modules/VisorsUptimeTable'
import MyVisors from '../components/modules/MyVisors'
import useMyVisors from '../hooks/useMyVisors'

const IndexPage = (): JSX.Element => {
  const { visorsUptimeList } = useVisorsUptimeList()
  const { myVisors } = useMyVisors()

  return (
    <Layout>
      <VStack spacing={8}>
        <VStack spacing={4} w="100%">
          <Heading as="h1" size="lg">
            Add your visors
          </Heading>
          <AddVisor />
        </VStack>
        <VStack spacing={4} w="100%">
          <Heading as="h1" size="lg">
            Your Visors
          </Heading>
          <MyVisors visors={myVisors} />
        </VStack>
        <Heading as="h1" size="lg">
          Visors List
        </Heading>
        <VisorsUptimeTable dataSource={visorsUptimeList} />
      </VStack>
    </Layout>
  )
}

export default IndexPage
