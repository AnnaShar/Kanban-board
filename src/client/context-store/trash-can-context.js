import React, {useState} from 'react';

export const TrashCanContext = React.createContext(null);

export default ({children}) => {
    const [trashCanActive, setTrashCanActive] = useState(false);

    const showTrashCan = () => {
        setTrashCanActive(true);
    }

    const hideTrashCan = () => {
        setTrashCanActive(false)
    }

    const state = {
        trashCanActive,
        showTrashCan,
        hideTrashCan
    }

    return <TrashCanContext.Provider value={state}>{children}</TrashCanContext.Provider>;
}