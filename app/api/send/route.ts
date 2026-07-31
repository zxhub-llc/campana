import { EmailTemplate } from '@/components/contact/components/email-template';
import { EmailTemplateUser } from '@/components/contact/components/email-template-user';
import { Resend } from 'resend';
import * as React from 'react';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { fullname, email, company, phone, message, lang } = body;

        if (!fullname || !email || !message) {
            return Response.json(
                { error: 'Faltan campos requeridos' },
                { status: 400 }
            );
        }

        const resolvedLang = lang === 'en' ? 'en' : 'es';

        // Envío 1: notificación empresa
        const companyEmailPromise = resend.emails.send({
            from: 'Contacto Web <no-reply@grupocampana.ec>',
            to: [process.env.CONTACT_EMAIL_TO!],
            replyTo: email,
            subject: `Nuevo mensaje de ${fullname}`,
            react: EmailTemplate({
                firstName: fullname,
                message,
                email,
                phone,
                company,
            }) as React.ReactElement,
        });

        // Envío 2: confirmación usuario
        const userEmailPromise = resend.emails.send({
            from: 'Grupo Campana <no-reply@grupocampana.ec>',
            to: [email],
            replyTo: [process.env.CONTACT_EMAIL_TO!],
            subject: resolvedLang === 'en' ? 'We received your message' : 'Hemos recibido tu mensaje',
            react: EmailTemplateUser({
                firstName: fullname,
                lang: resolvedLang,
            }) as React.ReactElement,
        });

        const [companyResult, userResult] = await Promise.allSettled([
            companyEmailPromise,
            userEmailPromise,
        ]);

        if (companyResult.status === 'rejected' || companyResult.value.error) {
            const err = companyResult.status === 'rejected'
                ? companyResult.reason
                : companyResult.value.error;
            console.error('Error enviando email a la empresa:', err);
            return Response.json({ error: err }, { status: 500 });
        }

        if (userResult.status === 'rejected' || userResult.value.error) {
            const err = userResult.status === 'rejected'
                ? userResult.reason
                : userResult.value.error;
            console.error('Error enviando email de confirmación al usuario:', err);
        }

        return Response.json({
            data: companyResult.value.data,
            userEmailSent: userResult.status === 'fulfilled' && !userResult.value.error,
        });
    } catch (error) {
        console.error('Error en /api/send:', error);
        return Response.json(
            { error: error instanceof Error ? error.message : 'Error desconocido' },
            { status: 500 }
        );
    }
}