import { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import ReactLeafletKml from "react-leaflet-kml";
import xml2js from "xml2js";
import "leaflet/dist/leaflet.css";
import "./App.css"; // Import your CSS file

function App() {
  const [kml, setKml] = useState<any>("");
  const [kmlJson, setKmlJson] = useState<any>("");
  const [counter, setCounter] = useState(0);
  const [placemarks, setPlaceMarks] = useState<any>("");
  const [shownPlaceMarks, setShownPlaceMarks] = useState<any>("");
  const [checked, setChecked] = useState<any>({
    rt1: true,
    rt2: true,
    rt3: true,
    rt4: true,
    rt5: true,
    rt6: true,
    rt7: true,
    rt8: true,
    balai: true,
    rumahPakDukuh: true,
    tandaWilayah: true,
    biara: true,
    makedonia: true,
    masjidAS: true,
    masjidFat: true,
  });

  const updatePlacemarks = (newChecked: boolean, routeName: string) => {
    let newShownPlaceMarks;

    if (!newChecked) {
      newShownPlaceMarks = shownPlaceMarks.filter((placemark: any) => {
        return placemark.name[0] !== routeName;
      });
    } else {
      const routePlacemark = placemarks.find(
        (placemark: any) => placemark.name[0] === routeName
      );
      if (
        !shownPlaceMarks.some(
          (placemark: any) => placemark.name[0] === routeName
        ) &&
        routePlacemark
      ) {
        newShownPlaceMarks = [...shownPlaceMarks, routePlacemark];
      } else {
        return;
      }
    }

    if (newShownPlaceMarks) {
      const newKMLJSON = {
        ...kmlJson,
        kml: {
          ...kmlJson.kml,
          Document: [
            {
              ...kmlJson.kml.Document[0],
              Folder: [
                {
                  ...kmlJson.kml.Document[0].Folder[0],
                  Placemark: newShownPlaceMarks,
                },
              ],
            },
          ],
        },
      };
      const builder = new xml2js.Builder();
      const xml = builder.buildObject(newKMLJSON);
      const parser = new DOMParser();
      const newKML = parser.parseFromString(xml, "text/xml");

      setKmlJson(newKMLJSON);
      setShownPlaceMarks(newShownPlaceMarks);
      setKml(newKML);
      setCounter((prevCounter) => prevCounter + 1);
    }
  };

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/dwikavindra/kadirojo2-kml/main/Kadirojo2.kml"
    )
      .then((res) => res.text())
      .then((kmlText) => {
        xml2js.parseString(kmlText, (err, result) => {
          if (err) {
            console.error("Error parsing XML:", err);
          } else {
            setPlaceMarks(result.kml.Document[0].Folder[0].Placemark);
            setShownPlaceMarks(result.kml.Document[0].Folder[0].Placemark);
            setKmlJson(result);
          }
        });
        const parser = new DOMParser();
        const kml = parser.parseFromString(kmlText, "text/xml");
        setKml(kml);
      });
  }, []);

  return (
    <div key={counter} className="app-container">
      <h1 className="title">Peta Digital Kadirojo 2</h1>
      <div className="filters-container">
        <div className="filter-group">
          <h3 className="filter-title">RT</h3>
          <div className="checkbox-group">
            <div className="checkbox-item">
              <input
                type="checkbox"
                checked={checked.rt1}
                onChange={(e) => {
                  const newChecked = e.target.checked;
                  updatePlacemarks(newChecked, "RT 01");
                  setChecked({ ...checked, rt1: newChecked });
                }}
              />
              <label>RT 1</label>
            </div>
            <div className="checkbox-item">
              <input
                type="checkbox"
                checked={checked.rt2}
                onChange={(e) => {
                  const newChecked = e.target.checked;
                  updatePlacemarks(newChecked, "RT 2");
                  setChecked({ ...checked, rt2: newChecked });
                }}
              />
              <label>RT 2</label>
            </div>
            <div className="checkbox-item">
              <input
                type="checkbox"
                checked={checked.rt3}
                onChange={(e) => {
                  const newChecked = e.target.checked;
                  updatePlacemarks(newChecked, "RT 03");
                  setChecked({ ...checked, rt3: newChecked });
                }}
              />
              <label>RT 3</label>
            </div>
            <div className="checkbox-item">
              <input
                type="checkbox"
                checked={checked.rt4}
                onChange={(e) => {
                  const newChecked = e.target.checked;
                  updatePlacemarks(newChecked, "RT04");
                  setChecked({ ...checked, rt4: newChecked });
                }}
              />
              <label>RT 4</label>
            </div>
            <div className="checkbox-item">
              <input
                type="checkbox"
                checked={checked.rt5}
                onChange={(e) => {
                  const newChecked = e.target.checked;
                  updatePlacemarks(newChecked, "RT 5");
                  setChecked({ ...checked, rt5: newChecked });
                }}
              />
              <label>RT 5</label>
            </div>
            <div className="checkbox-item">
              <input
                type="checkbox"
                checked={checked.rt6}
                onChange={(e) => {
                  const newChecked = e.target.checked;
                  updatePlacemarks(newChecked, "Rt 6");
                  setChecked({ ...checked, rt6: newChecked });
                }}
              />
              <label>RT 6</label>
            </div>
            <div className="checkbox-item">
              <input
                type="checkbox"
                checked={checked.rt7}
                onChange={(e) => {
                  const newChecked = e.target.checked;
                  updatePlacemarks(newChecked, "RT7");
                  setChecked({ ...checked, rt7: newChecked });
                }}
              />
              <label>RT 7</label>
            </div>
            <div className="checkbox-item">
              <input
                type="checkbox"
                checked={checked.rt8}
                onChange={(e) => {
                  const newChecked = e.target.checked;
                  updatePlacemarks(newChecked, "RT 8");
                  setChecked({ ...checked, rt8: newChecked });
                }}
              />
              <label>RT 8</label>
            </div>
          </div>
        </div>
        <div className="filter-group">
          <h3 className="filter-title">Tempat</h3>
          <div className="checkbox-group">
            <div className="checkbox-item">
              <input
                type="checkbox"
                checked={checked.masjidAS}
                onChange={(e) => {
                  const newChecked = e.target.checked;
                  updatePlacemarks(newChecked, "Masjid Al Ashari Al Hidayah");
                  setChecked({ ...checked, masjidAS: newChecked });
                }}
              />
              <label>Masjid Al Ashari Al Hidayah</label>
            </div>
            <div className="checkbox-item">
              <input
                type="checkbox"
                checked={checked.makedonia}
                onChange={(e) => {
                  const newChecked = e.target.checked;
                  updatePlacemarks(newChecked, "GKAI Makedonia");
                  setChecked({ ...checked, makedonia: newChecked });
                }}
              />
              <label>GKAI Makedonia</label>
            </div>
            <div className="checkbox-item">
              <input
                type="checkbox"
                checked={checked.biara}
                onChange={(e) => {
                  const newChecked = e.target.checked;
                  updatePlacemarks(newChecked, "Biara Susteran SPC Kadirojo");
                  setChecked({ ...checked, biara: newChecked });
                }}
              />
              <label>Biara Susteran SPC Kadirojo</label>
            </div>
            <div className="checkbox-item">
              <input
                type="checkbox"
                checked={checked.masjidFat}
                onChange={(e) => {
                  const newChecked = e.target.checked;
                  updatePlacemarks(newChecked, "Masjid Al Fattah");
                  setChecked({ ...checked, masjidFat: newChecked });
                }}
              />
              <label>Masjid Al Fattah</label>
            </div>
            <div className="checkbox-item">
              <input
                type="checkbox"
                checked={checked.balai}
                onChange={(e) => {
                  const newChecked = e.target.checked;
                  updatePlacemarks(newChecked, "Balai Padukuhan Kadirojo 2");
                  setChecked({ ...checked, balai: newChecked });
                }}
              />
              <label>Balai Padukuhan Kadirojo 2</label>
            </div>
            <div className="checkbox-item">
              <input
                type="checkbox"
                checked={checked.rumahPakDukuh}
                onChange={(e) => {
                  const newChecked = e.target.checked;
                  updatePlacemarks(newChecked, "Rumah Pak Dukuh Kadirojo 2");
                  setChecked({ ...checked, rumahPakDukuh: newChecked });
                }}
              />
              <label>Rumah Pak Dukuh Kadirojo 2</label>
            </div>
            <div className="checkbox-item">
              <input
                type="checkbox"
                checked={checked.tandaWilayah}
                onChange={(e) => {
                  const newChecked = e.target.checked;
                  updatePlacemarks(newChecked, "Tanda Wilayah");
                  setChecked({ ...checked, tandaWilayah: newChecked });
                }}
              />
              <label>Gapura Tanda Wilayah Kadirojo 2</label>
            </div>
          </div>
        </div>
      </div>
      <MapContainer
        className="map-container"
        zoom={15}
        z
        center={[-7.767533, 110.44855]}
        key={kml}
      >
        <TileLayer
          key={counter}
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {kml && <ReactLeafletKml kml={kml} />}
      </MapContainer>
    </div>
  );
}

export default App;
