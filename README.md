# mantine-vaul

## Mantine port of Vaul drawer component optimized for mobile devices. 

### This is a fork of the https://github.com/emilkowalski/vaul project by Emil Kowalski.


## install:

`pnpm add mantine-vaul @mantine/core @mantine/hooks`

## Use the drawer in your app.

```jsx
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

`onOpenChange`: This prop is a callback function that is called whenever the state of the drawer (opened or closed) changes.

`onClose`: This prop is a callback function that is called when the drawer is closed. 

`closeThreshold`: Number between 0 and 1 that determines when the drawer should be closed. Example: threshold of 0.5 would close the drawer if the user swiped for 50% of the height of the drawer or more.

`scrollLockTimeout`: Duration for which the drawer is not draggable after scrolling content inside of the drawer. Defaults to 500ms

`snapPoints`: Array of numbers from 0 to 100 that corresponds to % of the screen a given snap point should take up. Should go from least visible. Example `[0.2, 0.5, 0.8]`. You can also use px values, which doesn't take screen height into account.

`fadeFromIndex`: Index of a `snapPoint` from which the overlay fade should be applied. Defaults to the last snap point.

`modal`: When `false`it allows to interact with elements outside of the drawer without closing it. Defaults to`true`.

`direction`: Direction of the drawer. Can be `top` or `bottom`, `left`, `right`. Defaults to `bottom`.

`preventScrollRestoration`: When `true` it prevents scroll restoration when the drawer is closed after a navigation happens inside of it. Defaults to `true`.

`disablePreventScroll`: When `true` scroll prevention mechanism will be disabled. Scroll prevention ensures that page will not scroll on mobile when opening drawer. However this mechanism gets confused when drawer has an input with autofocus and therefore opens simulataneosly with touch keyboard. Defaults to `true`. `modal` set to `false` also disables it.

`[data-mantine-vaul-no-drag]`: When interacting with an element with this data attribute, the drawer won't be dragged.
