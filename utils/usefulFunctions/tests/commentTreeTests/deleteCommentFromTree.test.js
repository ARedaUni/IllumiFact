import { deleteCommentFromTree } from '../../CommentTreefunctions'; 

describe('deleteCommentFromTree', () => {
  it('should return undefined if the tree is undefined', () => {
    expect(deleteCommentFromTree(undefined, 1)).toBeUndefined();
  });

  it('should remove a comment with the matching ID from a flat tree', () => {
    const tree = [
      { comment_id: 1, content: 'Comment 1' },
      { comment_id: 2, content: 'Comment 2' },
      { comment_id: 3, content: 'Comment 3' },
    ];
    const expectedTree = [
      { comment_id: 2, content: 'Comment 2' },
      { comment_id: 3, content: 'Comment 3' },
    ];

    expect(deleteCommentFromTree(tree, 1)).toEqual(expectedTree);
  });

  it('should remove a comment with the matching ID from a tree with replies', () => {
    const tree = [
      {
        comment_id: 1,
        content: 'Comment 1',
        replies: [
          { comment_id: 4, content: 'Reply 1' },
          { comment_id: 5, content: 'Reply 2' },
        ],
      },
      { comment_id: 2, content: 'Comment 2' },
    ];
    const expectedTree = [
      { comment_id: 2, content: 'Comment 2' },
    ];

    expect(deleteCommentFromTree(tree, 1)).toEqual(expectedTree);
  });

  it('should keep replies if the comment to delete has replies but does not match the ID', () => {
    const tree = [
      {
        comment_id: 1,
        content: 'Comment 1',
        replies: [
          { comment_id: 4, content: 'Reply 1' },
          { comment_id: 5, content: 'Reply 2' },
        ],
      },
      { comment_id: 2, content: 'Comment 2' },
    ];
    const expectedTree = tree; // remains unchanged

    expect(deleteCommentFromTree(tree, 3)).toEqual(expectedTree);
  });

  it('should remove replies recursively if a comment within replies matches the ID', () => {
    const tree = [
      {
        comment_id: 1,
        content: 'Comment 1',
        replies: [
          { comment_id: 4, content: 'Reply 1' },
          { comment_id: 5, content: 'Reply 2', replies: [{ comment_id: 6, content: 'Nested Reply' }] },
        ],
      },
      { comment_id: 2, content: 'Comment 2' },
    ];
    const expectedTree = [
      {
        comment_id: 1,
        content: 'Comment 1',
        replies: [
          { comment_id: 4, content: 'Reply 1' },
        ],
      },
      { comment_id: 2, content: 'Comment 2' },
    ];

    expect(deleteCommentFromTree(tree, 5)).toEqual(expectedTree);
  });

  it('should remove a comment even if it has a parent but is not the root', () => {
    const tree = [
      {
        comment_id: 1,
        content: 'Root Comment',
        replies: [
          { comment_id: 2, content: 'Reply 1', parent_id: 1 },
          { comment_id: 3, content: 'Reply 2', parent_id: 1 },
        ],
      },
    ];
    const expectedTree = [
      {
        comment_id: 1,
        content: 'Root Comment',
        replies: [{ comment_id: 3, content: 'Reply 2', parent_id: 1 }],
      },
    ];

    expect(deleteCommentFromTree(tree, 2)).toEqual(expectedTree);
  });
});
