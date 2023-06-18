const files = {
  name: 'src',
  type: 'folder',
  children: [
    {
      name: 'components',
      type: 'folder',
      children: [
        { name: 'BaseTable', type: 'file', fileType: 'Component', extension: '.vue', prefix: 'components' },
        { name: 'HelloWorld', type: 'file', fileType: 'Component', extension: '.vue', prefix: 'components' },
        {
          name: 'treeList',
          type: 'folder',
          children: [
            { name: 'TreeItem', type: 'file', fileType: 'Component', extension: '.vue', prefix: 'componentstreeList' },
          ],
        },
      ],
    },
    {
      name: 'composables',
      type: 'folder',
      children: [
        { name: 'testComposable', type: 'file', fileType: 'Composable', extension: '.ts', prefix: 'composables' },
      ],
    },
  ],
};
export default files;
export const searchItems = [
  { name: 'BaseTable', view: 'FileView', prefix: 'components' },
  { name: 'HelloWorld', view: 'FileView', prefix: 'components' },
  { name: 'TreeItem', view: 'FileView', prefix: 'componentstreeList' },
  { name: 'testComposable', view: 'FileView', prefix: 'composables' },
];
