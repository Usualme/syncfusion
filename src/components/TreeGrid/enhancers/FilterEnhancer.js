import { useState } from 'react';
import { ContextMenu, Filter } from '@syncfusion/ej2-react-treegrid';
import { createEnhancer, mergeToArray, mergeToFunction } from './createEnhancer';

const FILTER_MODE_FILTER_BAR          = 'filter_mode_filter_bar';
const FILTER_MODE_FILTER_BAR_SELECTED = 'filter_mode_filter_bar__selected';
const FILTER_MODE_MENU                = 'filter_mode_menu';
const FILTER_MODE_MENU_SELECTED       = 'filter_mode_menu__selected';

const FILTER_BAR_IS_SELECTED_ITEMS = [
  FILTER_MODE_MENU,
  FILTER_MODE_FILTER_BAR_SELECTED
];
const MENU_IS_SELECTED_ITEMS = [
  FILTER_MODE_MENU_SELECTED,
  FILTER_MODE_FILTER_BAR
];
const ALL_ITEMS = [
  ...FILTER_BAR_IS_SELECTED_ITEMS,
  ...MENU_IS_SELECTED_ITEMS
];

export const FilterEnhancer = createEnhancer(({ contextMenuItems, contextMenuClick, contextMenuOpen }) => {
  const [filterMode, setFilterMode] = useState('Menu');

  const filterModeContextMenuClick = (e) => {
    switch (e.item.properties.id) {
      case FILTER_MODE_FILTER_BAR:
      case FILTER_MODE_FILTER_BAR_SELECTED:
        setFilterMode('FilterBar');
      break;
      case FILTER_MODE_MENU:
      case FILTER_MODE_MENU_SELECTED:
        setFilterMode('Menu');
      break;
      default:
        break;
    }
  };

  const filterModeContextMenuOpen = (e) => {
    const items = e?.items;
    const contextMenu = items && items[0] && items[0].controlParent;
    contextMenu.hideItems(ALL_ITEMS, true);

    if (!e.rowInfo.cell) {
      contextMenu.showItems(filterMode === 'Menu' ? MENU_IS_SELECTED_ITEMS : FILTER_BAR_IS_SELECTED_ITEMS, true);
    }
  };

  return {
    allowFiltering: true,
    filterSettings: { type: filterMode },
    contextMenuItems: mergeToArray(
      contextMenuItems,
      [
        {
          text: `Filter Mode: Menu`,
          id: FILTER_MODE_MENU,
          target: '.e-headercontent',
        },
        {
          text: `Filter Mode: Menu ✓`,
          id: FILTER_MODE_MENU_SELECTED,
          target: '.e-headercontent',
        },
        {
          text: `Filter Mode: Filter Bar`,
          id: FILTER_MODE_FILTER_BAR,
          target: '.e-headercontent',
        },
        {
          text: `Filter Mode: Filter Bar ✓`,
          id: FILTER_MODE_FILTER_BAR_SELECTED,
          target: '.e-headercontent',
        }
      ]
    ),
    contextMenuClick: mergeToFunction(contextMenuClick, filterModeContextMenuClick),
    contextMenuOpen:  mergeToFunction(contextMenuOpen, filterModeContextMenuOpen)
  };
}, [ContextMenu, Filter]);
