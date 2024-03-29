type Props = {
  className?: string;
};

const LogoWithoutText = ({ className }: Props) => {
  return (
    <svg
      className={className}
      width="36"
      height="37"
      viewBox="0 0 36 37"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M31.253 36.1556C33.4621 36.1556 35.2669 34.3573 35.0165 32.1624C33.1671 15.9518 20.2039 2.98855 3.9932 1.13918C1.7983 0.88878 0 2.69469 0 4.90382C0 10.7975 0 22.2061 0 32.1573C0 34.3664 1.79015 36.1556 3.99929 36.1556C13.625 36.1556 25.2638 36.1556 31.253 36.1556Z"
        fill="#4F46E5"
      />
      <path
        d="M19.7249 36.6163C21.3817 36.6163 22.7414 35.2659 22.5228 33.6235C21.1767 23.5079 13.1084 15.4395 2.99277 14.0934C1.35039 13.8749 0 15.2343 0 16.8911C0 20.7562 0 27.6887 0 33.6182C0 35.275 1.34113 36.6163 2.99798 36.6163C8.89718 36.6163 15.85 36.6163 19.7249 36.6163Z"
        fill="#36D56C"
      />
    </svg>
  );
};

export default LogoWithoutText;
