// Create the map and center it on Duluth, Minnesota.
const map = L.map("map").setView([46.7867, -92.1005], 12);

// Add the OpenStreetMap basemap.
// This is the background map with streets, parks, and water.
// Add the Carto light basemap.
// This avoids the blocked OpenStreetMap tile issue in Codespaces.
L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
  maxZoom: 19,
  attribution: "&copy; OpenStreetMap contributors &copy; CARTO"
}).addTo(map);
// Attraction data for the Duluth points of interest map.
// Each attraction has a name, type, coordinates, description, website, and photo.
const attractions = [
  {
    name: "Canal Park",
    type: "Landmark",
    latitude: 46.7805,
    longitude: -92.0940,
    description: "Canal Park is a popular visitor area near Lake Superior with restaurants, shops, hotels, and views of the harbor.",
    website: "https://visitduluth.com/neighborhood/canal-park/",
    photo: "images/canalpark.jpg"
  },
  {
    name: "Aerial Lift Bridge",
    type: "Landmark",
    latitude: 46.7790,
    longitude: -92.0920,
    description: "The Aerial Lift Bridge is one of Duluth’s most recognizable landmarks and connects Canal Park to Park Point.",
    website: "https://visitduluth.com/listing/aerial-lift-bridge/",
    photo: "images/liftbridge.jpg"
  },
  {
    name: "Spirit Mountain Recreation Area",
    type: "Recreation",
    latitude: 46.7185,
    longitude: -92.2168,
    description: "Spirit Mountain offers skiing, snowboarding, mountain biking, and scenic views over Duluth and the St. Louis River.",
    website: "https://www.spiritmt.com/",
    photo: "images/spiritmnt.jpg"
  },
  {
    name: "Glensheen Mansion",
    type: "Historic Site",
    latitude: 46.8159,
    longitude: -92.0527,
    description: "Glensheen is a historic mansion on the shore of Lake Superior with tours, gardens, and views of the lake.",
    website: "https://glensheen.org/",
    photo: "images/glensheenmansion.jpg"
  },
  {
    name: "Great Lakes Aquarium",
    type: "Museum",
    latitude: 46.7798,
    longitude: -92.1008,
    description: "The Great Lakes Aquarium features freshwater exhibits and animals connected to Lake Superior and other aquatic ecosystems.",
    website: "https://glaquarium.org/",
    photo: "images/greatlakesaquarium.jpg"
  },
  {
    name: "Jay Cooke State Park",
    type: "Outdoor",
    latitude: 46.6539,
    longitude: -92.3647,
    description: "Jay Cooke State Park is known for hiking trails, forest scenery, and the swinging bridge over the St. Louis River.",
    website: "https://www.dnr.state.mn.us/state_parks/park.html?id=spk00187",
    photo: "images/jaycookestatepark.jpg"
  },
  {
    name: "North Shore Scenic Railroad",
    type: "Museum",
    latitude: 46.7812,
    longitude: -92.1042,
    description: "The North Shore Scenic Railroad offers train rides from downtown Duluth along Lake Superior.",
    website: "https://duluthtrains.com/",
    photo: "images/northshorerailroad.jpg"
  },
  {
    name: "Enger Tower",
    type: "Scenic View",
    latitude: 46.7769,
    longitude: -92.1244,
    description: "Enger Tower is a stone observation tower with panoramic views of Duluth, Lake Superior, and the harbor.",
    website: "https://visitduluth.com/listing/enger-tower/",
    photo: "images/engertower.jpg"
  },
  {
    name: "Lake Superior Zoo",
    type: "Outdoor",
    latitude: 46.7257,
    longitude: -92.1898,
    description: "The Lake Superior Zoo is a family-friendly attraction with animal exhibits, education programs, and outdoor spaces.",
    website: "https://lszooduluth.org/",
    photo: "images/lakesuperiorzoo.jpg"
  },
  {
    name: "Lake Superior Maritime Visitor Center",
    type: "Museum",
    latitude: 46.7788,
    longitude: -92.0915,
    description: "The Lake Superior Maritime Visitor Center shares Duluth’s shipping history and has exhibits near the canal.",
    website: "https://www.lre.usace.army.mil/Missions/Recreation/Duluth-Ship-Canal/",
    photo: "images/maritimemuseum.jpg"
  }
];

// Create custom icons for each attraction type.
// These are emoji-based icons, which keeps the project simple and avoids extra image files.
const icons = {
  "Landmark": L.divIcon({
    className: "custom-icon",
    html: "⭐",
    iconSize: [30, 30],
    iconAnchor: [15, 15]
  }),
  "Museum": L.divIcon({
    className: "custom-icon",
    html: "🏛️",
    iconSize: [30, 30],
    iconAnchor: [15, 15]
  }),
  "Historic Site": L.divIcon({
    className: "custom-icon",
    html: "🏠",
    iconSize: [30, 30],
    iconAnchor: [15, 15]
  }),
  "Scenic View": L.divIcon({
    className: "custom-icon",
    html: "🌅",
    iconSize: [30, 30],
    iconAnchor: [15, 15]
  }),
  "Outdoor": L.divIcon({
    className: "custom-icon",
    html: "🌲",
    iconSize: [30, 30],
    iconAnchor: [15, 15]
  }),
  "Recreation": L.divIcon({
    className: "custom-icon",
    html: "⛷️",
    iconSize: [30, 30],
    iconAnchor: [15, 15]
  })
};

// Loop through the attraction list and add each one to the map.
attractions.forEach(function(attraction) {
  const popupContent = `
    <img class="popup-image" src="${attraction.photo}" alt="${attraction.name}">
    <div class="popup-title">${attraction.name}</div>
    <div class="popup-type">${attraction.type}</div>
    <div class="popup-description">${attraction.description}</div>
    <p><a href="${attraction.website}" target="_blank">Visit website</a></p>
  `;

  L.marker([attraction.latitude, attraction.longitude], {
    icon: icons[attraction.type]
  })
    .addTo(map)
    .bindPopup(popupContent);
});
// Add a simple legend so users understand what each icon category means.
const legend = L.control({ position: "bottomright" });

legend.onAdd = function() {
  const div = L.DomUtil.create("div", "legend");

  div.innerHTML = `
    <h3>Attraction Types</h3>
    <p>⭐ Landmark</p>
    <p>🏛️ Museum</p>
    <p>🏠 Historic Site</p>
    <p>🌅 Scenic View</p>
    <p>🌲 Outdoor</p>
    <p>⛷️ Recreation</p>
  `;

  return div;
};

legend.addTo(map);