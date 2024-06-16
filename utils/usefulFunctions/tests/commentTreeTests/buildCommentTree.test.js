import { buildCommentTree } from "../../buildcommentree"

describe('testing different scenarios when building a comment tree', () => {
    
    it('can handle a comment parameter with length of 0', () => {
        expect(buildCommentTree([])).toEqual([])
    })
    it('can handle null parameters gracefully', () => {
        expect(buildCommentTree(null)).toStrictEqual([])
    })
    it('should build a simple tree with a single comment', () => {
        const comments = [
          { comment_id: 1, parent_id: null, content: 'Comment 1' },
        ];
        const expectedTree = [
          { comment_id: 1, parent_id: null, content: 'Comment 1', replies: [], depth: 0 },
        ];
    
        const commentTree = buildCommentTree(comments);
        expect(commentTree).toEqual(expectedTree);
      });

      it('should handle comments with missing parents', () => {
        const comments = [
          { comment_id: 1, parent_id: null, content: 'Comment 1' },
          { comment_id: 2, parent_id: 3, content: 'Orphan comment' }, // Missing parent
        ];
        const expectedTree = [
          {
            comment_id: 1,
            parent_id: null,
            content: 'Comment 1',
            replies: [],
            depth: 0,
          },
        ];
    
        jest.spyOn(console, 'error').mockImplementationOnce(() => {}); // Suppress console error
        const commentTree = buildCommentTree(comments);
        expect(commentTree).toEqual(expectedTree);
        expect(console.error).toHaveBeenCalledWith('Parent comment with ID 3 not found.'); // Verify console error logic
      });
})