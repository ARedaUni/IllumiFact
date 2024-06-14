interface Comment {
    id: number;
    parent_id: number | null;
    content: string;
    replies?: Comment[];
  }
  

  
// export function buildCommentTree(comments: Comment[]): Comment[] {
//   if(comments===null) return [];

//   const commentMap: Record<number, Comment> = {};
//   const commentTree: Comment[] = [];
//   const missingParents: number[] = []; // Track missing parent IDs

//   // First Pass: Create Map and Track Missing Parents
//   comments.forEach(comment => {
//     commentMap[comment.comment_id] = { ...comment, replies: [], depth: 0 };
//     if (comment.parent_id && !commentMap[comment.parent_id]) {
//       missingParents.push(comment.parent_id);
//     }
//   });

//   // Second Pass: Build the Tree and Handle Missing Parents
//   comments.forEach(comment => {
//     if (comment.parent_id === null) {
//       commentTree.push(commentMap[comment.comment_id]);
//     } else {
//       const parent = commentMap[comment.parent_id];
//       if (parent) {
//         commentMap[comment.comment_id].depth = parent.depth + 1;
//         parent.replies.push(commentMap[comment.comment_id]);
//       } else if (!missingParents.includes(comment.parent_id)) { // Prevent duplicate errors
//         console.error(`Parent comment with ID ${comment.parent_id} not found.`);
//       }
//     }
//   });

//   return commentTree;
// }
// export function buildCommentTree(comments: Comment[]): Comment[] {
//   if (comments === null) return [];

//   const commentMap: Record<number, Comment> = {};
//   const commentTree: Comment[] = [];
//   const missingParents: number[] = [];

//   // First Pass: Create Map and Track Missing Parents
//   comments.forEach(comment => {
//     commentMap[comment.comment_id] = { ...comment, replies: [], depth: 0 };
//     if (comment.parent_id && !commentMap[comment.parent_id]) {
//       missingParents.push(comment.parent_id);
//     }
//   });

//   // Second Pass: Build the Tree and Handle Missing Parents
//   comments.forEach(comment => {
//     if (comment.parent_id === null) {
//       commentTree.push(commentMap[comment.comment_id]);
//     } else {
//       const parent = commentMap[comment.parent_id];
//       if (parent) {
//         commentMap[comment.comment_id].depth = parent.depth + 1;
//         parent.replies.push(commentMap[comment.id]); // Use comment.id here
//       }
      
//     }
//     if (missingParents.includes(comment.parent_id)) {
//       console.error(`Parent comment with ID ${comment.parent_id} not found.`);
//     }
//     // Check for missing parents outside the if (parent) block
   
//   });

//   return commentTree;
// }
export function buildCommentTree(comments: Comment[]): Comment[] {
  if (comments === null) return [];

  const commentMap: Record<number, Comment> = {};
  const commentTree: Comment[] = [];
  const missingParents: number[] = [];

  // First Pass: Create Map and Track Missing Parents
  comments.forEach(comment => {
    commentMap[comment.comment_id] = { ...comment, replies: [], depth: 0 };
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
        commentMap[comment.comment_id].depth = parent.depth + 1;
        parent.replies.push(commentMap[comment.comment_id]); // Use comment.comment_id here
      } else {
        console.error(`Parent comment with ID ${comment.parent_id} not found.`);
      }
    }

    if (missingParents.includes(comment.parent_id)) {
      console.error(`Parent comment with ID ${comment.parent_id} not found.`);
    }
  });

  return commentTree;
}
