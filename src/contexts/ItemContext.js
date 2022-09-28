import React, {createContext, useContext} from 'react';

const ItemContext = createContext({
    item: null,
    setItem: () => {},
});

export function useItem() {
    const context = useContext(ItemContext);
    if (context === undefined) {
        throw new Error('useItem must be used within ItemProvider');
    }

    return context;
}

export function ItemProvider({children, ...props}) {
    return (
        <ItemContext.Provider {...props}>{children}</ItemContext.Provider>
    );
}