export const getMuiColor = (
  hasValue: boolean,
  valueIncluded: boolean
): [
  'primary' | 'success' | 'warning',
  'text.primary' | 'success.dark' | 'warning.dark'
] => {
  const colorOnChosen = valueIncluded ? 'success' : 'warning';
  const color = hasValue ? colorOnChosen : 'primary';
  const sxColors: {
    [key: string]: 'text.primary' | 'success.dark' | 'warning.dark';
  } = {
    primary: 'text.primary',
    success: 'success.dark',
    warning: 'warning.dark',
  };
  const sxColor: 'text.primary' | 'success.dark' | 'warning.dark' =
    sxColors[color];

  return [color, sxColor];
};
