import Page from "./components/Page";
import { BicycleProvider } from "./context/BicycleContext";
function App() {
    return (
        <BicycleProvider>
            <Page />
        </BicycleProvider>
    );
}

export default App;
