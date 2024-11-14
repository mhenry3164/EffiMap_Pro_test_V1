import React from 'react';
import { Download, Upload, Save } from 'lucide-react';
import { useStore } from '../store';

export default function DrawingToolbar() {
  const { territories, importTerritories, exportTerritories } = useStore();

  const handleExport = () => {
    const data = JSON.stringify(territories, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'territories.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const territories = JSON.parse(e.target?.result as string);
          importTerritories(territories);
        } catch (error) {
          console.error('Failed to parse territories:', error);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="absolute bottom-8 right-8 z-[1000]">
      <div className="bg-white rounded-lg shadow-lg flex flex-col">
        <button
          onClick={handleExport}
          className="flex items-center space-x-2 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 rounded-t-lg transition-colors"
          title="Export Territories"
        >
          <Download size={18} />
          <span>Export</span>
        </button>
        
        <div className="w-full h-px bg-gray-200" />
        
        <label className="flex items-center space-x-2 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 rounded-b-lg cursor-pointer transition-colors"
               title="Import Territories">
          <Upload size={18} />
          <span>Import</span>
          <input
            type="file"
            accept=".json"
            onChange={handleImport}
            className="hidden"
          />
        </label>
      </div>
    </div>
  );
}