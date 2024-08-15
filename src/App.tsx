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
    rt9: true,
    rt10: true,
    rt11: true,
    rt12: true,
    rt13: true,
    rt14: true,
    rt15: true,
    rt16: true,
    rumahDukuh: true,
    batasWilayah: false,
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
      "https://raw.githubusercontent.com/dwikavindra/peta-kadisoka/main/Kadisoka.kml"
    )
      .then((res) => res.text())
      .then((kmlText) => {
        xml2js.parseString(kmlText, (err, result) => {
          if (err) {
            console.error("Error parsing XML:", err);
          } else {
            console.log("Parsed json", JSON.stringify(result));
            setPlaceMarks(result.kml.Document[0].Folder[0].Placemark);
            setKmlJson(result);
            const newResult = result;
            const withoutKadisoka = result.kml.Document[0].Folder[0].Placemark;
            const placeMarkWithoutKadioska = withoutKadisoka.filter(
              (placemark: any) => placemark.name[0] !== "Kadisoka"
            );
            setShownPlaceMarks(placeMarkWithoutKadioska);
            newResult.kml.Document[0].Folder[0].Placemark =
              placeMarkWithoutKadioska;
            const builder = new xml2js.Builder();
            const xml = builder.buildObject(newResult);
            const parser = new DOMParser();
            const newKML = parser.parseFromString(xml, "text/xml");
            setKml(newKML);
          }
        });
      });
  }, []);

  return (
    <div key={counter} className="app-container">
      <h1 className="title">Peta Digital Kadisoka</h1>
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
                  updatePlacemarks(newChecked, "RT1");
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
                  updatePlacemarks(newChecked, "RT2");
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
                  updatePlacemarks(newChecked, "RT3");
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
                  updatePlacemarks(newChecked, "RT4");
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
                  updatePlacemarks(newChecked, "RT5");
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
                  updatePlacemarks(newChecked, "RT6");
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
                  updatePlacemarks(newChecked, "RT8");
                  setChecked({ ...checked, rt8: newChecked });
                }}
              />
              <label>RT 8</label>
            </div>
            <div className="checkbox-item">
              <input
                type="checkbox"
                checked={checked.rt9}
                onChange={(e) => {
                  const newChecked = e.target.checked;
                  updatePlacemarks(newChecked, "RT9");
                  setChecked({ ...checked, rt9: newChecked });
                }}
              />
              <label>RT 9</label>
            </div>
            <div className="checkbox-item">
              <input
                type="checkbox"
                checked={checked.rt10}
                onChange={(e) => {
                  const newChecked = e.target.checked;
                  updatePlacemarks(newChecked, "RT10");
                  setChecked({ ...checked, rt10: newChecked });
                }}
              />
              <label>RT 10</label>
            </div>
            <div className="checkbox-item">
              <input
                type="checkbox"
                checked={checked.rt11}
                onChange={(e) => {
                  const newChecked = e.target.checked;
                  updatePlacemarks(newChecked, "RT11");
                  setChecked({ ...checked, rt11: newChecked });
                }}
              />
              <label>RT 11</label>
            </div>
            <div className="checkbox-item">
              <input
                type="checkbox"
                checked={checked.rt12}
                onChange={(e) => {
                  const newChecked = e.target.checked;
                  updatePlacemarks(newChecked, "RT12");
                  setChecked({ ...checked, rt12: newChecked });
                }}
              />
              <label>RT 12</label>
            </div>
            <div className="checkbox-item">
              <input
                type="checkbox"
                checked={checked.rt13}
                onChange={(e) => {
                  const newChecked = e.target.checked;
                  updatePlacemarks(newChecked, "RT13");
                  setChecked({ ...checked, rt13: newChecked });
                }}
              />
              <label>RT 13</label>
            </div>

            <div className="checkbox-item">
              <input
                type="checkbox"
                checked={checked.rt14}
                onChange={(e) => {
                  const newChecked = e.target.checked;
                  updatePlacemarks(newChecked, "RT14");
                  setChecked({ ...checked, rt14: newChecked });
                }}
              />
              <label>RT 14</label>
            </div>
            <div className="checkbox-item">
              <input
                type="checkbox"
                checked={checked.rt15}
                onChange={(e) => {
                  const newChecked = e.target.checked;
                  updatePlacemarks(newChecked, "RT15");
                  setChecked({ ...checked, rt15: newChecked });
                }}
              />
              <label>RT 15</label>
            </div>
            <div className="checkbox-item">
              <input
                type="checkbox"
                checked={checked.rt16}
                onChange={(e) => {
                  const newChecked = e.target.checked;
                  updatePlacemarks(newChecked, "RT16");
                  setChecked({ ...checked, rt16: newChecked });
                }}
              />
              <label>RT 16</label>
            </div>
          </div>
        </div>
        <div className="filter-group">
          <h3 className="filter-title">Tempat</h3>
          <div className="checkbox-group">
            <div className="checkbox-item">
              <input
                type="checkbox"
                checked={checked.rumahDukuh}
                onChange={(e) => {
                  const newChecked = e.target.checked;
                  updatePlacemarks(newChecked, "Rumah Dukuh");
                  setChecked({ ...checked, rumahDukuh: newChecked });
                }}
              />
              <label>Rumah Dukuh Kadisoka</label>
            </div>
            <div className="checkbox-item">
              <input
                type="checkbox"
                checked={checked.batasWilayah}
                onChange={(e) => {
                  const newChecked = e.target.checked;
                  updatePlacemarks(newChecked, "Kadisoka");
                  setChecked({ ...checked, batasWilayah: newChecked });
                }}
              />
              <label>Batas Wilayah</label>
            </div>
          </div>
        </div>
      </div>
      <MapContainer
        className="map-container"
        key={kml}
        zoom={15}
        center={[-7.75317, 110.44477]}
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
