import React, { createContext, useContext, useState, ReactNode } from 'react';

type Theme = {
    background: string;
    color: string;
    primary: string;
    secondary: string;
};

type ThemeContextType = {
    theme: Theme;
    toggleTheme: () => void;
};

// Definindo os temas
const defaultTheme: Theme = {
    background: '#f5f5f5',//'#ffffff',
    color: '#000000',
    primary: '#98ff98', //'#007BFF',  // Cor primária
    secondary: '#003366' //'#6C757D', // Cor secundária
};

const darkTheme: Theme = {
    background: '#000000',
    color: '#ffffff',
    primary: '#1E90FF',  // Cor primária em modo escuro
    secondary: '#B0C4DE', // Cor secundária em modo escuro
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<Theme>(defaultTheme);

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === defaultTheme ? darkTheme : defaultTheme));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme deve ser usado dentro de um ThemeProvider');
    }
    return context;
};