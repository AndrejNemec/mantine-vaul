

# mantine-vaul

**Una biblioteca de componentes para drawers en dispositivos móviles, que aprovecha el poder de Vaul para una integración perfecta.**

**La biblioteca solo funciona con mantine v7.9.0+**

([Live example](https://mantine-vaul.vercel.app/))

## instalación:

`pnpm add mantine-vaul @mantine/core @mantine/hooks`

## Usa el drawer en tu aplicación.

**Solo Vaul:**

```tsx
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

**Diálogo responsivo:** (Muestra vaul, un drawer clásico o un diálogo clásico según el breakpoint responsivo)

```tsx
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
```

## Propiedades:

`opened`: Esta prop determina si el drawer está actualmente abierto o cerrado. Al establecerlo en true, el drawer se muestra en estado abierto, mientras que al establecerlo en false se cierra.

`onOpenChange`: Se invoca cuando vaul se cierra o se abre.

`closeThreshold`: Número entre 0 y 1 que determina cuándo se debe cerrar el drawer. Ejemplo: un umbral de 0.5 cerraría el drawer si el usuario desliza el dedo por el 50 % de la altura del drawer o más.

`scrollLockTimeout`: Duración durante la cual el drawer no es arrastrable después de desplazarse por el contenido dentro del mismo. Por defecto es 500ms.

`snapPoints`: Array de números del 0 al 100 que corresponde al % de la pantalla que debe ocupar un punto de anclaje dado. Debe ir de menos visible a más visible. Ejemplo: [0.2, 0.5, 0.8]. También puedes usar valores en px, los cuales no tienen en cuenta la altura de la pantalla.

`fadeFromIndex`: Índice de un snapPoint desde el cual se debe aplicar el desvanecimiento del overlay. Por defecto es el último punto de anclaje.

`direction`: Dirección del drawer. Puede ser top, bottom, left o right. Por defecto es bottom.

`shadow`, `radius`... y más

### Créditos:

- Emil Kowalski (Vaul)
