function reactRender(vnode) {
  if (!vnode) {
    return;
  }
  let dom = document.createElement(vnode.tag);
  if (vnode.attrs) {
    Object.keys(vnode.attrs).forEach((key) => {
      dom.setAttrbute(key, vnode.attrs[key]);
    });
  }
  if (vnode.childen) {
    vnode.children.forEach((child) => {
      dom.appendChild(reactRender(child));
    });
  }
  return dom;
}
console.log(
  reactRender({
    tag: "DIV",
    attrs: {
      id: "app",
    },
    children: [
      {
        tag: "SPAN",
        children: [{ tag: "A", children: [] }],
      },
      {
        tag: "SPAN",
        children: [
          { tag: "A", children: [] },
          { tag: "A", children: [] },
        ],
      },
    ],
  })
);
