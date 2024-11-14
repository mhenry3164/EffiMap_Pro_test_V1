import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { Branch } from '../types';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { useStore } from '../store';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

interface BranchFormProps {
  onClose: () => void;
  branch?: Branch;
}

function LocationMarker({
  position,
  setPosition,
}: {
  position: [number, number] | null;
  setPosition: React.Dispatch<React.SetStateAction<[number, number] | null>>;
}) {
  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
    },
  });

  return position ? <Marker position={position}></Marker> : null;
}

export default function BranchForm({ onClose, branch }: BranchFormProps) {
  const { addBranch, updateBranch } = useStore();

  const [name, setName] = useState(branch?.name || '');
  const [address, setAddress] = useState(branch?.address || '');
  const [contact, setContact] = useState(branch?.contact || '');
  const [position, setPosition] = useState<[number, number] | null>(
    branch?.coordinates || null
  );
  const [isGeocoding, setIsGeocoding] = useState(false);

  const handleGeocode = async () => {
    if (!address) return;
    setIsGeocoding(true);
    try {
      const response = await axios.get(
        'https://nominatim.openstreetmap.org/search',
        {
          params: {
            q: address,
            format: 'json',
          },
        }
      );
      if (response.data && response.data.length > 0) {
        const { lat, lon } = response.data[0];
        setPosition([parseFloat(lat), parseFloat(lon)]);
      } else {
        alert('Address not found');
      }
    } catch (error) {
      console.error('Geocoding error:', error);
      alert('Failed to geocode address');
    } finally {
      setIsGeocoding(false);
    }
  };

  const handleSubmit = () => {
    if (!name || !address || !position) {
      alert('Please fill in all fields and set a location on the map.');
      return;
    }

    // Prepare the branch data
    const branchData: Omit<Branch, 'id'> = {
      name,
      address,
      contact,
      coordinates: position as [number, number],
      createdAt: branch?.createdAt || new Date(),
      updatedAt: new Date(),
    };

    if (branch) {
      // Update existing branch
      updateBranch(branch.id, branchData);
    } else {
      // Add new branch
      addBranch(branchData);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-lg w-full">
        <h2 className="text-xl font-semibold mb-4">
          {branch ? 'Edit Branch' : 'Add Branch'}
        </h2>
        <div className="space-y-4">
          {/* Branch Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Branch Name
            </label>
            <input
              type="text"
              className="mt-1 block w-full border-gray-300 rounded-md"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              type="text"
              className="mt-1 block w-full border-gray-300 rounded-md"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <button
              type="button"
              onClick={handleGeocode}
              disabled={isGeocoding || !address}
              className={`mt-2 px-3 py-1 ${
                isGeocoding ? 'bg-gray-400' : 'bg-indigo-600'
              } text-white rounded-md`}
            >
              {isGeocoding ? 'Geocoding...' : 'Set Location from Address'}
            </button>
          </div>
          {/* Contact */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Contact
            </label>
            <input
              type="text"
              className="mt-1 block w-full border-gray-300 rounded-md"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
          </div>
          {/* Map */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location (Click on the map to set the location)
            </label>
            <MapContainer
              center={position || [51.505, -0.09]}
              zoom={13}
              style={{ height: '300px' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <LocationMarker position={position} setPosition={setPosition} />
            </MapContainer>
          </div>
        </div>
        {/* Buttons */}
        <div className="mt-6 flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
