import React, { createContext, useState } from "react";

const AlgorithmContext = createContext();

const AlgorithmProvider = ({children}) => {
    const [algorithm, setAlgorithm] = useState(['Depth-First Search', 'Breadth-First Search', 'Admissible Heuristics (A*)', 'Uniform-Cost Search', 'Greedy Best-First Search']);
    return (
        <AlgorithmContext.Provider value={algorithm}>
            {children}
        </AlgorithmContext.Provider>
    );
};

export { AlgorithmContext, AlgorithmProvider };