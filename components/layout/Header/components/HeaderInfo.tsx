import { IconButton } from '@chakra-ui/button'
import { useDisclosure } from '@chakra-ui/hooks'
import { ListItem, Text, UnorderedList } from '@chakra-ui/layout'
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/modal'
import { MdInfo } from 'react-icons/md'

const HeaderInfo = (): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <IconButton
        aria-label="Open info modal"
        fontSize={18}
        icon={<MdInfo />}
        onClick={onOpen}
        size="sm"
        colorScheme="blue"
        bgColor="blue.400"
        color="white"
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>About this tool</ModalHeader>
          <ModalCloseButton />
          <ModalBody mb={3}>
            <Text fontWeight={500}>Checking a visor:</Text>
            <UnorderedList ml={6} mb={3}>
              <ListItem>
                Check a visor&apos;s status by pasting the public key in the
                input field and clicking the &quot;Check status&quot; button.
              </ListItem>
              <ListItem>
                If a visor is found, you will see a card showing its status.
              </ListItem>
            </UnorderedList>

            <Text fontWeight={500}>Adding a visor:</Text>
            <UnorderedList ml={6} mb={3}>
              <ListItem>
                Add a visor by clicking the &quot;Add visor&quot; button after
                there is a public key in the input field (there is no need to
                check its status first).
              </ListItem>
            </UnorderedList>

            <Text fontWeight={500}>Labels:</Text>
            <UnorderedList ml={6} mb={3}>
              <ListItem>Use labels to categorize your visors.</ListItem>
              <ListItem>
                The visors&apos; label will be used to sort them alphabetically
                in ascending order.
              </ListItem>
              <ListItem>
                Edit a visor&apos;s label by just clicking on it.
              </ListItem>
            </UnorderedList>

            <Text fontWeight={500}>Other features:</Text>
            <UnorderedList ml={6} mb={3}>
              <ListItem>Copy the key by just clicking on it.</ListItem>
              <ListItem>
                Remove one of your visors by clicking on the red &quot;x&quot;
                button and confirming the removal.
              </ListItem>
              <ListItem>
                There is a theme toggle button available in the header.
              </ListItem>
            </UnorderedList>

            <Text fontWeight={500}>Health:</Text>
            <UnorderedList ml={6} mb={3}>
              <ListItem>
                This shows the uptime percentage relative to the current date of
                the month.
              </ListItem>
              <ListItem>
                The minimum uptime percentage required is 75% as of May 2021.
              </ListItem>
            </UnorderedList>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default HeaderInfo
