import { updateCommentInTree
 } from "../../CommentTreefunctions";

 describe('updateCommentInTree', () => {
    it('should update a top-level comment', () => {
      const tree = [
        { comment_id: 1, content: 'Comment 1', depth: 0 },
        { comment_id: 2, content: 'Comment 2', depth: 0 },
      ];
      const updatedContent = 'Updated Comment 1';
      const expectedTree = [
        { comment_id: 1, content: updatedContent, depth: 0, is_edited: true },
        { comment_id: 2, content: 'Comment 2', depth: 0 },
      ];
  
      expect(updateCommentInTree(tree, 1, updatedContent)).toEqual(expectedTree);
    });
  
    it('should update a nested comment', () => {
      const tree = [
        {
          comment_id: 1,
          content: 'Comment 1',
          depth: 0,
          replies: [{ comment_id: 3, content: 'Nested Comment', depth: 1 }],
        },
        { comment_id: 2, content: 'Comment 2', depth: 0 },
      ];
      const updatedContent = 'Updated Nested Comment';
      const expectedTree = [
        {
          comment_id: 1,
          content: 'Comment 1',
          depth: 0,
          replies: [{ comment_id: 3, content: updatedContent, depth: 1, is_edited: true }],
        },
        { comment_id: 2, content: 'Comment 2', depth: 0 },
      ];
  
      expect(updateCommentInTree(tree, 3, updatedContent)).toEqual(expectedTree);
    });
  
    it('should update a deeply nested comment', () => {
      const tree = [
        {
          comment_id: 1,
          content: 'Comment 1',
          depth: 0,
          replies: [
            {
              comment_id: 3,
              content: 'Nested Comment',
              depth: 1,
              replies: [{ comment_id: 4, content: 'Deeply Nested Comment', depth: 2 }],
            },
          ],
        },
        { comment_id: 2, content: 'Comment 2', depth: 0 },
      ];
      const updatedContent = 'Updated Deeply Nested Comment';
      const expectedTree = [
        {
          comment_id: 1,
          content: 'Comment 1',
          depth: 0,
          replies: [
            {
              comment_id: 3,
              content: 'Nested Comment',
              depth: 1,
              replies: [
                { comment_id: 4, content: updatedContent, depth: 2, is_edited: true },
              ],
            },
          ],
        },
        { comment_id: 2, content: 'Comment 2', depth: 0 },
      ];
  
      expect(updateCommentInTree(tree, 4, updatedContent)).toEqual(expectedTree);
    });
  
    it('should not change comments that do not match the commentId', () => {
      const tree = [
        { comment_id: 1, content: 'Comment 1', depth: 0 },
        { comment_id: 2, content: 'Comment 2', depth: 0 },
      ];
      const updatedContent = 'Updated Comment 3';
      const expectedTree = [
        { comment_id: 1, content: 'Comment 1', depth: 0 },
        { comment_id: 2, content: 'Comment 2', depth: 0 },
      ];
  
      expect(updateCommentInTree(tree, 3, updatedContent)).toEqual(expectedTree);
    });
  });
  