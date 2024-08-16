import { MouseEvent } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import IconButton from '@mui/material/IconButton';

import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';

import CategoryFormModal from '@/gameMaps/components/CategoryFormModal';

import usePlayContext from '@/gameMaps/contexts/hooks/usePlayContext';

import { CategoryData } from '@/gameMaps/types';

const PlayMapMenu = () => {
  const {
    categoriesList,
    changeCategoryChoose,
    choseAllCategories,
    clearAllChosenCategories,
    setPointingCategoryId,
    pointingCategoryId,
    quitFromCreatingNewItem,
    game,
    updateSubmittedCategory,
    isCategoryEditOpen,
    setIsCategoryEditOpen,
    editingCategory,
    openCategoryCreating,
    openCategoryUpdating,
    relocatingItem,
    relocateItem,
    clearCategoryEditing,
  } = usePlayContext();
  const gameId = game?.id;

  const openCategoryModalForUpdating = (event: MouseEvent, id: string) => {
    event.stopPropagation();
    openCategoryUpdating(id);
  };

  const onFinish = (newData: CategoryData | null) => {
    updateSubmittedCategory(newData, editingCategory?.id);
  };

  return (
    <Box>
      <Box>
        {relocatingItem && (
          <Button onClick={() => relocateItem(null)}>
            Quit from relocating item
          </Button>
        )}
        {pointingCategoryId && (
          <Button onClick={quitFromCreatingNewItem}>
            Quit from creating new item
          </Button>
        )}
        {!pointingCategoryId && !relocatingItem && (
          <>
            <Button onClick={clearAllChosenCategories}>Hide all</Button>
            <Button onClick={choseAllCategories}>Choose all</Button>
            <Button onClick={openCategoryCreating}>Add category</Button>
          </>
        )}
      </Box>
      <List sx={{ maxHeight: 'calc(75vh - 52.5px)', overflow: 'auto' }}>
        {categoriesList.map((category) => (
          <ListItemButton
            key={category.id}
            aria-label="category"
            onClick={() =>
              changeCategoryChoose(category.id, !category.attributes.chosen)
            }
            disabled={
              !!pointingCategoryId && pointingCategoryId !== category.id
            }
          >
            <ListItemIcon>
              <LocationOnIcon style={{ color: category.attributes.color }} />
            </ListItemIcon>
            <ListItemText secondary={category.attributes.description}>
              {category.attributes.title} -{' '}
              {category.attributes.collectedItemsAmount ?? 0}/
              {category.attributes.foundItemsAmount ?? 0}/
              {category.attributes.itemsAmount}
            </ListItemText>
            <IconButton
              aria-label="add-category"
              onClick={(event) => {
                event.stopPropagation();
                setPointingCategoryId(category.id);
              }}
            >
              <AddIcon />
            </IconButton>
            <IconButton
              aria-label="edit-category"
              onClick={(event) => {
                event.stopPropagation();
                openCategoryModalForUpdating(event, category.id);
              }}
            >
              <EditIcon />
            </IconButton>
            <Checkbox checked={category.attributes.chosen} />
          </ListItemButton>
        ))}
      </List>
      {gameId && (
        <CategoryFormModal
          isModalOpen={isCategoryEditOpen}
          setIsModalOpen={setIsCategoryEditOpen}
          data={editingCategory}
          onFinish={onFinish}
          gameId={gameId}
          clearData={clearCategoryEditing}
        />
      )}
    </Box>
  );
};

export default PlayMapMenu;
