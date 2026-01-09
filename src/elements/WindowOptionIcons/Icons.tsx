import React from 'react';

interface IconProps {
  size?: number | string;
  color?: string;
  strokeWidth?: number;
  className?: string;
}

// 1. PLUS (+)
export const PlusIcon = ({
  size = 12,
  color = 'currentColor',
  strokeWidth = 2.5,
  className = '',
}: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    className={className}
  >
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

// 2. MINUS (-)
export const MinusIcon = ({
  size = 12,
  color = 'currentColor',
  strokeWidth = 2.5,
  className = '',
}: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    className={className}
  >
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

// 3. CLOSE (X)
export const CloseIcon = ({
  size = 12,
  color = 'currentColor',
  strokeWidth = 2.5,
  className = '',
}: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    className={className}
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

// 4. UNIFY / EXPAND (Two Triangles)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const UnfoldIcon = ({ size = 12, color = 'currentColor', className = '' }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2L18 8H6L12 2Z" />
    <path d="M12 22L6 16H18L12 22Z" />
  </svg>
);

// 5. FULLSCREEN (Small triangles + Tight Gap)
export const FullScreenIcon = ({
  size = 12,
  color = 'currentColor',
  className = '',
}: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} className={className}>
    {/* Top-right */}
    <path d="M19 5L19 16L8 5H19Z" />

    {/* Bottom-left */}
    <path d="M5 19L5 8L16 19H5Z" />
  </svg>
);

// 6. EXIT FULLSCREEN (Triangles pointing IN - Wider bases for larger appearance)
export const ExitFullScreenIcon = ({
  size = 12,
  color = 'currentColor',
  className = '',
}: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} className={className}>
    {/* Inward pointing Top Right - Tip at 13, wide base for "larger" feel */}
    <path d="M13 11V1L23 11H13Z" />
    {/* Inward pointing Bottom Left - Tip at 11, wide base for "larger" feel */}
    <path d="M11 13V23L1 13H11Z" />
  </svg>
);
