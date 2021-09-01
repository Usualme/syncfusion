import { ContextMenu, Edit, RowDD } from '@syncfusion/ej2-react-treegrid';
import { useRef } from 'react';
import { createEnhancer, mergeToArray } from './createEnhancer';

const COPY_COLUMNS          = 'copy_columns';
const CUT_COLUMNS           = 'cut_columns';
const PASTE_COLUMNS_ABOVE   = 'paste_columns_above';
const PASTE_COLUMNS_APPEND  = 'paste_columns_append';
const PASTE_COLUMNS_BELOW   = 'paste_columns_below';
const PASTE_COLUMNS_PREPEND = 'paste_columns_prepend';

export const EditRowsEnhancer = createEnhancer(({ treeGridRef, contextMenuItems }) => {
  const clipboard = useRef([]);

  const copyRows = (e) => {
    clipboard.current = treeGridRef.current.getSelectedRecords();
  };

  const cutRows = (e) => {
    const tg = treeGridRef.current;
    const cutRecords = tg.getSelectedRecords();
    const cutRecordIds = cutRecords.map(rec => rec.taskID);

    const filterEntries = (entries) => {
      const result = [];
      for (const entry of entries) {
        if (cutRecordIds.includes(entry.taskID)) { continue; }

        const copy = {...entry};
        if (copy.subtasks) {
          const subtasksCopy = filterEntries(copy.subtasks);
          if (subtasksCopy.length === 0) {
            delete copy.subtasks;
          } else {
            copy.subtasks = subtasksCopy;
          }
        }

        result.push(copy);
      }
      return result;
    };

    tg.dataSource = filterEntries(tg.dataSource);

    clipboard.current = cutRecords;
  };

  const pasteRows = (e) => {
    const tg = treeGridRef.current;
    const target = tg.getSelectedRecords()[0];
    if (!target) { return; }

    const targetId = target.taskID;

    const update = (list, index) => {
      switch (e.item.properties.id) {
        case PASTE_COLUMNS_ABOVE:
          list.splice(index, 0, ...clipboard.current);
          return list;
        case PASTE_COLUMNS_BELOW:
          list.splice(index + 1, 0, ...clipboard.current);
          return list;
        case PASTE_COLUMNS_PREPEND:
          list[index].subtasks = [...clipboard.current, ...(list[index].subtasks || [])];
          return list;
        case PASTE_COLUMNS_APPEND:
          list[index].subtasks = [...(list[index].subtasks || []), ...clipboard.current];
          return list;
        default:
          return [];
      }
    };

    const updateEntries = (entries) => {
      const result = [];

      for (let i = 0, len = entries.length; i < len; i++) {
        const entry = entries[i];

        if (entry.taskID === targetId) {
          return update(entries.slice(), i);
        }

        if (entry.subtasks) {
          const updatedSubtasks = updateEntries(entry.subtasks);

          if (updatedSubtasks.length !== entry.subtasks.length) {
            result.push({
              ...entry,
              subtasks: updatedSubtasks
            });
          }

          continue;
        }

        result.push(entry);
      }

      return result;
    };

    tg.dataSource = updateEntries(tg.dataSource);
  };

  const contextMenuClick = (e) => {
    switch (e.item.properties.id) {
      case COPY_COLUMNS:
        return copyRows(e);
      case CUT_COLUMNS:
        return cutRows(e);
      case PASTE_COLUMNS_ABOVE:
      case PASTE_COLUMNS_BELOW:
      case PASTE_COLUMNS_PREPEND:
      case PASTE_COLUMNS_APPEND:
        return pasteRows(e);
      default:
        return;
    }
  };

  return {
    allowRowDragAndDrop: true,
    selectionSettings: { type: 'Multiple', mode: 'Row', copyHierarchyMode: 'None' },
    copyHierarchyMode: 'None',
    editSettings: {
      allowAdding: true,
      allowDeleting: true,
      allowEditing: true,
      mode: 'Row'
    },
    contextMenuItems: mergeToArray(
      contextMenuItems,
      'AutoFit',
      'AutoFitAll',
      'SortAscending',
      'SortDescending',
      {
        text: 'Copy',
        target: '.e-content',
        id: COPY_COLUMNS
      },
      {
        text: 'Cut',
        target: '.e-content',
        id: CUT_COLUMNS
      },
      {
        text: 'Paste',
        target: '.e-content',
        items: [
          {
            text: 'Above',
            id: PASTE_COLUMNS_ABOVE
          },
          {
            text: 'Below',
            id: PASTE_COLUMNS_BELOW
          },
          {
            text: 'Prepend',
            id: PASTE_COLUMNS_PREPEND
          },
          {
            text: 'Append',
            id: PASTE_COLUMNS_APPEND
          },
        ]
      }
    ),
    contextMenuClick
  };
}, [ContextMenu, RowDD, Edit]);
