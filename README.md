# mantine-vaul

## Mantine port of Vaul drawer component optimized for mobile devices. 

### This is a fork of the:
- https://github.com/emilkowalski/vaul project by emilkowalski (Emil Kowalski)
- https://github.com/wldyslw/react-bottom-sheet project by wldyslw (Uladzislau)


## install:

`pnpm add mantine-vaul @mantine/core @mantine/hooks @use-gesture/react`

## Use the drawer in your app.

```jsx
import 'mantine-vaul/style.css'
import { Box, Button, Text } from '@mantine/core'
import { useState } from 'react'
import { Vaul } from 'mantine-vaul'

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
```

## Props:
`opened`: This prop determines whether the drawer is currently open or closed. When set to true, the drawer is displayed in the open state, while setting it to false closes the drawer.

`onClose`: Called when vaul is closed.

`snapPoints`: Example `["10%", "50%", "90%"]`.

### Credits:
- Emil Kowalski
- Uladzislau