const handleAuthentication = (request, response, _) => {
  const details = {};
  details.verified = request.cookies.username ? true : false;
  details.username = request.cookies.username;

  response.end(JSON.stringify(details));
};

module.exports = { handleAuthentication };
