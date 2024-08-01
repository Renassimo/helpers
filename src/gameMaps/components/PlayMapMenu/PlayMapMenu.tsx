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

import usePlay from '@/gameMaps/hooks/usePlay';

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
  } = usePlay();
  const gameId = game?.id;

  const openCategoryModalForUpdating = (event: MouseEvent, id: string) => {
    event.stopPropagation();
    openCategoryUpdating(id);
  };

  return (
    <Box>
      {pointingCategoryId ? (
        <Box>
          <Button onClick={quitFromCreatingNewItem}>
            Quit from creating new item
          </Button>
        </Box>
      ) : (
        <Box>
          <Button onClick={clearAllChosenCategories}>Clear all</Button>
          <Button onClick={choseAllCategories}>Choose all</Button>
          <Button onClick={openCategoryCreating}>Add category</Button>
        </Box>
      )}
      <List>
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
          onFinish={updateSubmittedCategory}
          gameId={gameId}
        />
      )}
    </Box>
  );
};

export default PlayMapMenu;
