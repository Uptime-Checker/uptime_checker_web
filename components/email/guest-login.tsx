import { Button } from '@react-email/button';
import { Tailwind } from '@react-email/tailwind';

type Props = {
  url: string;
};

const Email = ({ url }: Props) => {
  return (
    <Tailwind
      config={{
        theme: {
          extend: {
            colors: {
              brand: '#007291',
            },
          },
        },
      }}
    >
      <Button href={url} className="bg-brand px-3 py-2 font-medium leading-4 text-white">
        Click me
      </Button>
    </Tailwind>
  );
};

export default Email;
