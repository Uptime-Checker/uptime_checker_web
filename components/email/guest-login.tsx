import { Body, Container, Head, Heading, Hr, Html, Img, Link, Preview, Section, Text } from '@react-email/components';
import { Logo } from 'constants/image';
import process from 'process';

interface GuestLoginEmailProps {
  magicLink: string;
}

export const GuestLoginEmail = ({ magicLink }: GuestLoginEmailProps) => (
  <Html>
    <Head />
    <Preview>Log in with this magic link.</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img src={Logo} width={48} height={48} alt={process.env.APP_NAME!} />
        <Heading style={heading}>🪄 Your magic link</Heading>
        <Section style={body}>
          <Text style={paragraph}>
            <Link style={link} href={magicLink}>
              👉 Click here to sign in 👈
            </Link>
          </Text>
          <Text style={paragraph}>If you did not request this, please ignore this email.</Text>
        </Section>
        <Text style={paragraph}>
          Best,
          <br />- {process.env.APP_NAME!} Team
        </Text>
        <Hr style={hr} />
        <Img
          src={Logo}
          width={32}
          height={32}
          style={{
            WebkitFilter: 'grayscale(100%)',
            filter: 'grayscale(100%)',
            margin: '20px 0',
          }}
        />
        <Text style={footer}>PurchaseFly LLC.</Text>
        <Text style={footer}>123 E San Carlos St Unit #20 San Jose, CA 95112 </Text>
      </Container>
    </Body>
  </Html>
);

export default GuestLoginEmail;

const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px 25px 48px',
};

const heading = {
  fontSize: '28px',
  fontWeight: 'bold',
  marginTop: '48px',
};

const body = {
  margin: '24px 0',
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '26px',
};

const link = {
  fontWeight: '500',
  color: '#2626c9',
};

const hr = {
  borderColor: '#dddddd',
  marginTop: '48px',
};

const footer = {
  color: '#8898aa',
  fontSize: '12px',
  marginLeft: '4px',
};
