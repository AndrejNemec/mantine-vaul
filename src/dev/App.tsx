import { Box, Button, Text } from '@mantine/core'
import { useState } from 'react'
import { Vaul } from '../lib'

export const App = () => {
    const [opened, setOpened] = useState<boolean>(false)

    return (
        <div>
            <Button onClick={() => setOpened(true)}>
                Open vaul
            </Button>
            <Box>
                <Vaul
                    shouldScaleBackground
                    variant='test'
                    title='Vaul'
                    open={opened}
                    onOpenChange={(value) => setOpened(value)}
                >
                    <Box maw='600px' mx='auto'>
                        <Text>
                            This component can be used as a Dialog replacement on mobile and tablet devices. You can read
                            about why and how it was built{' '}
                        </Text>
                    </Box>
                </Vaul>
            </Box >
        </div >
    )
}