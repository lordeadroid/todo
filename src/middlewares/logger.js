const logRequest = (req, _, next) => {
  // eslint-disable-next-line no-console
  console.log(req.method, req.path);
  next();
};

export default logRequest;
