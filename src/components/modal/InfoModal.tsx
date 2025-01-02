import React from "react";

interface InfoModalProps {
  title: string;
  content: string;
  onclosed: () => void;
}

export const InfoModal: React.FC<InfoModalProps> = ({
  title,
  content,
  onclosed,
}) => {
  return (
    <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-40">
      <div className="max-w-[460px] rounded-md bg-white py-2 shadow-lg">
        <h2 className="mb-4 border-b border-gray-300 px-4 py-3 text-sm font-medium text-gray-900">
          {title}
        </h2>
        <div className="px-4 pb-4">
          <p className="text-sm font-medium text-gray-700">{content}</p>
        </div>
        <div className="flex items-center justify-between gap-4 border-t border-gray-300 px-4 pt-2">
          <div className="text-sm font-medium text-gray-700">Help Center</div>
          <button
            type="button"
            className="h-8 rounded-md bg-gray-700 px-2 text-sm text-white"
            onClick={onclosed}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
