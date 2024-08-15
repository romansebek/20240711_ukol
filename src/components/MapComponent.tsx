import React from "react";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  Polyline,
} from "react-leaflet";
import { Sensor } from "../types/Sensor";

interface MapComponentProps {
  sensors: Sensor[];
}

const MapComponent: React.FC<MapComponentProps> = ({ sensors }) => {
  const findSensorById = (id: number): Sensor | undefined => {
    return sensors.find((sensor) => sensor.id == id);
  };

  const checkTolerance = (mainSensor: Sensor) => {
    const slaveSensors = mainSensor.children
      ?.map((id) => findSensorById(id))
      .filter(Boolean) as Sensor[];
    const totalSlaveValues = slaveSensors.reduce(
      (sum, sensor) => sum + sensor.lastValue,
      0
    );
    const toleranceValue = (mainSensor.lastValue * 10) / 100;
    const isWithinTolerance =
      Math.abs(mainSensor.lastValue - totalSlaveValues) <= toleranceValue;

    return { totalSlaveValues, isWithinTolerance };
  };

  const SensorMarker: React.FC<{ sensor: Sensor }> = ({ sensor }) => {
    const isMainSensor = !sensor.parent;
    const color = isMainSensor ? "blue" : "green";
    const result = isMainSensor ? checkTolerance(sensor) : null;

    return (
      <CircleMarker
        center={[sensor.latitude, sensor.longitude]}
        radius={10}
        color={color}
        fillColor={color}
        fillOpacity={0.5}
      >
        <Popup>
          <div>
            <h3>{sensor.name}</h3>
            <p>
              Last Value: {sensor.lastValue} {sensor.unit}
            </p>
            <p>
              Last Value Time: {new Date(sensor.lastValueTime).toLocaleString()}
            </p>
            {isMainSensor && result && (
              <div>
                <p>
                  Total Slave Values: {result.totalSlaveValues} {sensor.unit}
                </p>
                <p>
                  Status:{" "}
                  {result.isWithinTolerance
                    ? "Within Tolerance"
                    : "Out of Tolerance"}
                </p>
              </div>
            )}
          </div>
        </Popup>
      </CircleMarker>
    );
  };

  const SensorPolyline: React.FC<{ parentSensor: Sensor }> = ({
    parentSensor,
  }) => {
    return (
      <>
        {parentSensor.children &&
          parentSensor.children.map((childId) => {
            const childSensor = findSensorById(childId);
            if (childSensor) {
              return (
                <Polyline
                  key={`${parentSensor.id}-${childId}`}
                  positions={[
                    [parentSensor.latitude, parentSensor.longitude],
                    [childSensor.latitude, childSensor.longitude],
                  ]}
                  color="blue"
                />
              );
            }
            return null;
          })}
      </>
    );
  };

  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={13}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {sensors.map((sensor) => (
        <React.Fragment key={sensor.id}>
          <SensorMarker sensor={sensor} />
          {!sensor.parent && <SensorPolyline parentSensor={sensor} />}
        </React.Fragment>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
