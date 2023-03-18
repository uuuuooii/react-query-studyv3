import { useQuery, useMutation } from "react-query";

async function fetchComments(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
  );
  return response.json();
}

async function deletePost(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    // 특정 postId에 대해 delete HTTP 호출을 전송
    { method: "DELETE" }
  );
  return response.json();
}

async function updatePost(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    { method: "PATCH", data: { title: "REACT QUERY FOREVER!!!!" } }
  );
  return response.json();
}

export function PostDetail({ post }) {
  // replace with useQuery
  const { data, isLoading, isError, error } = useQuery(
    ["comment", post.id],
    () => fetchComments(post.id)
  );

  // const deleteMutation = useMutation(() => deletePost(post.id)); // 이렇게 해도 상관없음
  const deleteMutation = useMutation((postId) => deletePost(postId));
  const updateMutation = useMutation((postId) => updatePost(postId));

  if (isLoading) return <h3>Loading...</h3>;
  if (isError)
    return (
      <>
        <h3>Error</h3>
        <p>{error.toStrong()}</p>
      </>
    );
  return (
    <>
      <h3 style={{ color: "blue" }}>{post.title}</h3>
      <button onClick={() => deleteMutation.mutate(post.id)}>Delete</button>
      <button onClick={() => updateMutation.mutate(post.id)}>
        Update title
      </button>
      {deleteMutation.isError && (
        <p style={{ color: "red" }}>문제가 발생했습니다.</p>
      )}
      {deleteMutation.isLoading && <p style={{ color: "purple" }}>삭제중...</p>}
      {deleteMutation.isSuccess && (
        <p style={{ color: "green" }}>삭제 되었습니다.</p>
      )}
      {updateMutation.isError && (
        <p style={{ color: "red" }}>문제가 발생했습니다.</p>
      )}
      {updateMutation.isError && (
        <p style={{ color: "purple" }}>업데이트 중...</p>
      )}
      {updateMutation.isError && (
        <p style={{ color: "green" }}>업데이트 되었습니다.</p>
      )}
      <p>{post.body}</p>
      <h4>Comments</h4>
      {data.map((comment) => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}
    </>
  );
}
