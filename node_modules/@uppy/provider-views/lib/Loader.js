import { h } from 'preact';
export default (_ref => {
  let {
    i18n,
    loading
  } = _ref;
  return h("div", {
    className: "uppy-Provider-loading"
  }, h("span", null, i18n('loading')), typeof loading === 'string' &&
  // todo improve this, see discussion in https://github.com/transloadit/uppy/pull/4399#discussion_r1162564445
  h("span", {
    style: {
      marginTop: '.7em'
    }
  }, loading));
});