const key =
  "pk.eyJ1Ijoicm9nZXJtODkiLCJhIjoiY2s0NjFqZGJqMGRvajNubnlnNm42dGVubSJ9.ASo82RBY0lyfkIE95ZMPCg";

// Options for map
const options = {
  lat: 43.8,
  lng: -120.55,
  zoom: 4,
  style: "mapbox://styles/mapbox/traffic-night-v2",
  pitch: 50
};

// Create an instance of MapboxGL
const mappa = new Mappa("MapboxGL", key);
let myMap;

let canvas;
let dams;

function setup () {
  canvas = createCanvas(800, 700);

  // Create a tile map and overlay the canvas on top.
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);

  // Load the data
  dams = loadTable("data/oregon_dams.csv", "csv", "header");

  // Only redraw the meteorites when the map change and not every frame.
  myMap.onChange(drawDams);

  fill(109, 255, 0);
  stroke(100);
}

// The draw loop is fully functional but we are not using it for now.
// function draw() {}

function drawDams() {
  // Clear the canvas
  clear();

  for (let i = 0; i < dams.getRowCount(); i += 1) {
    // Get the lat/lng of each meteorite
    const latitude = Number(dams.getString(i, "fpbLat"));
    const longitude = Number(dams.getString(i, "fpbLong"));

    // Transform lat/lng to pixel position
    const pos = myMap.latLngToPixel(latitude, longitude);
    // Get the size of the meteorite and map it. 60000000 is the mass of the largest
    // meteorite (https://en.wikipedia.org/wiki/Hoba_meteorite)
    // let size = dams.getString(i, 'mass (g)');
    size = map(20, 558, 60000000, 1, 25) + myMap.zoom();
    ellipse(pos.x, pos.y, size, size);
  }
}

function draw() {
}