const Error = ({ error: { response } }) => {
  const status = response.status;
  const message = response.data.message;
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
