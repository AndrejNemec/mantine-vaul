import { Box, Button, Modal, Text, TextInput } from '@mantine/core'
import { useState } from 'react'
import { Vaul } from '../lib'

export const App = () => {
    const [openedAnotherModal, setOpenedAnotherModal] = useState<boolean>(false)
    const [openedNextModal, setOpenedNextModal] = useState<boolean>(false)

    return (
        <div>
            <Box>
                <Vaul
                    withOverlay={false}
                    variant='test'
                    title='Vaul'
                    radius='xl'
                    shadow='xl'
                    target={
                        <Vaul.Target component={Button}>
                            Open vaul
                        </Vaul.Target>
                    }

                    footer={
                        <Button w='100%'>
                            Hello world
                        </Button>
                    }
                >
                    <Box style={{ height: '100%' }}>
                        <Box maw='600px' mx='auto'>
                            <TextInput data-autofocus type="text" />

                            <Vaul
                                variant='test'
                                title='Vaul 2'
                                footer={<Button w='100%'>Hello world</Button>}
                                target={
                                    <Vaul.Target component={Button}>
                                        Open another vaul
                                    </Vaul.Target>
                                }
                            >
                                <Box maw='600px' mx='auto'>
                                    <Text>
                                        This component can be used as a Dialog replacement on mobile and tablet devices. You can read
                                        about why and how it was built{' '}
                                    </Text>
                                    <TextInput data-autofocus type="text" />
                                </Box>
                            </Vaul>

                            <Button onClick={() => setOpenedAnotherModal(true)}>
                                Test
                            </Button>
                            <Text>
                                This component can be used as a Dialog replacement on mobile and tablet devices. You can read
                                about why and how it was built{' '}
                                This component can be used as a Dialog replacement on mobile and tablet devices. You can read
                                about why and how it was built{' '}
                                This component can be used as a Dialog replacement on mobile and tablet devices. You can read
                                about why and how it was built{' '}
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



                        </Box>
                    </Box>
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