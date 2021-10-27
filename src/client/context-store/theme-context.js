import React from 'react';

export const themes = {
    red: {
        background: "linear-gradient(135deg, #cea4a4, transparent)"
    },
    blue: {
        background: "linear-gradient(135deg, #7c8feb, transparent)"
    },
    green: {
        background: "linear-gradient(135deg, #7cebbd, transparent)"
    }
}

export const ThemeContext = React.createContext(themes.blue);