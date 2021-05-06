import { Heading, VStack } from '@chakra-ui/react'

import Layout from '../components/layout/Layout'
import AddVisor from '../components/modules/AddVisor'
import MyVisors from '../components/modules/MyVisors'
import VisorsList from '../components/modules/VisorsList'

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
        <VisorsList />
      </VStack>
    </Layout>
  )
}

export default IndexPage
