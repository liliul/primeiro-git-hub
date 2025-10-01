import { useState } from "react";

export function Tooltip({ text, children }) {
  const [visible, setVisible] = useState(false);

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div className="absolute w-52 h-auto top-6  mb-2 px-2 py-1 text-sm text-white bg-black rounded shadow-lg">
          {text}
        </div>
      )}
    </div>
  );
}
