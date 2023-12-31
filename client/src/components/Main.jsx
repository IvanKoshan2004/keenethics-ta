import BicycleForm from "./BicycleForm";
import BicycleList from "./BicycleList";
import BicycleStats from "./BicycleStats";
import styles from "./Main.module.css";
import SectionContainer from "../ui/SectionContainer";
import VerticalDivider from "../ui/VerticalDivider";
import HorizontalDivider from "../ui/HorizontalDivider";
import { useBicycleContext } from "../context/BicycleContext";
import CurrentBicycleInfo from "./CurrentBicycleInfo";

function Main() {
    const { currentBicycle } = useBicycleContext();
    return (
        <div className={styles.mainContainer}>
            <SectionContainer flexGrow={1}>
                <BicycleList />
            </SectionContainer>
            <VerticalDivider />
            <SectionContainer maxWidth={"400px"} width={"40%"}>
                <BicycleForm />
                <HorizontalDivider offset={10} />
                <BicycleStats />
                {currentBicycle !== null && (
                    <>
                        <HorizontalDivider offset={10} />
                        <CurrentBicycleInfo />
                    </>
                )}
            </SectionContainer>
        </div>
    );
}

export default Main;
