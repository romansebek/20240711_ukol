import React, {useEffect, useState} from 'react';
import SensorList from './components/SensorList';
import MapComponent from './components/MapComponent';
import 'leaflet/dist/leaflet.css';
import axios from "axios";
import {Sensor} from "./types/Sensor";

const App: React.FC = () => {
    const [sensors, setSensors] = useState<Sensor[]>([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/sensors`).then(response => {
            setSensors(response.data);
        });
    }, []);

  return (
      <div>
        <h1>DMA Monitoring Application</h1>
        <SensorList sensors={sensors}/>
        <MapComponent sensors={sensors}/>
      </div>
  );
};

export default App;