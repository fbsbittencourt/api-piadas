import React from 'react';
import Snowfall from 'react-snowfall';
import { useTheme } from '../context/ThemeContext';

export function SnowfallController() {
    const { theme } = useTheme();

    return (
        <Snowfall
            // Muda a cor da neve baseada no tema: Branco no escuro, Cinza Azulado no claro
            color={theme === 'dark' ? '#ffffff' : '#94a3b8'}

            // Garante que a neve fique fixa na tela inteira (viewport), mesmo rolando a página
            style={{
                position: 'fixed',
                width: '100vw',
                height: '100vh',
                top: 0,
                left: 0,
                zIndex: 50, // Garante que fique acima de outros elementos se necessário, ou ajuste para baixo
                pointerEvents: 'none' // Importante para não bloquear cliques
            }}
        />
    );
}
