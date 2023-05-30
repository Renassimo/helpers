import { createContext, Dispatch, SetStateAction } from 'react';
import { SpottedPlaneProviderData } from '@/types/spotting';

const SpottingContext = createContext<{
  spottedPlanes: SpottedPlaneProviderData[];
  removeSpottedPlane: (id: string) => void;
  updateDescription: (id: string, description: string) => void;
  updateHashtags: (id: string, hashtags: string) => void;
  updateNewFirstFlight: (id: string, newFirstFlight: string) => void;
  selectedIds: string[];
  addSelectedId: (id: string) => void;
  removeSelectedIds: (ids: string[]) => void;
  generateDescription: (id: string) => {
    text: string;
    lines: (string | false | null)[][];
  };
  generateHashtags: (id: string) => string;
  clearDescription: (id: string) => void;
  clearHashtags: (id: string) => void;
  groupDescription: string;
  groupHashtags: string;
  groupName: string;
  setGroupDescription: Dispatch<SetStateAction<string>>;
  setGroupHashtags: Dispatch<SetStateAction<string>>;
  setGroupName: Dispatch<SetStateAction<string>>;
  generateGroupDescriptionAndHashtags: () => void;
  clearGroupData: () => void;
  clearSelectedIds: () => void;
}>({
  spottedPlanes: [],
  removeSpottedPlane: () => {},
  updateDescription: () => {},
  updateHashtags: () => {},
  updateNewFirstFlight: () => {},
  selectedIds: [],
  addSelectedId: () => {},
  removeSelectedIds: () => {},
  generateDescription: () => ({ text: '', lines: [] }),
  generateHashtags: () => '',
  clearDescription: () => {},
  clearHashtags: () => {},
  groupDescription: '',
  groupHashtags: '',
  groupName: '',
  setGroupDescription: () => {},
  setGroupHashtags: () => {},
  setGroupName: () => {},
  generateGroupDescriptionAndHashtags: () => {},
  clearGroupData: () => {},
  clearSelectedIds: () => {},
});

export default SpottingContext;
