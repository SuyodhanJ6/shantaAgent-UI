import React from 'react';
import { Plus } from 'lucide-react';
import ThreadList from './ThreadList';

const Sidebar = ({ threads, currentThread, onSelect, onNew, onDelete }) => {
  return (
    <div className="flex h-full w-full flex-1 flex-col bg-gray-900 px-2">
      <div className="mt-2 mb-2 flex flex-row">
        <button
          onClick={onNew}
          className="flex px-3 py-2 items-center gap-3 w-full rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white text-sm mb-1 flex-shrink-0 border border-white/20"
        >
          <Plus size={16} />
          New chat
        </button>
      </div>
      <div className="flex-1 overflow-y-auto">
        <ThreadList
          threads={threads}
          currentThread={currentThread}
          onSelect={onSelect}
          onDelete={onDelete}
        />
      </div>
    </div>
  );
};

export default Sidebar;