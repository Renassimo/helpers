import { createContext } from 'react';
import { SpottedPlaneProviderData } from '@/types/spotting';

const SpottingContext = createContext<{
  spottedPlanes: SpottedPlaneProviderData[];
  removeSpottedPlane: (id: string) => void;
  updateDescription: (id: string, description: string) => void;
  updateHashtags: (id: string, hashtags: string) => void;
  updateNewFirstFlight: (id: string, newFirstFlight: string) => void;
  updateGroupName: (id: string, groupName: string) => void;
  updateGroupDescription: (id: string, groupDescription: string) => void;
  updateGroupHashtags: (id: string, groupHashtags: string) => void;
  getUpdateFunctions: (id: string) => Record<string, (payload: string) => void>;
  filterPlanes: (ids: string[]) => void;
  selectedIds: string[];
  addSelectedId: (id: string) => void;
  removeSelectedIds: (ids: string[]) => void;
  generateDescription: (id: string) => void;
  generateHashtags: (id: string) => void;
  clearDescription: (id: string) => void;
  clearHashtags: (id: string) => void;
}>({
  spottedPlanes: [],
  removeSpottedPlane: () => {},
  updateDescription: () => {},
  updateHashtags: () => {},
  updateNewFirstFlight: () => {},
  updateGroupName: () => {},
  updateGroupDescription: () => {},
  updateGroupHashtags: () => {},
  getUpdateFunctions: () => ({
    updateDescription: () => {},
    updateHashtags: () => {},
    updateNewFirstFlight: () => {},
    updateGroupName: () => {},
    updateGroupDescription: () => {},
    updateGroupHashtags: () => {},
  }),
  filterPlanes: () => {},
  selectedIds: [],
  addSelectedId: () => {},
  removeSelectedIds: () => {},
  generateDescription: () => {},
  generateHashtags: () => {},
  clearDescription: () => {},
  clearHashtags: () => {},
});

export default SpottingContext;
