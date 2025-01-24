// src/components/ErrorAlert.jsx
import React from 'react';
import { XCircle, X } from 'lucide-react';

const ErrorAlert = ({ message, onDismiss }) => {
  if (!message) return null;

  return (
    <div className="fixed top-4 right-4 w-96 bg-red-50 border-l-4 border-red-400 p-4 rounded shadow-lg">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <XCircle className="h-5 w-5 text-red-400" />
        </div>
        <div className="ml-3 flex-1">
          <p className="text-sm text-red-700">{message}</p>
        </div>
        <div className="ml-auto pl-3">
          <div className="-mx-1.5 -my-1.5">
            <button
              onClick={onDismiss}
              className="inline-flex rounded-md p-1.5 text-red-500 hover:bg-red-100 focus:outline-none"
            >
              <span className="sr-only">Dismiss</span>
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorAlert;