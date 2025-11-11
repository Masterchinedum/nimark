// Color Display Component - No inline styles
import React from 'react';

interface ColorDisplayProps {
  color: string;
  name: string;
}

// Convert hex color to a safe class name
const colorToClassName = (color: string): string => {
  return `color-display-${color.replace('#', 'hex-').replace(/[^a-zA-Z0-9-]/g, '')}`;
};

export const ColorDisplay: React.FC<ColorDisplayProps> = ({ color, name }) => {
  const colorClass = colorToClassName(color);

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `.${colorClass} { background-color: ${color} !important; }`
      }} />
      <div
        className={`h-6 w-6 rounded-full border border-gray-600 ${colorClass}`}
        aria-label={`Color: ${name}`}
        title={name}
      />
    </>
  );
};
