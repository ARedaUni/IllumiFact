
type comments = 
{
  article_id: number;
  comment_id: number;
  commenter_id: string;
  commenter_name: string;
  content: string;
  created_at: string;
  pfp: string | null;
  replies?: comments[];
  parent_id: number|null;
  depth?: number;
  is_edited?: boolean
}


export function buildCommentTree(comments: comments[]|null){
  if (comments === null) return [];

  const commentMap: Record<number, comments> = {};
  const commentTree: comments[] = [];
  const missingParents: number[] = [];

  // First Pass: Create Map and Track Missing Parents
  comments.forEach(comment => {
    commentMap[comment.comment_id] = { ...comment as comments, replies: new Array<comments>(), depth: 0 }  ;
    if (comment.parent_id && !commentMap[comment.parent_id]) {
      missingParents.push(comment.parent_id);
    }
  });

  // Second Pass: Build the Tree and Handle Missing Parents
  comments.forEach(comment => {
    if (comment.parent_id === null) {
      commentTree.push(commentMap[comment.comment_id]);
    } else {
      const parent = commentMap[comment.parent_id];
      if (parent) {
        commentMap[comment.comment_id].depth = parent.depth! + 1;
        parent?.replies?.push(commentMap[comment.comment_id]); // Use comment.comment_id here
      } else {
        console.error(`Parent comment with ID ${comment.parent_id} not found.`);
      }
    }

    if (missingParents.includes(comment.parent_id!)) {
      console.error(`Parent comment with ID ${comment.parent_id} not found.`);
    }
  });

  return commentTree;
}
