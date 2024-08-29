const geoLocation = (
  callback: PositionCallback,
  errorCallback?: PositionErrorCallback,
  notSupportedCallback?: (message: string) => void,
  preCall?: () => void
) => {
  if ('geolocation' in navigator) {
    preCall?.();
    navigator.geolocation.getCurrentPosition(callback, errorCallback);
  } else {
    notSupportedCallback?.('Geolocation not supported');
  }
};

export default geoLocation;
