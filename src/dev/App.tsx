import { Box, Button, ScrollArea, Text, TextInput } from '@mantine/core'
import { useState } from 'react'
import { Vaul } from '../lib'

export const App = () => {

    const [opened, setOpened] = useState<boolean>(false)
    const [openedAnother, setOpenedAnother] = useState<boolean>(false)

    return (
        <div>
            <Button onClick={() => setOpened(true)}>
                Open vaul
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
                    largestUndimmedSnapPointIndex={0}
                    scrollAreaComponent={ScrollArea.Autosize}
                    footer={
                        <Button w='100%'>
                            Hello world
                        </Button>
                    }
                >
                    <Box maw='600px' mx='auto'>
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
            </Box >
        </div >
    )
}