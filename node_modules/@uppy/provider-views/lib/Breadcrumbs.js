import { h, Fragment } from 'preact';
const Breadcrumb = props => {
  const {
    getFolder,
    title,
    isLast
  } = props;
  return h(Fragment, null, h("button", {
    type: "button",
    className: "uppy-u-reset uppy-c-btn",
    onClick: getFolder
  }, title), !isLast ? ' / ' : '');
};
export default (props => {
  const {
    getFolder,
    title,
    breadcrumbsIcon,
    breadcrumbs
  } = props;
  return h("div", {
    className: "uppy-Provider-breadcrumbs"
  }, h("div", {
    className: "uppy-Provider-breadcrumbsIcon"
  }, breadcrumbsIcon), breadcrumbs.map((directory, i) => h(Breadcrumb, {
    key: directory.id,
    getFolder: () => getFolder(directory.requestPath),
    title: i === 0 ? title : directory.name,
    isLast: i + 1 === breadcrumbs.length
  })));
});