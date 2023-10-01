import { h } from 'preact';
import classNames from 'classnames';
import remoteFileObjToLocal from '@uppy/utils/lib/remoteFileObjToLocal';
import { useMemo } from 'preact/hooks';
import VirtualList from '@uppy/utils/lib/VirtualList';
import SearchFilterInput from "./SearchFilterInput.js";
import FooterActions from "./FooterActions.js";
import Item from "./Item/index.js";
const VIRTUAL_SHARED_DIR = 'shared-with-me';
function ListItem(props) {
  const {
    currentSelection,
    uppyFiles,
    viewType,
    isChecked,
    toggleCheckbox,
    recordShiftKeyPress,
    showTitles,
    i18n,
    validateRestrictions,
    getNextFolder,
    columns,
    f
  } = props;
  if (f.isFolder) {
    var _isChecked;
    return Item({
      columns,
      showTitles,
      viewType,
      i18n,
      id: f.id,
      title: f.name,
      getItemIcon: () => f.icon,
      isChecked: isChecked(f),
      toggleCheckbox: event => toggleCheckbox(event, f),
      recordShiftKeyPress,
      type: 'folder',
      isDisabled: (_isChecked = isChecked(f)) == null ? void 0 : _isChecked.loading,
      isCheckboxDisabled: f.id === VIRTUAL_SHARED_DIR,
      handleFolderClick: () => getNextFolder(f)
    });
  }
  const restrictionError = validateRestrictions(remoteFileObjToLocal(f), [...uppyFiles, ...currentSelection]);
  return Item({
    id: f.id,
    title: f.name,
    author: f.author,
    getItemIcon: () => f.icon,
    isChecked: isChecked(f),
    toggleCheckbox: event => toggleCheckbox(event, f),
    recordShiftKeyPress,
    columns,
    showTitles,
    viewType,
    i18n,
    type: 'file',
    isDisabled: restrictionError && !isChecked(f),
    restrictionError
  });
}
function Browser(props) {
  const {
    currentSelection,
    folders,
    files,
    uppyFiles,
    viewType,
    headerComponent,
    showBreadcrumbs,
    isChecked,
    toggleCheckbox,
    recordShiftKeyPress,
    handleScroll,
    showTitles,
    i18n,
    validateRestrictions,
    isLoading,
    showSearchFilter,
    search,
    searchTerm,
    clearSearch,
    searchOnInput,
    searchInputLabel,
    clearSearchLabel,
    getNextFolder,
    cancel,
    done,
    columns,
    noResultsLabel,
    loadAllFiles
  } = props;
  const selected = currentSelection.length;
  const rows = useMemo(() => [...folders, ...files], [folders, files]);
  return h("div", {
    className: classNames('uppy-ProviderBrowser', `uppy-ProviderBrowser-viewType--${viewType}`)
  }, headerComponent && h("div", {
    className: "uppy-ProviderBrowser-header"
  }, h("div", {
    className: classNames('uppy-ProviderBrowser-headerBar', !showBreadcrumbs && 'uppy-ProviderBrowser-headerBar--simple')
  }, headerComponent)), showSearchFilter && h("div", {
    class: "uppy-ProviderBrowser-searchFilter"
  }, h(SearchFilterInput, {
    search: search,
    searchTerm: searchTerm,
    clearSearch: clearSearch,
    inputLabel: searchInputLabel,
    clearSearchLabel: clearSearchLabel,
    inputClassName: "uppy-ProviderBrowser-searchFilterInput",
    searchOnInput: searchOnInput
  })), (() => {
    if (isLoading) {
      return h("div", {
        className: "uppy-Provider-loading"
      }, h("span", null, i18n('loading')));
    }
    if (!folders.length && !files.length) {
      return h("div", {
        className: "uppy-Provider-empty"
      }, noResultsLabel);
    }
    if (loadAllFiles) {
      return h("div", {
        className: "uppy-ProviderBrowser-body"
      }, h("ul", {
        className: "uppy-ProviderBrowser-list"
      }, h(VirtualList, {
        data: rows,
        renderRow: f => h(ListItem, {
          currentSelection: currentSelection,
          uppyFiles: uppyFiles,
          viewType: viewType,
          isChecked: isChecked,
          toggleCheckbox: toggleCheckbox,
          recordShiftKeyPress: recordShiftKeyPress,
          showTitles: showTitles,
          i18n: i18n,
          validateRestrictions: validateRestrictions,
          getNextFolder: getNextFolder,
          columns: columns,
          f: f
        }),
        rowHeight: 31
      })));
    }
    return h("div", {
      className: "uppy-ProviderBrowser-body"
    }, h("ul", {
      className: "uppy-ProviderBrowser-list",
      onScroll: handleScroll,
      role: "listbox"
      // making <ul> not focusable for firefox
      ,
      tabIndex: "-1"
    }, rows.map(f => h(ListItem, {
      currentSelection: currentSelection,
      uppyFiles: uppyFiles,
      viewType: viewType,
      isChecked: isChecked,
      toggleCheckbox: toggleCheckbox,
      recordShiftKeyPress: recordShiftKeyPress,
      showTitles: showTitles,
      i18n: i18n,
      validateRestrictions: validateRestrictions,
      getNextFolder: getNextFolder,
      columns: columns,
      f: f
    }))));
  })(), selected > 0 && h(FooterActions, {
    selected: selected,
    done: done,
    cancel: cancel,
    i18n: i18n
  }));
}
export default Browser;