const Error = ({ error }) => {
  const status = error.response.status;
  const message = error.response.data.message;
  return (
    <div className="not-found-flex-container">
      {
        <>
          <h2>{status}</h2>
          <p>{message}</p>
        </>
      }
    </div>
  );
};

export default Error;
