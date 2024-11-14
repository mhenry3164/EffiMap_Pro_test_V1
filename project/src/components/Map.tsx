import React, { useState, useEffect, useRef } from 'react';
import {
  MapContainer,
  TileLayer,
  Polygon,
  Marker,
  Popup,
  FeatureGroup,
  ZoomControl,
  useMap,
} from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import { useStore } from '../store';
import MapControls from './MapControls';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';

// Fix Leaflet's default icon paths
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// MapController component to handle map interactions
function MapController({ selectedBranchId }: { selectedBranchId: string | null }) {
  const map = useMap();

  useEffect(() => {
    if (selectedBranchId) {
      const { branches } = useStore.getState();
      const branch = branches.find(b => b.id === selectedBranchId);
      if (branch?.coordinates) {
        map.setView(branch.coordinates, 12);
      }
    } else {
      map.setView([39.8283, -98.5795], 4);
    }
  }, [selectedBranchId, map]);

  return null;
}

export default function Map() {
  const {
    territories = [],
    branches = [],
    representatives = [],
    fetchBranches,
    fetchTerritories,
    fetchRepresentatives,
    addTerritory,
  } = useStore();

  const [loading, setLoading] = useState(true);
  const [selectedBranchId, setSelectedBranchId] = useState<string | null>(null);
  const [isControlsCollapsed, setIsControlsCollapsed] = useState(false);
  const featureGroupRef = useRef<L.FeatureGroup | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      await Promise.all([
        fetchBranches().catch(e => console.error('Error fetching branches:', e)),
        fetchTerritories().catch(e => console.error('Error fetching territories:', e)),
        fetchRepresentatives().catch(e => console.error('Error fetching representatives:', e))
      ]);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDrawCreated = async (e: any) => {
    const { layer } = e;
    if (!layer) return;

    const coordinates = layer.getLatLngs()[0].map((l: any) => [l.lat, l.lng]);
    
    // Store the coordinates in the territory store
    try {
      await addTerritory({
        name: 'New Territory',
        type: 'branch',
        coordinates,
        color: '#3B82F6',
        branchId: selectedBranchId || '',
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    } catch (error) {
      console.error('Error creating territory:', error);
    }

    // Remove the temporary drawing layer
    featureGroupRef.current?.removeLayer(layer);
  };

  const startDrawing = (shape: 'polygon' | 'rectangle') => {
    const drawControl = (featureGroupRef.current as any)?._map?._toolbars?.draw;
    if (drawControl) {
      const handler = shape === 'polygon' ? drawControl._modes.polygon.handler : drawControl._modes.rectangle.handler;
      handler.enable();
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
        <div className="text-lg text-gray-600">Loading map data...</div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[calc(100vh-4rem)]">
      <MapContainer
        center={[39.8283, -98.5795]}
        zoom={4}
        className="w-full h-full"
        zoomControl={false}
      >
        <ZoomControl position="topright" />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapController selectedBranchId={selectedBranchId} />

        <FeatureGroup ref={featureGroupRef}>
          <EditControl
            position="topright"
            onCreated={handleDrawCreated}
            draw={{
              rectangle: true,
              polygon: true,
              circle: false,
              marker: false,
              circlemarker: false,
              polyline: false,
            }}
            edit={{ edit: false, remove: false }}
          />

          {/* Render Territories */}
          {territories
            .filter(territory => !selectedBranchId || territory.branchId === selectedBranchId)
            .map(territory => (
              <Polygon
                key={territory.id}
                positions={territory.coordinates}
                pathOptions={{
                  color: territory.color || '#3B82F6',
                  weight: territory.type === 'branch' ? 3 : 2,
                  fillOpacity: territory.type === 'branch' ? 0.1 : 0.3,
                }}
              >
                <Popup>
                  <div className="p-2">
                    <h3 className="font-semibold">{territory.name}</h3>
                    <p className="text-sm text-gray-600">Type: {territory.type}</p>
                  </div>
                </Popup>
              </Polygon>
            ))}

          {/* Render Branch Markers */}
          {branches
            .filter(branch => !selectedBranchId || branch.id === selectedBranchId)
            .map(branch => (
              <Marker key={branch.id} position={branch.coordinates}>
                <Popup>
                  <div className="p-2">
                    <h3 className="font-semibold">{branch.name}</h3>
                    <p className="text-sm">{branch.address}</p>
                    {branch.contact && (
                      <p className="text-sm text-gray-600">{branch.contact}</p>
                    )}
                  </div>
                </Popup>
              </Marker>
            ))}

          {/* Render Representative Markers */}
          {representatives
            .filter(rep => !selectedBranchId || rep.branchId === selectedBranchId)
            .map(rep => (
              <Marker
                key={rep.id}
                position={rep.coordinates}
                icon={new L.Icon({
                  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
                  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
                  iconSize: [25, 41],
                  iconAnchor: [12, 41],
                  popupAnchor: [1, -34],
                  shadowSize: [41, 41],
                })}
              >
                <Popup>
                  <div className="p-2">
                    <h3 className="font-semibold">{rep.name}</h3>
                    <p className="text-sm">{rep.email}</p>
                    <p className="text-sm text-gray-600">{rep.phone}</p>
                  </div>
                </Popup>
              </Marker>
            ))}
        </FeatureGroup>
      </MapContainer>

      <MapControls
        selectedBranchId={selectedBranchId}
        setSelectedBranchId={setSelectedBranchId}
        isCollapsed={isControlsCollapsed}
        setIsCollapsed={setIsControlsCollapsed}
        branches={branches}
        startDrawing={startDrawing}
      />
    </div>
  );
}