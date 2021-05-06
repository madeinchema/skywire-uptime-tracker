import { Heading, VStack } from '@chakra-ui/react'
import Layout from '../components/layout/Layout'
import AddVisor from '../components/modules/AddVisor'
import VisorsUptimeTable from '../components/modules/VisorsUptimeTable'
import MyVisors from '../components/modules/MyVisors'

const IndexPage = (): JSX.Element => {
  return (
    <Layout>
      <VStack spacing={8}>
        <VStack spacing={4} w="100%">
          <Heading as="h1" size="lg">
            Add your visors
          </Heading>
          <AddVisor />
        </VStack>

        <MyVisors />

        <Heading as="h1" size="lg">
          Visors List
        </Heading>
        <VisorsUptimeTable />
      </VStack>
    </Layout>
  )
}

export default IndexPage
