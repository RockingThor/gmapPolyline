import { useState, useEffect, useMemo } from "react";
import { GoogleMap, useJsApiLoader, Polyline } from "@react-google-maps/api";
import data from "../constants/1000points.json";

const GoogleMapPolyline = () => {
  const [path, setPath] = useState([]);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "",
  });

  const parsedData = useMemo(() => {
    return data
      .filter((item) => item.loc)
      .map((item) => ({
        location: {
          lat: item.loc.coordinates[0],
          lng: item.loc.coordinates[1],
        },
        stopover: true,
      }));
  }, [data]);

  const pathData = useMemo(() => {
    return parsedData.map((item) => item.location);
  }, [parsedData]);

  useEffect(() => {
    setPath(pathData);
  }, [pathData]);

  return isLoaded ? (
    <div>
      <div style={{ width: "60%" }}>
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "400px" }}
          center={{ lat: 40.4093, lng: 49.8671 }}
          zoom={10}
        >
          <Polyline
            path={path}
            options={{
              strokeColor: "#FF0000",
              strokeOpacity: 1,
              strokeWeight: 2,
            }}
          />
        </GoogleMap>
      </div>
    </div>
  ) : null;
};

export default GoogleMapPolyline;
