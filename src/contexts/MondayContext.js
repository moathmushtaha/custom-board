import React, {createContext, useContext} from 'react';

const MondayContext = createContext(null);

export function useMonday() {
    const context = useContext(MondayContext);
    if (context === undefined) {
        throw new Error('useMonday must be used within MondayProvider');
    }

    return context;
}

export function MondayProvider({children, ...props}) {
    return (
        <MondayContext.Provider {...props}>{children}</MondayContext.Provider>
    );
}