import React, { useRef, useCallback, useState } from 'react';
import {
  MapContainer,
  TileLayer,
  FeatureGroup,
} from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import { useStore } from '../store';
import L from 'leaflet';
import { X } from 'lucide-react';

interface TerritoryDrawerProps {
  onClose: () => void;
  onCoordinatesSelected: (coordinates: Array<[number, number]>) => void;
}

export default function TerritoryDrawer({ onClose, onCoordinatesSelected }: TerritoryDrawerProps) {
  const featureGroupRef = useRef<L.FeatureGroup>(null);

  const handleCreated = useCallback((e: any) => {
    const { layer } = e;
    if (!layer) return;

    const coords = layer.getLatLngs()[0]?.map((l: any) => [l.lat, l.lng]) || [];
    if (coords.length > 0) {
      onCoordinatesSelected(coords);
      onClose();
    }

    // Remove the drawn layer after capturing the coordinates
    featureGroupRef.current?.removeLayer(layer);
  }, [onCoordinatesSelected, onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Draw Territory</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="h-96 relative">
          <MapContainer
            center={[39.8283, -98.5795]}
            zoom={4}
            className="w-full h-full"
          >
            <TileLayer
              attribution='&copy; OpenStreetMap contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <FeatureGroup ref={featureGroupRef}>
              <EditControl
                position="topright"
                onCreated={handleCreated}
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
            </FeatureGroup>
          </MapContainer>
        </div>

        <div className="mt-4 text-sm text-gray-600">
          Use the drawing tools to create your territory shape. Click points to create a polygon or use the rectangle tool.
        </div>
      </div>
    </div>
  );
}