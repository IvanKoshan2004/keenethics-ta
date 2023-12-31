import { createContext, useContext, useState } from "react";
import { API_BASE_URL } from "../constants";

const BicycleStatsContext = createContext();

export function BicycleStatsProvider({ children }) {
    const [totalBikes, setTotalBikes] = useState(0);
    const [availableBikes, setAvailableBikes] = useState(0);
    const [bookedBikes, setBookedBikes] = useState(0);
    const [averageBikeCost, setAverageBikeCost] = useState(0);
    async function fetchStats() {
        try {
            const res = await fetch(`${API_BASE_URL}/bicycle/stats`);
            const { success, data } = await res.json();
            if (!success) {
                throw Error();
            }
            setTotalBikes(data.totalBikes);
            setAvailableBikes(data.availableBikes);
            setBookedBikes(data.bookedBikes);
            setAverageBikeCost(data.averageBikeCost);
        } catch (err) {}
    }

    return (
        <BicycleStatsContext.Provider
            value={{
                totalBikes,
                availableBikes,
                bookedBikes,
                averageBikeCost,
                fetchStats,
            }}
        >
            {children}
        </BicycleStatsContext.Provider>
    );
}

export function useBicycleStatsContext() {
    const context = useContext(BicycleStatsContext);
    if (context === undefined) {
        throw Error("BicycleStatsContext used outside of BicycleStatsProvider");
    }
    return context;
}
