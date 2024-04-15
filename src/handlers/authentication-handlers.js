const handleAuthentication = (request, response) => {
  const details = {};
  details.verified = request.cookies.username ? true : false;
  details.username = request.cookies.username;

  response.end(JSON.stringify(details));
};

export default handleAuthentication;
