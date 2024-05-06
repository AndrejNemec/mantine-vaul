import { Box, Button, Modal, ScrollArea, Text, TextInput } from '@mantine/core'
import { useState } from 'react'
import { ResponsiveDialog, Vaul } from '../lib'

export const App = () => {
    const [openedAnotherModal, setOpenedAnotherModal] = useState<boolean>(false)
    const [openedNextModal, setOpenedNextModal] = useState<boolean>(false)
    const [openedResponsiveModal, setOpenedResponsiveModal] = useState<boolean>(false)

    return (
        <div>
            <Box>
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
                <Button onClick={() => setOpenedResponsiveModal(true)}>
                    Open responsive dialog
                </Button>
                <ResponsiveDialog
                    title='Responsive dialog'
                    opened={openedResponsiveModal}
                    onClose={setOpenedResponsiveModal}
                    footer={
                        <Box>
                            <Button>
                                Hello world
                            </Button>
                        </Box>
                    }
                >
                    <Box maw='600px' mx='auto'>
                        <Text>
                            This component can be used as a Dialog replacement on mobile and tablet devices. You can read
                            about why and how it was built{' '}
                        </Text>
                        <TextInput data-autofocus type="text" />
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
                    </Box>
                </ResponsiveDialog>
                <Vaul
                    withOverlay={false}
                    variant='test'
                    title='Vaul'
                    radius='xl'
                    shadow='xl'
                    scrollAreaComponent={ScrollArea.Autosize}
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
                <Box maw='600px' mx='auto' h='1200px'>
                    <Text>
                        This component can be used as a Dialog replacement on mobile and tablet devices. You can read
                        about why and how it was built{' '}
                    </Text>
                    <TextInput data-autofocus type="text" />
                </Box>
            </Box >
        </div >
    )
}