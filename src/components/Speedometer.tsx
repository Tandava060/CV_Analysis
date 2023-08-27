import React from 'react';
import GaugeChart from 'react-gauge-chart'


const Speedometer: React.FC<{ percentage: number, id: string }> = ({ percentage, id }) => {
    return (
        <GaugeChart id={id}
            nrOfLevels={30}
            colors={["#FF0016", "#00CF45"]}
            arcWidth={0.2}
            percent={percentage / 100}
            textColor='#352A2A'
            style={{ width: "200px" }}
            animate
        />

    );
};

export default Speedometer;
