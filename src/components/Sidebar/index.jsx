import React from 'react';
import { Plus } from 'lucide-react';
import ThreadList from './ThreadList';

const Sidebar = ({ threads, currentThread, onSelect, onNew, onDelete }) => {
  return (
    <div className="w-64 bg-gray-800 p-4 flex flex-col">
      <button
        onClick={onNew}
        className="flex items-center gap-2 text-white bg-gray-700 rounded p-2 mb-4 hover:bg-gray-600"
      >
        <Plus size={18} />
        New Chat
      </button>
      <ThreadList
        threads={threads}
        currentThread={currentThread}
        onSelect={onSelect}
        onDelete={onDelete}
      />
    </div>
  );
};

export default Sidebar;
