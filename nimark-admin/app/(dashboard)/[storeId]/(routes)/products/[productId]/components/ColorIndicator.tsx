import React from 'react';
import styles from './ColorIndicator.module.css';

interface ColorIndicatorProps {
  color: string;
  name: string;
  className?: string;
}

export const ColorIndicator: React.FC<ColorIndicatorProps> = ({ color, name, className }) => {
  return (
    <span
      className={className || styles.colorIndicator}
      style={{ ['--indicator-color' as string]: color } as React.CSSProperties}
      aria-label={`Color: ${name}`}
    />
  );
};
