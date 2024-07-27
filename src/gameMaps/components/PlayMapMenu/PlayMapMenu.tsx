import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';

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
  } = usePlay();

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
          <Button onClick={() => console.log('New Category')}>
            Add category
          </Button>
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
              aria-label="add-item"
              onClick={(event) => {
                event.stopPropagation();
                setPointingCategoryId(category.id);
              }}
            >
              <AddIcon />
            </IconButton>
            <Checkbox checked={category.attributes.chosen} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
};

export default PlayMapMenu;
