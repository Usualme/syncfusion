import { ContextMenu, Edit, RowDD } from '@syncfusion/ej2-react-treegrid';
import { useRef } from 'react';
import useMedia from 'use-media';
import { createEnhancer, mergeToArray, mergeToFunction } from './createEnhancer';

const COPY_ROWS          = 'copy_rows';
const CUT_ROWS           = 'cut_rows';
const PASTE_ROWS_ABOVE   = 'paste_rows_above';
const PASTE_ROWS_APPEND  = 'paste_rows_append';
const PASTE_ROWS_BELOW   = 'paste_rows_below';
const PASTE_ROWS_PREPEND = 'paste_rows_prepend';

export const EditRowsEnhancer = createEnhancer(({ treeGridRef, contextMenuItems, contextMenuClick }) => {
  const clipboard = useRef([]);

  const isDesktop = useMedia({ minWidth: '800px' });

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
        case PASTE_ROWS_ABOVE:
          list.splice(index, 0, ...clipboard.current);
          return list;
        case PASTE_ROWS_BELOW:
          list.splice(index + 1, 0, ...clipboard.current);
          return list;
        case PASTE_ROWS_PREPEND:
          list[index].subtasks = [...clipboard.current, ...(list[index].subtasks || [])];
          return list;
        case PASTE_ROWS_APPEND:
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

  const editRowsContextMenuClick = (e) => {
    switch (e.item.properties.id) {
      case COPY_ROWS:
        return copyRows(e);
      case CUT_ROWS:
        return cutRows(e);
      case PASTE_ROWS_ABOVE:
      case PASTE_ROWS_BELOW:
      case PASTE_ROWS_PREPEND:
      case PASTE_ROWS_APPEND:
        return pasteRows(e);
      default:
        return;
    }
  };

  return {
    allowRowDragAndDrop: isDesktop,
    selectionSettings: { type: 'Multiple', mode: 'Row' },
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
        id: COPY_ROWS
      },
      {
        text: 'Cut',
        target: '.e-content',
        id: CUT_ROWS
      },
      {
        text: 'Paste',
        target: '.e-content',
        items: [
          {
            text: 'Above',
            id: PASTE_ROWS_ABOVE
          },
          {
            text: 'Below',
            id: PASTE_ROWS_BELOW
          },
          {
            text: 'Prepend',
            id: PASTE_ROWS_PREPEND
          },
          {
            text: 'Append',
            id: PASTE_ROWS_APPEND
          },
        ]
      }
    ),
    contextMenuClick: mergeToFunction(contextMenuClick, editRowsContextMenuClick)
  };
}, [ContextMenu, RowDD, Edit]);
