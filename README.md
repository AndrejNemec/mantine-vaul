# mantine-vaul ([Live example](https://mantine-vaul.vercel.app/))

**A drawer component library for mobile devices, leveraging the power of Vaul for seamless integration.**

**Library works only with mantine v7.9.0+**

## install:

`pnpm add mantine-vaul @mantine/core @mantine/hooks`

## Use the drawer in your app.

**Only Vaul:**

```jsx
import "mantine-vaul/style.css";
import { Box, Button, Text } from "@mantine/core";
import { Vaul } from "mantine-vaul";

export const App = () => {
  return (
    <div>
      <Box>
        <Vaul
          title="Vaul"
          target={<Vaul.Target component={Button}>Open vaul</Vaul.Target>}
        >
          <Box maw="600px" mx="auto">
            <Text>
              This component can be used as a Dialog replacement on mobile and
              tablet devices. You can read about why and how it was built{" "}
            </Text>
          </Box>
        </Vaul>
      </Box>
    </div>
  );
};
```

**Responsive dialog:** (Show vaul, classic drawer or classic dialog by responsive breakpoint)

```jsx
import "mantine-vaul/style.css";
import { Box, Button, Text } from "@mantine/core";
import { ResponsiveDialog } from "mantine-vaul";

const resposiveDialogMatches = {
  base: "vaul",
  lg: "modal",
  xl: "drawer",
};

export const App = () => {
  const [open, setOpen] = useState < boolean > false;

  return (
    <div>
      <Button onClick={() => setOpen(true)}>Open</Button>
      <Box>
        <ResponsiveDialog
          opened={open}
          onClose={() => setOpen(false)}
          title="Vaul"
          matches={resposiveDialogMatches}
        >
          <Box maw="600px" mx="auto">
            <Text>
              This component can be used as a Dialog replacement on mobile and
              tablet devices. You can read about why and how it was built{" "}
            </Text>
          </Box>
        </ResponsiveDialog>
      </Box>
    </div>
  );
};
```

## Props:

`opened`: This prop determines whether the drawer is currently open or closed. When set to true, the drawer is displayed in the open state, while setting it to false closes the drawer.

`onOpenChange`: Called when vaul is closed or opened.

`closeThreshold`: Number between 0 and 1 that determines when the drawer should be closed. Example: threshold of 0.5 would close the drawer if the user swiped for 50% of the height of the drawer or more.

`scrollLockTimeout`: Duration for which the drawer is not draggable after scrolling content inside of the drawer. Defaults to 500ms

`snapPoints`: Array of numbers from 0 to 100 that corresponds to % of the screen a given snap point should take up. Should go from least visible. Example [0.2, 0.5, 0.8]. You can also use px values, which doesn't take screen height into account.

`fadeFromIndex`: Index of a snapPoint from which the overlay fade should be applied. Defaults to the last snap point.

`direction`: Direction of the drawer. Can be top or bottom, left, right. Defaults to bottom.

`shadow`, `radius`... and more

### Credits:

- Emil Kowalski (Vaul)
