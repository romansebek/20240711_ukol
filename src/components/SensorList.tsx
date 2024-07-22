import React from 'react';
import {Sensor} from "../types/Sensor";

interface SensorListProps {
    sensors: Sensor[]
}

const SensorList: React.FC<SensorListProps> = ({sensors}) => {

    return (
        <div>
            <h2>Available Sensors</h2>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Latitude</th>
                    <th>Longitude</th>
                    <th>Last Value</th>
                    <th>Last Value Time</th>
                    <th>Unit</th>
                </tr>
                </thead>
                <tbody>
                {sensors.map(sensor => (
                    <tr key={sensor.id}>
                        <td>{sensor.id}</td>
                        <td>{sensor.name}</td>
                        <td>{sensor.latitude}</td>
                        <td>{sensor.longitude}</td>
                        <td>{sensor.lastValue}</td>
                        <td>{new Date(sensor.lastValueTime).toLocaleString()}</td>
                        <td>{sensor.unit}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default SensorList;
