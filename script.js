// Initialize map
const map = L.map('map').setView([38.6270, -90.1994], 11);

// Add base tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Layer control
const overlays = {};
const layerControl = L.control.layers(null, overlays).addTo(map);

// Neighborhoods polygon layer
const neighborhoods = L.esri.featureLayer({
  url: 'https://services2.arcgis.com/bB9Y1bGKerz1PTl5/ArcGIS/rest/services/STL_Neighborhood/FeatureServer/0',
  style: function() {
    return {
      color: '#333',
      fillColor: '#3388ff',
      fillOpacity: 0.3,
      weight: 1
    };
  },
  onEachFeature: function(feature, layer) {
    const props = feature.properties;
    let popupContent = `<strong>Neighborhood:</strong> ${props.NHD_NAME}<br/>
                        <strong>Neighborhood Number:</strong> ${props.NHD_NUM}<br/>
                        <strong>Orientation Angle:</strong> ${props.ANGLE || 'N/A'}<br/>
                        <strong>Textual ID:</strong> ${props.NHD_NUMTXT || 'N/A'}<br/>
                        <strong>State Abbreviation:</strong> ${props.NHD_NUM_ST || 'N/A'}<br/>
                        <strong>Area (sq meters):</strong> ${props.Shape__Area || 'N/A'}<br/>
                        <strong>Perimeter (meters):</strong> ${props.Shape__Length || 'N/A'}`;
    layer.bindPopup(popupContent);
  }
}).addTo(map);

overlays["Neighborhoods"] = neighborhoods;
layerControl.addOverlay(neighborhoods, "Neighborhoods");

// Schools point layer with accurate popup
const schools = L.esri.featureLayer({
  url: 'https://services2.arcgis.com/yL7v93RXrxlqkeDx/arcgis/rest/services/STL_City_Schools_2021_Students_6_6_2022/FeatureServer/0',
  pointToLayer: function(feature, latlng) {
    return L.circleMarker(latlng, {
      radius: 6,
      fillColor: 'red',
      color: 'black',
      weight: 1,
      fillOpacity: 0.8
    });
  },
  onEachFeature: function(feature, layer) {
    const props = feature.properties;
    let popupContent = `<strong>School:</strong> ${props.SchoolName || 'Unknown'}<br/>
                        <strong>Address:</strong> ${props.Address || 'N/A'}<br/>
                        <strong>Level:</strong> ${props.School_Lev || 'N/A'}<br/>
                        <strong>Enrollment (K–12):</strong> ${props.Enroll_K12 || 'N/A'}<br/>
                        <strong>Free/Reduced Lunch %:</strong> ${props.FRL_Pct || 'N/A'}%<br/>
                        <strong>ELL %:</strong> ${props.ELL_K12_Pc || 'N/A'}%<br/>
                        <strong>IEP %:</strong> ${props.IEP_Pct || 'N/A'}%<br/>
                        <strong>Charter:</strong> ${props.Charter || 'N/A'}<br/>
                        <strong>Magnet:</strong> ${props.Magnet || 'N/A'}<br/>
                        <strong>Demographics:</strong> Asian ${props.Asian_Pct || 0}%, Black ${props.Black_Pct || 0}%, Hispanic ${props.Hispan_Pct || 0}%, White ${props.White_Pct || 0}%, Multi-Racial ${props.MultRac_Pc || 0}%`;
    layer.bindPopup(popupContent);
  }
}).addTo(map);

overlays["Schools"] = schools;
layerControl.addOverlay(schools, "Schools");