export const responsiveDialogExampleCode = `
import "mantine-vaul/style.css";
import { Box, Button, Text } from "@mantine/core";
import { ResponsiveDialog } from "mantine-vaul";

const resposiveDialogMatches = {
  base: "vaul",
  lg: "modal",
  xl: "drawer",
};

export const App = () => {
  const [open, setOpen] = useState<boolean>(false);

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
`

export const vaulExampleCode = `
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
`