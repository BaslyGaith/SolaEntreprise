import {
    Body,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Img,
    Preview,
    Section,
    Text,
} from '@react-email/components';
import * as React from 'react';

interface QuoteEmailProps {
    fullName: string;
    email: string;
    phone: string;
    description: string;
}

export const QuoteEmail = ({
    fullName,
    email,
    phone,
    description,
}: QuoteEmailProps) => (
    <Html>
        <Head />
        <Preview>Nouvelle demande de devis de {fullName}</Preview>
        <Body style={main}>
            <Container style={container}>
                <Section style={header}>
                    <Heading style={title}>SOLA ENTREPRISE</Heading>
                </Section>
                <Section style={content}>
                    <Heading style={secondaryTitle}>Nouveau Devis Reçu</Heading>
                    <Text style={paragraph}>
                        Une nouvelle demande de devis a été soumise via le formulaire de contact du site web.
                    </Text>
                    <Hr style={hr} />
                    <Section style={section}>
                        <Text style={label}>Client</Text>
                        <Text style={value}>{fullName}</Text>
                    </Section>
                    <Section style={section}>
                        <Text style={label}>Email</Text>
                        <Text style={value}>{email}</Text>
                    </Section>
                    <Section style={section}>
                        <Text style={label}>Téléphone</Text>
                        <Text style={value}>{phone}</Text>
                    </Section>
                    <Hr style={hr} />
                    <Section style={section}>
                        <Text style={label}>Description du Projet</Text>
                        <Text style={descriptionBox}>{description}</Text>
                    </Section>
                </Section>
                <Text style={footer}>
                    © 2026 Sola Entreprise. Tous droits réservés.
                    <br />
                    Ce message a été généré automatiquement par le site web.
                </Text>
            </Container>
        </Body>
    </Html>
);

export default QuoteEmail;

const main = {
    backgroundColor: '#f6f9fc',
    fontFamily:
        '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
    backgroundColor: '#ffffff',
    margin: '0 auto',
    padding: '20px 0 48px',
    marginBottom: '64px',
};

const header = {
    backgroundColor: '#0f172a',
    padding: '32px',
    textAlign: 'center' as const,
};

const title = {
    color: '#ffffff',
    fontSize: '24px',
    fontWeight: '800',
    letterSpacing: '-0.025em',
    margin: '0',
    textTransform: 'uppercase' as const,
};

const content = {
    padding: '40px 48px',
};

const secondaryTitle = {
    color: '#1e293b',
    fontSize: '20px',
    fontWeight: '700',
    marginBottom: '16px',
};

const paragraph = {
    color: '#475569',
    fontSize: '16px',
    lineHeight: '26px',
};

const hr = {
    borderColor: '#e2e8f0',
    margin: '20px 0',
};

const section = {
    marginBottom: '16px',
};

const label = {
    color: '#94a3b8',
    fontSize: '12px',
    fontWeight: '700',
    letterSpacing: '0.05em',
    margin: '0 0 4px',
    textTransform: 'uppercase' as const,
};

const value = {
    color: '#1e293b',
    fontSize: '16px',
    fontWeight: '500',
    margin: '0',
};

const descriptionBox = {
    color: '#475569',
    fontSize: '14px',
    fontStyle: 'italic',
    lineHeight: '24px',
    backgroundColor: '#f8fafc',
    padding: '16px',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
};

const footer = {
    color: '#94a3b8',
    fontSize: '12px',
    textAlign: 'center' as const,
    padding: '0 48px',
};
