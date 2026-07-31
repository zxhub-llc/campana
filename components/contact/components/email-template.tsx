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

interface EmailTemplateProps {
    firstName: string;
    message: string;
    email: string;
    phone: string;
    company?: string;
}

const LOGO_URL = 'https://cms.grupocampana.ec/wp-content/uploads/2026/03/blanco.png';

export function EmailTemplate({ firstName, message, email, phone, company }: EmailTemplateProps) {
    return (
        <Html>
            <Head />
            <Tailwind config={tailwindConfig}>
                <Body className="bg-[#f4f4f5] font-aws text-[#212121]">
                    <Preview>Nuevo mensaje de contacto de {firstName}</Preview>
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
                                <Heading className="text-[#111827] text-[22px] font-bold mb-[8px]">
                                    Nuevo contacto desde la web
                                </Heading>
                                <Text className="text-[#6b7280] text-[14px] leading-[22px] m-0 mb-[8px]">
                                    Recibiste un nuevo mensaje a través del formulario de contacto.
                                </Text>

                                <Hr className="border-[#e5e7eb] my-[20px]" />

                                <Section className="mb-[12px]">
                                    <Text className="text-[#9a773d] text-[11px] font-bold uppercase tracking-wide m-0 mb-[2px]">
                                        Nombre
                                    </Text>
                                    <Text className="text-[#111827] text-[15px] m-0">{firstName}</Text>
                                </Section>
                                <Section className="mb-[12px]">
                                    <Text className="text-[#9a773d] text-[11px] font-bold uppercase tracking-wide m-0 mb-[2px]">
                                        Email
                                    </Text>
                                    <Text className="text-[#111827] text-[15px] m-0">{email}</Text>
                                </Section>
                                <Section className="mb-[12px]">
                                    <Text className="text-[#9a773d] text-[11px] font-bold uppercase tracking-wide m-0 mb-[2px]">
                                        Teléfono
                                    </Text>
                                    <Text className="text-[#111827] text-[15px] m-0">{phone}</Text>
                                </Section>
                                {company && (
                                    <Section className="mb-[12px]">
                                        <Text className="text-[#9a773d] text-[11px] font-bold uppercase tracking-wide m-0 mb-[2px]">
                                            Empresa
                                        </Text>
                                        <Text className="text-[#111827] text-[15px] m-0">{company}</Text>
                                    </Section>
                                )}

                                <Hr className="border-[#e5e7eb] my-[20px]" />

                                <Text className="text-[#9a773d] text-[11px] font-bold uppercase tracking-wide m-0 mb-[2px]">
                                    Mensaje
                                </Text>
                                <Section className="bg-[#f9fafb] rounded-[12px] p-[16px] mt-[8px]">
                                    <Text className="text-[#374151] text-[14px] leading-[22px] m-0 whitespace-pre-wrap">
                                        {message}
                                    </Text>
                                </Section>
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