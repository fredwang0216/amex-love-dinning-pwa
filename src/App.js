import React, { useEffect, useRef, useState } from 'react';
import Filter from './Filter';

const categories = ["All", "Asian", "Western", "International", "Contemporary"];

const App = () => {
  const mapRef = useRef(null);
  const [locations, setLocations] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Asian');

  // Fetch locations from the JSON file
  useEffect(() => {
    fetch('/locations.json')
      .then(response => response.json())
      .then(data => {
        const formattedLocations = data.map(location => ({
          name: location.name,
          position: {
            lat: location.geometry.location.lat,
            lng: location.geometry.location.lng,
          },
          category: location["Type in AMEX Website"],
        }));
        setLocations(formattedLocations);
        setFilteredLocations(formattedLocations);
      })
      .catch(error => console.error('Error fetching locations:', error));
  }, []);

  // Update filtered locations based on selected category
  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredLocations(locations);
    } else {
      setFilteredLocations(locations.filter(location => location.category === selectedCategory));
    }
  }, [selectedCategory, locations]);

  // Initialize the map and markers
  useEffect(() => {
    if (window.google && window.google.maps) {
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: 1.290270, lng: 103.851959 },
        zoom: 12,
      });

      filteredLocations.forEach(location => {
        new window.google.maps.Marker({
          position: location.position,
          map: map,
          title: location.name,
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            fillColor: '#006FCF',
            fillOpacity: 1,
            strokeWeight: 1,
            scale: 9,
          },
        });
      });
    }
  }, [filteredLocations]);

  return (
    <div>
      <h1>AMEX Love Dinning</h1>
      <Filter 
        categories={categories} 
        selectedCategory={selectedCategory} 
        onSelectCategory={setSelectedCategory} 
      />
      <div ref={mapRef} style={{ width: '100%', height: '500px' }}></div>
    </div>
  );
};

export default App;
