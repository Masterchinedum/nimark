// Color Swatch Component - Dynamically generates CSS classes
// Note: Dynamic color display requires runtime CSS generation as colors come from database
/* eslint-disable-next-line @microsoft/sdl/no-inline-styles */
import React from 'react';

interface ColorSwatchProps {
  color: string;
  name: string;
  size?: 'sm' | 'md';
}

// Convert hex color to a safe class name
const colorToClassName = (color: string): string => {
  return `color-${color.replace('#', 'hex-').replace(/[^a-zA-Z0-9-]/g, '')}`;
};

export const ColorSwatch: React.FC<ColorSwatchProps> = ({ color, name, size = 'sm' }) => {
  const sizeClass = size === 'sm' ? 'w-4 h-4' : 'w-4 h-4 mr-2';
  const colorClass = colorToClassName(color);

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `.${colorClass} { background-color: ${color} !important; }`
      }} />
      <span
        className={`${sizeClass} ${colorClass} rounded-full border inline-block`}
        data-color={color}
        aria-label={`Color: ${name}`}
        title={name}
      />
    </>
  );
};
