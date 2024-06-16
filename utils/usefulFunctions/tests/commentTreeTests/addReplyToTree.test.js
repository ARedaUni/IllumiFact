import { addReplyToTree } from '../../CommentTreefunctions'; 

describe('addReplyToTree', () => {
    it('should return undefined if the comments tree is undefined', () => {
      const newComment = { comment_id: 4, content: 'New Reply' };
      expect(addReplyToTree(undefined, 1, newComment)).toBeUndefined();
    });
  
    it('should add a reply to a comment with the matching parent ID (no existing replies)', () => {
      const comments = [
        { comment_id: 1, content: 'Comment 1' },
        { comment_id: 2, content: 'Comment 2' },
      ];
      const newComment = { comment_id: 3, content: 'Reply to 1', parent_id: 1, depth: 1  }; 
      const expectedTree = [
        { comment_id: 1, content: 'Comment 1', replies: [newComment] },
        { comment_id: 2, content: 'Comment 2' },
      ];
  
      expect(addReplyToTree(comments, 1, newComment)).toEqual(expectedTree);
    });
  
    it('should add a reply to a comment with the matching parent ID (existing replies)', () => {
      const comments = [
        {
          comment_id: 1,
          content: 'Comment 1',
          depth: 0,
          replies: [
            { comment_id: 4, content: 'Existing Reply 1', depth: 1 },
          ],
        },
        { comment_id: 2, content: 'Comment 2', depth: 0 },
      ];
      const newComment = { comment_id: 5, content: 'Reply to 1', parent_id: 1, depth: 0 }; // Depth will be adjusted in function
      const expectedTree = [
        {
          comment_id: 1,
          content: 'Comment 1',
          depth: 0,
          replies: [
            { comment_id: 4, content: 'Existing Reply 1', depth: 1 },
            { ...newComment, depth: 1 },
          ],
        },
        { comment_id: 2, content: 'Comment 2', depth: 0 },
      ];
  
      expect(addReplyToTree(comments, 1, newComment)).toEqual(expectedTree);
    });
    it('should add a reply recursively to a nested comment with the matching parent ID', () => {
      const comments = [
        {
          comment_id: 1,
          content: 'Comment 1',
          replies: [
            {
              comment_id: 2,
              content: 'Reply 1',
              depth: 1,
              replies: [
                { comment_id: 3, content: 'Nested Reply', depth: 2 },
              ],
            },
          ],
        },
        { comment_id: 4, content: 'Comment 2' },
      ];
      const newComment = { comment_id: 5, content: 'Reply to Reply 1', parent_id: 2, depth: 2 }; // Set depth explicitly
      const expectedTree = [
        {
          comment_id: 1,
          content: 'Comment 1',
          replies: [
            {
              comment_id: 2,
              content: 'Reply 1',
              depth: 1,
              replies: [
                { comment_id: 3, content: 'Nested Reply', depth: 2 },
                newComment,
              ],
            },
          ],
        },
        { comment_id: 4, content: 'Comment 2' },
      ];
  
      expect(addReplyToTree(comments, 2, newComment)).toEqual(expectedTree);
    });
})  