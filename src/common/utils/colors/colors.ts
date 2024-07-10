import invert from 'invert-color';

declare global {
  interface Window {
    EyeDropper?: any;
  }
}

export const getInvertedBWColor = (color: string) => {
  try {
    return invert(color, true);
  } catch (error) {
    return '#000';
  }
};

export const onColorPick = async (
  callback: (clr: string) => void,
  errorCallback?: (err: unknown) => void
) => {
  try {
    if (typeof window !== 'undefined') {
      const eyeDropper = new window.EyeDropper();
      const color = await eyeDropper.open();
      callback(color.sRGBHex);
    }
  } catch (error: unknown) {
    errorCallback?.(error);
  }
};

export const isValidHex = (color: string): boolean => {
  if (!color || typeof color !== 'string') return false;

  // Validate hex values
  if (color.substring(0, 1) === '#') color = color.substring(1);
  else return false;

  switch (color.length) {
    case 3:
      return /^[0-9A-F]{3}$/i.test(color);
    case 6:
      return /^[0-9A-F]{6}$/i.test(color);
    default:
      return false;
  }
};
