import { VStack } from '@chakra-ui/react'

import useToasts from '../hooks/useToasts'
import Layout from '../components/layout/Layout'
import AddVisor from '../components/modules/AddVisor'
import MyVisors from '../components/modules/MyVisors'
import VisorsList from '../components/modules/VisorsList'

const IndexPage = (): JSX.Element => {
  useToasts()

  return (
    <Layout>
      <VStack spacing={8}>
        <AddVisor />
        <MyVisors />
        <VisorsList />
      </VStack>
    </Layout>
  )
}

export default IndexPage
