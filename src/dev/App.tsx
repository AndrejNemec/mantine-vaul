import { Box, Button, Modal, Text, TextInput } from '@mantine/core'
import { useState } from 'react'
import { Vaul } from '../lib'

export const App = () => {

    const [opened, setOpened] = useState<boolean>(false)
    const [openedAnother, setOpenedAnother] = useState<boolean>(false)
    const [openedAnotherModal, setOpenedAnotherModal] = useState<boolean>(false)
    const [openedNextModal, setOpenedNextModal] = useState<boolean>(false)

    return (
        <div>
            <Button onClick={() => setOpened(true)}>
                Open vaul
            </Button>
            <Button onClick={() => setOpened(false)}>
                Close vaul
            </Button>
            <Box maw='600px' mx='auto'>
                <Text>
                    This component can be used as a Dialog replacement on mobile and tablet devices. You can read
                    about why and how it was built{' '}
                </Text>
                <TextInput data-autofocus type="text" />
            </Box>
            <Box>
                <Vaul
                    variant='test'
                    title='Vaul'
                    opened={opened}
                    onClose={setOpened}
                    radius='xl'
                    shadow='md'

                    footer={
                        <Button w='100%'>
                            Hello world
                        </Button>
                    }
                >
                    <Box style={{ height: '100%' }}>
                        <Box maw='600px' mx='auto'>
                            <Button onClick={() => setOpenedAnotherModal(true)}>
                                Test
                            </Button>
                            <Text>
                                This component can be used as a Dialog replacement on mobile and tablet devices. You can read
                                about why and how it was built{' '}
                            </Text>
                            <Text>
                                This component can be used as a Dialog replacement on mobile and tablet devices. You can read
                                about why and how it was built{' '}
                            </Text>
                            <Text>
                                This component can be used as a Dialog replacement on mobile and tablet devices. You can read
                                about why and how it was built{' '}
                            </Text>
                            <Text>
                                This component can be used as a Dialog replacement on mobile and tablet devices. You can read
                                about why and how it was built{' '}
                            </Text>
                            <Text>
                                This component can be used as a Dialog replacement on mobile and tablet devices. You can read
                                about why and how it was built{' '}
                            </Text>
                            <Text>
                                This component can be used as a Dialog replacement on mobile and tablet devices. You can read
                                about why and how it was built{' '}
                            </Text>
                            <Text>
                                This component can be used as a Dialog replacement on mobile and tablet devices. You can read
                                about why and how it was built{' '}
                            </Text>
                            <Text>
                                This component can be used as a Dialog replacement on mobile and tablet devices. You can read
                                about why and how it was built{' '}
                            </Text>
                            <Text>
                                This component can be used as a Dialog replacement on mobile and tablet devices. You can read
                                about why and how it was built{' '}
                            </Text>
                            <Text>
                                This component can be used as a Dialog replacement on mobile and tablet devices. You can read
                                about why and how it was built{' '}
                            </Text>
                            <Text>
                                This component can be used as a Dialog replacement on mobile and tablet devices. You can read
                                about why and how it was built{' '}
                            </Text>
                            <Text>
                                This component can be used as a Dialog replacement on mobile and tablet devices. You can read
                                about why and how it was built{' '}
                            </Text>
                            <Text>
                                This component can be used as a Dialog replacement on mobile and tablet devices. You can read
                                about why and how it was built{' '}
                            </Text>
                            <Text>
                                This component can be used as a Dialog replacement on mobile and tablet devices. You can read
                                about why and how it was built{' '}
                            </Text>
                            <Text>
                                This component can be used as a Dialog replacement on mobile and tablet devices. You can read
                                about why and how it was built{' '}
                            </Text>
                            <Text>
                                This component can be used as a Dialog replacement on mobile and tablet devices. You can read
                                about why and how it was built{' '}
                            </Text>
                            <Text>
                                This component can be used as a Dialog replacement on mobile and tablet devices. You can read
                                about why and how it was built{' '}
                            </Text>
                            <Text>
                                This component can be used as a Dialog replacement on mobile and tablet devices. You can read
                                about why and how it was built{' '}
                            </Text>
                            <Text>
                                This component can be used as a Dialog replacement on mobile and tablet devices. You can read
                                about why and how it was built{' '}
                            </Text>
                            <Text>
                                This component can be used as a Dialog replacement on mobile and tablet devices. You can read
                                about why and how it was built{' '}
                            </Text>
                            <Text>
                                This component can be used as a Dialog replacement on mobile and tablet devices. You can read
                                about why and how it was built{' '}
                            </Text>
                            <Text>
                                This component can be used as a Dialog replacement on mobile and tablet devices. You can read
                                about why and how it was built{' '}
                            </Text>
                            <Text>
                                This component can be used as a Dialog replacement on mobile and tablet devices. You can read
                                about why and how it was built{' '}
                            </Text>

                            <TextInput data-autofocus type="text" />

                            <Button onClick={() => setOpenedAnother(true)}>
                                Open another vaul
                            </Button>
                        </Box>
                    </Box>


                    <Vaul
                        variant='test'
                        title='Vaul 2'
                        opened={openedAnother}
                        onClose={setOpenedAnother}
                    >
                        <Box maw='600px' mx='auto'>
                            <Text>
                                This component can be used as a Dialog replacement on mobile and tablet devices. You can read
                                about why and how it was built{' '}
                            </Text>
                            <TextInput data-autofocus type="text" />
                        </Box>
                    </Vaul>
                </Vaul>
                <Modal opened={openedAnotherModal} onClose={() => setOpenedAnotherModal(false)}>
                    <Text>
                        This component can be used as a Dialog replacement on mobile and tablet devices. You can read
                        about why and how it was built{' '}
                    </Text>
                    <TextInput data-autofocus type="text" />
                    <Button onClick={() => setOpenedNextModal(true)}>
                        Open next modal
                    </Button>
                </Modal>
                <Modal opened={openedNextModal} onClose={() => setOpenedNextModal(false)}>
                    <Text>
                        This component can be used as a Dialog replacement on mobile and tablet devices. You can read
                        about why and how it was built{' '}


                        DRUHY <br />
                    </Text>
                    <TextInput data-autofocus type="text" />
                    <Button>
                        Open next modal
                    </Button>
                </Modal>
            </Box >
        </div >
    )
}