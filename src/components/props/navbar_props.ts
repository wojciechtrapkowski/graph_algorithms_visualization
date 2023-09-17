export type NavbarProps = {
    isVisualizationRunning: boolean,
    setIsVisualizationRunning: React.Dispatch<React.SetStateAction<boolean>>,
    selectedAlgorithm: string,
    setSelectedAlgorithm: React.Dispatch<React.SetStateAction<string>>,
    selectedSpeed : number,
    setSelectedSpeed: React.Dispatch<React.SetStateAction<number>>,
    isWeightNodeClicked : boolean,
    updateWeightNodeClicked: () => void,
    algorithms: string[]
    handleVisualizeClick: () => void,
    handleResetButtonClick: () => void,
}
