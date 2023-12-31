import Page from "./components/Page";
import { BicycleProvider } from "./context/BicycleContext";
import { BicycleStatsProvider } from "./context/BicycleStatsContext";
function App() {
    return (
        <BicycleProvider>
            <BicycleStatsProvider>
                <Page />
            </BicycleStatsProvider>
        </BicycleProvider>
    );
}

export default App;
