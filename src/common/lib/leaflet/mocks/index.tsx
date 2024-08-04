import { ReactNode } from 'react';

const MapContainer = ({ children }: { children: ReactNode }) => (
  <div data-testId="MapContainer">{children}</div>
);

const useMapEvents = () => ({});

const ImageOverlay = () => <div data-testId="ImageOverlay" />;

const Marker = ({ children }: { children: ReactNode }) => (
  <div data-testId="Marker">{children}</div>
);

const Popup = () => <div data-testId="Popup" />;

export { Marker, Popup, MapContainer, useMapEvents, ImageOverlay };
