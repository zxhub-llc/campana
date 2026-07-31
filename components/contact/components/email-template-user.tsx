import * as React from 'react';
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
    Tailwind,
    Text,
} from 'react-email';
import tailwindConfig from '../components/tailwind.config';

interface EmailTemplateUserProps {
    firstName: string;
    lang?: "es" | "en";
}

const LOGO_URL = 'https://cms.grupocampana.ec/wp-content/uploads/2026/03/blanco.png';

const i18n = {
    es: {
        preview: "Hemos recibido tu mensaje",
        title: "¡Gracias por contactarnos!",
        greeting: (name: string) => `Hola ${name},`,
        body: "Hemos recibido tu mensaje correctamente. Nuestro equipo lo revisará y se pondrá en contacto contigo a la brevedad.",
        signature: "Saludos,",
        team: "El equipo de Grupo Campana",
    },
    en: {
        preview: "We've received your message",
        title: "Thanks for reaching out!",
        greeting: (name: string) => `Hi ${name},`,
        body: "We've received your message successfully. Our team will review it and get back to you shortly.",
        signature: "Best regards,",
        team: "The Grupo Campana Team",
    }
};

export function EmailTemplateUser({ firstName, lang = "es" }: EmailTemplateUserProps) {
    const t = i18n[lang];

    return (
        <Html>
            <Head />
            <Tailwind config={tailwindConfig}>
                <Body className="bg-[#f4f4f5] font-aws text-[#212121]">
                    <Preview>{t.preview}</Preview>
                    <Container className="p-5 mx-auto">
                        <Section className="bg-white rounded-[16px] overflow-hidden">
                            <Section className="bg-[#00122d] flex py-6 items-center justify-center">
                                <Img
                                    src={LOGO_URL}
                                    width="160"
                                    alt="Grupo Campana"
                                    className="mx-auto"
                                />
                            </Section>

                            <Section className="py-[28px] px-[32px]">
                                <Heading className="text-[#111827] text-[22px] font-bold mb-[16px]">
                                    {t.title}
                                </Heading>
                                <Text className="text-[#374151] text-[15px] leading-[24px] m-0 mb-[12px]">
                                    {t.greeting(firstName)}
                                </Text>
                                <Text className="text-[#374151] text-[15px] leading-[24px] m-0 mb-[12px]">
                                    {t.body}
                                </Text>

                                <Hr className="border-[#e5e7eb] my-[24px]" />

                                <Text className="text-[#374151] text-[14px] leading-[22px] m-0">
                                    {t.signature}
                                    <br />
                                    <strong className="text-[#b5934a]">{t.team}</strong>
                                </Text>
                            </Section>

                            <Section className="bg-[#f9fafb] py-[20px] px-[32px]">
                                <Text className="text-[#9ca3af] text-[12px] text-center m-0">
                                    © {new Date().getFullYear()} Grupo Campana. Todos los derechos reservados.
                                </Text>
                            </Section>
                        </Section>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
}