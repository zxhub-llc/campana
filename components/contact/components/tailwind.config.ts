import { pixelBasedPreset, type TailwindConfig } from 'react-email';

export default {
    presets: [pixelBasedPreset],
    theme: {
        fontFamily: {
            amazon: ['Ember', 'Helvetica', 'Arial', 'sans-serif'],
            aws: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
        },
    },
} satisfies TailwindConfig;