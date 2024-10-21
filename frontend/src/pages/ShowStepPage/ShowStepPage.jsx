import React from "react";
import { useSearchParams } from "react-router-dom"; 
import './ShowStepPage.scss';
import UCS from './UCS/UCS';
import AStar from './AStar/AStar';
import DFS from './DFS/DFS';
import BFS from './BFS/BFS';
import GBFS from './GBFS/GBFS';
import PausePlayButton from "../../components/PausePlayButton/PausePlayButton";



const ShowStepPage = () => {
    const [searchParams] = useSearchParams();
    const algorithm = searchParams.get('algorithm');
    const renderAlgorithm = (algorithm) => {
        switch(algorithm) {
            case 'Uniform-Cost Search':
                return <UCS />;
            case 'Admissible Heuristics (A*)':
                return <AStar />;
            case 'Depth-First Search':
                return <DFS />;
            case 'Breadth-First Search':
                return <BFS />;
            case 'Greedy Best-First Search':
                return <GBFS />;
        }
    };

    return (
        <div>
            <div>
                <h1>Show-step Page</h1>
                <p>Algorithm: {algorithm}</p>
                <PausePlayButton/>
            </div>
            {renderAlgorithm(algorithm)}
        </div>
    );
};

export default ShowStepPage;