import React from 'react';

type IconProps = React.SVGProps<SVGSVGElement> & { title?: string };

export const Car: React.FC<IconProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <title>{props.title ?? 'Car'}</title>
    <rect x="1" y="6" width="22" height="10" rx="2" ry="2" />
    <circle cx="7.5" cy="17.5" r="1.5" />
    <circle cx="16.5" cy="17.5" r="1.5" />
  </svg>
);

export const Fuel: React.FC<IconProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <title>{props.title ?? 'Fuel'}</title>
    <path d="M3 7h10v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" />
    <path d="M16 3v4a1 1 0 0 0 1 1h1.5a1 1 0 0 1 1 1V16a1 1 0 0 1-1 1H18" />
    <path d="M20 7v2" />
  </svg>
);

export const Route: React.FC<IconProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <title>{props.title ?? 'Route'}</title>
    <path d="M21 10c0 6-9 11-9 11s-9-5-9-11a9 9 0 1 1 18 0z" />
    <circle cx="12" cy="10" r="2" />
  </svg>
);

export const Navigation: React.FC<IconProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <title>{props.title ?? 'Navigation'}</title>
    <polygon points="12 2 15 11 22 12 15 13 12 22 9 13 2 12 9 11 12 2" />
  </svg>
);

export default { Car, Fuel, Route, Navigation };
