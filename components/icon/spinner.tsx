import { SpinnerCircular } from 'spinners-react';

type Props = {
  size: number;
  className?: string;
};

const Spinner = ({ size, className }: Props) => {
  return (
    <SpinnerCircular
      className={className}
      size={size}
      thickness={180}
      speed={100}
      color="#4F46E5"
      secondaryColor="rgba(24, 24, 24, 0.06)"
    />
  );
};

export default Spinner;
