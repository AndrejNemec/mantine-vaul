import { Anchor, Box, Button, CopyButton, Group, Modal, ScrollArea, Stack, Text, TextInput, Title, Tooltip } from '@mantine/core'
import { useState } from 'react'
import { ResponsiveDialog, Vaul } from '../lib'
import { CodeHighlight } from '@mantine/code-highlight'
import { responsiveDialogExampleCode, vaulExampleCode } from './example-code'

export const App = () => {
    const [openedAnotherModal, setOpenedAnotherModal] = useState<boolean>(false)
    const [openedNextModal, setOpenedNextModal] = useState<boolean>(false)
    const [openedResponsiveModal, setOpenedResponsiveModal] = useState<boolean>(false)

    return (
        <Box p='xl'>
            <Stack p='xl' maw='600px' mx='auto'>
                <Title order={1}>
                    Mantine vaul
                </Title>
                <Group>
                    <Button onClick={() => setOpenedResponsiveModal(true)} mr='6px'>
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
                        <Stack maw='600px' mx='auto'>
                            <Text>
                                This component can be used as a Dialog replacement on mobile and tablet devices.
                            </Text>
                            <TextInput label='Initial focus test' data-autofocus type="text" />
                            <Text fw={500}>
                                Install:
                                <CopyButton value='pnpm install mantine-vaul'>
                                    {({ copy, copied }) => (
                                        <Text style={{ cursor: 'pointer' }} onClick={copy} ml='4px' fw={400} span c={copied ? 'blue' : 'gray'}>
                                            pnpm install mantine-vaul
                                            (click to copy)
                                        </Text>
                                    )}
                                </CopyButton>
                            </Text>
                            <Group>
                                <Anchor href='https://github.com/AndrejNemec/mantine-vaul/tree/main' target='_blank' rel='noopener'>
                                    Github
                                </Anchor>
                                <Anchor href='https://www.npmjs.com/package/mantine-vaul' target='_blank' rel='noopener'>
                                    NPM
                                </Anchor>
                                <Anchor href='https://github.com/AndrejNemec/mantine-vaul/blob/main/src/dev/App.tsx' target='_blank' rel='noopener'>
                                    Code
                                </Anchor>
                            </Group>
                            <Text fw={500}>
                                Try to resize window to see how dialog changes
                            </Text>
                        </Stack>
                    </ResponsiveDialog>
                    <Vaul
                        title='Vaul'
                        radius='xl'
                        shadow='xl'
                        scrollAreaComponent={ScrollArea.Autosize}
                        target={
                            <Vaul.Target component={Button}>
                                Open classic vaul
                            </Vaul.Target>
                        }

                        footer={
                            <Button w='100%'>
                                Hello world
                            </Button>
                        }
                    >
                        <Box style={{ height: '100%' }}>
                            <Stack maw='600px' mx='auto'>
                                <TextInput label='Initial focus test' data-autofocus type="text" />
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
                                    <Stack maw='600px' mx='auto'>
                                        <Text>
                                            This component can be used as a Dialog replacement on mobile and tablet devices.
                                        </Text>
                                        <TextInput label='Initial focus test' data-autofocus type="text" />
                                    </Stack>
                                </Vaul>

                                <Button onClick={() => setOpenedAnotherModal(true)}>
                                    Open test modal in vaul
                                </Button>
                                <Text fw={500}>Scroll test:</Text>
                                <Text>
                                    This component can be used as a Dialog replacement on mobile and tablet devices.
                                    This component can be used as a Dialog replacement on mobile and tablet devices.
                                    This component can be used as a Dialog replacement on mobile and tablet devices.
                                    This component can be used as a Dialog replacement on mobile and tablet devices.
                                </Text>
                                <Text>
                                    This component can be used as a Dialog replacement on mobile and tablet devices.
                                </Text>
                                <Text>
                                    This component can be used as a Dialog replacement on mobile and tablet devices.
                                </Text>
                                <Text>
                                    This component can be used as a Dialog replacement on mobile and tablet devices.
                                </Text>
                                <Text>
                                    This component can be used as a Dialog replacement on mobile and tablet devices.
                                </Text>
                                <Text>
                                    This component can be used as a Dialog replacement on mobile and tablet devices.
                                </Text>
                                <Text>
                                    This component can be used as a Dialog replacement on mobile and tablet devices.
                                </Text>
                                <Text>
                                    This component can be used as a Dialog replacement on mobile and tablet devices.
                                </Text>
                                <Text>
                                    This component can be used as a Dialog replacement on mobile and tablet devices.
                                </Text>
                                <Text>
                                    This component can be used as a Dialog replacement on mobile and tablet devices.
                                </Text>
                                <Text>
                                    This component can be used as a Dialog replacement on mobile and tablet devices.
                                </Text>
                                <Text>
                                    This component can be used as a Dialog replacement on mobile and tablet devices.
                                </Text>
                                <Text>
                                    This component can be used as a Dialog replacement on mobile and tablet devices.
                                </Text>
                                <Text>
                                    This component can be used as a Dialog replacement on mobile and tablet devices.
                                </Text>
                                <Text>
                                    This component can be used as a Dialog replacement on mobile and tablet devices.
                                </Text>
                                <Text>
                                    This component can be used as a Dialog replacement on mobile and tablet devices.
                                </Text>
                                <Text>
                                    This component can be used as a Dialog replacement on mobile and tablet devices.
                                </Text>
                                <Text>
                                    This component can be used as a Dialog replacement on mobile and tablet devices.
                                </Text>
                                <Text>
                                    This component can be used as a Dialog replacement on mobile and tablet devices.
                                </Text>
                                <Text>
                                    This component can be used as a Dialog replacement on mobile and tablet devices.
                                </Text>
                                <Text>
                                    This component can be used as a Dialog replacement on mobile and tablet devices.
                                </Text>
                                <Text>
                                    This component can be used as a Dialog replacement on mobile and tablet devices.
                                </Text>
                                <Text>
                                    This component can be used as a Dialog replacement on mobile and tablet devices.
                                </Text>
                            </Stack>
                        </Box>
                    </Vaul>
                </Group>
                <Modal opened={openedAnotherModal} onClose={() => setOpenedAnotherModal(false)}>
                    <Stack>
                        <Text>
                            This component can be used as a Dialog replacement on mobile and tablet devices.
                        </Text>
                        <TextInput data-autofocus type="text" />
                        <Button onClick={() => setOpenedNextModal(true)}>
                            Open next modal
                        </Button>
                    </Stack>
                </Modal>
                <Modal opened={openedNextModal} onClose={() => setOpenedNextModal(false)}>
                    <Stack>
                        <Text>
                            This component can be used as a Dialog replacement on mobile and tablet devices.
                        </Text>
                        <TextInput data-autofocus type="text" />
                        <Button onClick={() => setOpenedNextModal(false)}>
                            Close
                        </Button>
                    </Stack>
                </Modal>

                <Text>
                    A drawer component library for mobile devices, leveraging the power of Vaul for seamless integration.
                </Text>
                <Text fw={500}>
                    Install:
                    <CopyButton value='pnpm install mantine-vaul'>
                        {({ copy, copied }) => (
                            <Tooltip label='Copied' opened={copied}>
                                <Text style={{ cursor: 'pointer' }} onClick={copy} ml='4px' fw={400} span c={copied ? 'blue' : 'gray.7'}>
                                    pnpm install mantine-vaul
                                    (click to copy)
                                </Text>
                            </Tooltip>
                        )}
                    </CopyButton>
                </Text>
                <Text fw={500} fz='xl'>
                    Library works only with mantine v7.9.0+
                </Text>
                <Group>
                    <Anchor href='https://github.com/AndrejNemec/mantine-vaul/tree/main' target='_blank' rel='noopener'>
                        Github
                    </Anchor>
                    <Anchor href='https://www.npmjs.com/package/mantine-vaul' target='_blank' rel='noopener'>
                        NPM
                    </Anchor>
                    <Anchor href='https://github.com/AndrejNemec/mantine-vaul/blob/main/src/dev/App.tsx' target='_blank' rel='noopener'>
                        Code
                    </Anchor>
                </Group>
                <Stack>
                    <Title order={2}>
                        Examples
                    </Title>
                    <Stack gap='xs'>
                        <Title order={3} fz='lg'>
                            Responsive dialog
                        </Title>
                        <CodeHighlight code={responsiveDialogExampleCode} language="tsx" />
                    </Stack>
                    <Stack gap='xs'>
                        <Title order={3} fz='lg'>
                            Classic vaul
                        </Title>
                        <CodeHighlight code={vaulExampleCode} language="tsx" />
                    </Stack>
                </Stack>
            </Stack>
        </Box >
    )
}