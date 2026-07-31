# Grupo Campana — Sitio Web Oficial 🏢

<!-- Sitio Web y Desarrollador -->
[![Sitio Web Oficial](https://img.shields.io/badge/Sitio_Web-grupocampana.ec-2563EB?style=flat&logo=googlechrome&logoColor=white)](https://grupocampana.ec/)
[![Desarrollado por Stuvvion](https://img.shields.io/badge/Desarrollado_por-Stuvvion-111827?style=flat&logo=rocket&logoColor=white)](https://www.stuvvion.com/)

<!-- Stack Tecnológico Principales -->
[![Next.js](https://img.shields.io/badge/Next.js-v16.2.0-000000?style=flat&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-v19.2.4-149ECA?style=flat&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-v5.9.3-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

<!-- Herramientas y CMS -->
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.2-0EA5E9?style=flat&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![WordPress](https://img.shields.io/badge/WordPress-Headless_CMS-21759B?style=flat&logo=wordpress&logoColor=white)](https://cms.grupocampana.ec/)

Plataforma web corporativa de **Grupo Campana**, diseñada y desarrollada por **[Stuvvion](https://www.stuvvion.com)** utilizando una arquitectura **Headless CMS** moderna que combina la potencia de **Next.js 16 (App Router)** en el frontend y **WordPress** con **Advanced Custom Fields (ACF)** en el backend.

El sitio ofrece una experiencia inmersiva, elegante y fluida para presentar los proyectos inmobiliarios, activos estratégicos, biografía corporativa, valores e historia de la compañía en Ecuador e internacionalmente.

---

## 🌐 Enlaces Rápidos

- **Sitio Web en Producción**: [https://grupocampana.ec](https://grupocampana.ec)
- **CMS Backend**: [https://cms.grupocampana.ec](https://cms.grupocampana.ec)
- **Desarrollado por**: [Stuvvion](https://stuvvion.com)

---

## ✨ Características Principales

- **Arquitectura Headless CMS**: Separación limpia entre la capa de gestión de contenidos (WordPress) y la capa de presentación de alto rendimiento (Next.js App Router).
- **Multilingüe Nativo (i18n)**: Soporte completo para español (`/es`) e inglés (`/en`) mediante rutas dinámicas `[lang]`.
- **Renderizado Dinámico de Secciones (`BlocksRenderer`)**: Mapeo automático de layouts de ACF Flexible Content a componentes modulares de React.
- **Experiencia Visual Inmersiva & Animaciones**: Integración con **GSAP 3**, **Framer Motion** y **Three.js** (`@react-three/fiber`) para transiciones suaves, scroll interactivo y efectos tridimensionales.
- **Optimización Multimedia de Alto Nivel**: Integración con **Mux Player**, **Vimeo** y reproductores de video optimizados para dispositivos móviles y de escritorio.
- **Formulario de Contacto Interactivo**: Validación estricta en frontend con **React Hook Form** + **Zod** y envío dinámico de correos a través de **Resend**.
- **Generación Dinámica de OpenGraph (`next/og`)**: Tarjetas de vista previa para redes sociales (OpenGraph & Twitter cards) de 1200x630 px autogeneradas por código en tiempo real con datos de WordPress ACF sin necesidad de subir imágenes estáticas.
- **Máximo Rendimiento Web (CWV)**: Formatos de imagen de última generación (AVIF/WebP), `minimumCacheTTL`, custom image loader y compilación en modo `standalone`.

---

## 🛠️ Stack Tecnológico

### Frontend & Core
- **Framework**: [Next.js 16.2](https://nextjs.org/) (App Router + Turbopack)
- **Librería de UI**: [React 19.2](https://react.dev/)
- **Lenguaje**: [TypeScript 5.9](https://www.typescriptlang.org/)
- **Estilos**: [Tailwind CSS v4](https://tailwindcss.com/), PostCSS, Styled Components

### CMS & Datos
- **Backend Headless**: WordPress REST API / ACF (Advanced Custom Fields)
- **Revalidación**: Incremental Static Regeneration (ISR) / Webhooks de WordPress

### UI, Componentes & Animaciones
- **Componentes UI**: Radix UI (Accordion, Dialog, Dropdown Menu, Navigation Menu, Scroll Area, Select)
- **Iconos**: Lucide React
- **Animaciones & Motion**: GSAP 3.14, Motion (Framer Motion), Swiper 12
- **Gráficos 3D**: Three.js, `@react-three/fiber`

### Formulario & Integraciones
- **Formularios**: React Hook Form, `@hookform/resolvers`, Zod
- **Emailing**: Resend API
- **Video Players**: `@mux/mux-player-react`, `@vimeo/player`, `react-player`
- **Analytics**: `@vercel/analytics`

---

## 📂 Estructura del Proyecto

```text
grupocampana/
├── app/                      # Rutas principales (Next.js App Router)
│   ├── [lang]/               # Enrutamiento i18n (/es, /en)
│   │   ├── [slug]/           # Páginas dinámicas desde WordPress
│   │   ├── posts/            # Sección de blog, noticias y artículos
│   │   ├── layout.tsx        # Layout global con proveedores y navegación
│   │   └── page.tsx          # Página de inicio dinámicamente renderizada
│   ├── api/                  # Endpoints de API locales (ej. webhook revalidación)
│   ├── globals.css           # Estilos globales y tokens de Tailwind CSS v4
│   └── sitemap.ts            # Generación dinámica del sitemap SEO
├── components/               # Componentes modulares de React
│   ├── about/                # Sección Sobre Nosotros
│   ├── activos/              # Activos Estratégicos del Grupo
│   ├── biography/            # Biografía corporativa y directiva
│   ├── contact/              # Formulario de contacto integrado con Resend
│   ├── faqs/                 # Preguntas frecuentes en acordeón
│   ├── hero/                 # Hero slider interactivo con video/imágenes
│   ├── investment/           # Sección de oportunidades de inversión
│   ├── nav/                  # Menú de navegación principal y footer
│   ├── our-values/           # Valores corporativos
│   ├── projects/             # Portafolio y desarrollos inmobiliarios
│   ├── story/                # Línea de tiempo e historia de la empresa
│   ├── ui/                   # Componentes base reutilizables (Radix UI)
│   └── craft.tsx             # Layout wrappers y contenedores estructurales
├── lib/                      # Configuración y utilidades de backend/CMS
│   ├── wordpress.ts          # Funciones de consulta a la API de WordPress
│   ├── wordpress.d.ts        # Definición de tipos TypeScript para ACF / WP API
│   ├── image-loader.ts       # Cargador personalizado de imágenes
│   └── utils.ts              # Utilidades auxiliares (clsx, tailwind-merge)
├── menu.config.ts            # Configuración de URLs y slugs base del CMS
├── next.config.ts            # Configuración de Next.js (patrones de imágenes, standalone, etc.)
├── site.config.ts            # Metadatos base del sitio
└── public/                   # Recursos estáticos (Logos, imágenes, favicons)
```

---

## ⚙️ Configuración del Entorno (`.env`)

Crea un archivo `.env.local` o `.env` en la raíz del proyecto basándote en `.env.example`:

```env
# URL de la instancia de WordPress Headless
WORDPRESS_URL="https://cms.grupocampana.ec"
WORDPRESS_HOSTNAME="cms.grupocampana.ec"

# Clave secreta para la revalidación por webhook desde WordPress
WORDPRESS_WEBHOOK_SECRET="tu-clave-secreta-webhook"

# Clave de API para el servicio de envío de correo (Contacto)
RESEND_API_KEY="re_123456789..."
```

---

## 🚀 Instalación y Desarrollo Local

### Requisitos Previos

- **Node.js**: v18.17.0 o superior (recomendado v20+)
- **npm** / **yarn** / **pnpm**

### Pasos de Ejecución

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/zxstudio-llc/campana.git
   cd grupocampana
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Configurar el archivo de entorno:**
   ```bash
   cp .env.example .env.local
   # Edita .env.local con las variables correspondientes
   ```

4. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

   El sitio estará disponible en [http://localhost:3000](http://localhost:3000).

---

## 📜 Scripts Disponibles

En el archivo `package.json` se definen los siguientes comandos:

- **`npm run dev`**: Inicia el servidor de desarrollo con Next.js Turbopack.
- **`npm run build`**: Compila la aplicación optimizada para producción en modo `standalone`.
- **`npm run start`**: Inicia el servidor de producción compilado.
- **`npm run lint`**: Ejecuta ESLint para verificar estándares de código.

---

## 🧱 Arquitectura de Secciones (`BlocksRenderer`)

El sistema utiliza un renderizador dinámico de bloques en `app/[lang]/page.tsx` que consulta las secciones configuradas en WordPress mediante ACF Flexible Content (`page_sections`):

| Diseño ACF (`acf_fc_layout`) | Componente React | Descripción |
| :--- | :--- | :--- |
| `hero` | `<Hero />` | Cabecera principal con slider de imágenes o video. |
| `about` | `<AboutUsSection />` | Información institucional de la empresa. |
| `biography` | `<BiographyCompanySection />` | Biografía ejecutiva y trayectoria empresarial. |
| `activos` | `<ActivosSection />` | Portafolio de activos y unidades estratégicas. |
| `our_values` | `<OurValueSection />` | Pilares y valores fundamentales. |
| `projects` | `<ProjectsCardsSection />` | Muestra de proyectos desarrollados. |
| `timelines` | `<StoryTimelineSection />` | Hitos clave de la trayectoria del grupo. |
| `investment` | `<InvestmentSection />` | Propuesta de valor e inversiones con llamado a la acción. |
| `faqs` | `<FAQSection />` | Sección interactiva de preguntas y respuestas. |
| `contact` | `<ContactPageSection />` | Formulario de contacto institucional. |

---

## 🚢 Despliegue

La aplicación está configurada con `output: "standalone"` en `next.config.ts`, lo que optimiza significativamente la imagen resultante para despliegues en contenedores Docker, **Railway**, **Vercel** o servidores de infraestructura propia.

### Despliegue en Railway
El repositorio incluye archivos de configuración preparados (`railway.toml` / `railway.json`):
- **Build Command**: `npm run build`
- **Start Command**: `npm run start`

## 💻 Desarrollado por

Este proyecto fue diseñado y desarrollado por **[Stuvvion](https://www.stuvvion.com/)** — Estudio y agencia de desarrollo de software, productos digitales y soluciones tecnológicas de alto rendimiento.

---

## 📄 Licencia

Este proyecto es de propiedad privada de **Grupo Campana**. Todos los derechos reservados.

© 2026 Grupo Campana. [https://grupocampana.ec](https://grupocampana.ec) - Desarrollado por [Stuvvion](https://www.stuvvion.com).