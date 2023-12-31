import { createContext, useContext, useReducer } from "react";

const BicycleContext = createContext();

const initialState = {
    bicycles: [],
    currentBicycle: null,
    isLoading: false,
    isLoadingError: false,
    isSaving: false,
    savingErrorMessage: "",
    isDeleting: false,
    isDeletingError: false,
};
function reducer(state, action) {
    switch (action.type) {
        case "bicycles/loading":
            return { ...state, isLoading: true };
        case "bicycles/loaded":
            return { ...state, isLoading: false, bicycles: action.payload.bicycles };
        case "bicycles/loadingFailed":
            return { ...state, isLoading: true, isError: true };
        case "bicycles/saving":
            return { ...state, isSaving: true, savingErrorMessage: "" };
        case "bicycles/saved":
            return { ...state, isSaving: false, bicycles: [...state.bicycles, action.payload.bicycle] };
        case "bicycles/savingFailed":
            return { ...state, isSaving: false, savingErrorMessage: action.payload.message };
        case "bicycles/statusChanged":
            return {
                ...state,
                bicycles: state.bicycles.map((el) => {
                    if (el._id === action.payload.id) {
                        return { ...el, status: action.payload.status };
                    }
                    return el;
                }),
            };
        case "bicycles/selected":
            const selectedBicycle = state.bicycles.find((el) => el._id === action.payload.id);
            return { ...state, currentBicycle: selectedBicycle === undefined ? null : selectedBicycle };
        case "bicycles/deselected":
            return { ...state, currentBicycle: null };
        case "bicycles/deleting":
            return { ...state, isDeleting: true, isDeletingError: false };
        case "bicycles/deleted":
            return { ...state, isDeleting: false, bicycles: state.bicycles.filter((el) => el._id !== action.payload.id) };
        case "bicycles/deletionFailed":
            return { ...state, isDeleting: false, isDeletingError: true };
        default:
            throw Error(`Unknown action type: ${action.type}`);
    }
}

export function BicycleProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <BicycleContext.Provider
            value={{
                bicycles: state.bicycles,
                currentBicycle: state.currentBicycle,
                isLoading: state.isLoading,
                isLoadingError: state.isLoadingError,
                isError: state.isError,
                isSaving: state.isSaving,
                savingErrorMessage: state.savingErrorMessage,
                dispatch,
            }}
        >
            {children}
        </BicycleContext.Provider>
    );
}

export function useBicycleContext() {
    const context = useContext(BicycleContext);
    if (context === undefined) {
        throw Error("BicycleContext used outside of BicycleProvider");
    }
    return context;
}
