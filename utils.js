const generateConfig = (url, accessToken) => {
  return {
    method: "get",
    url,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  };
};

module.exports = { generateConfig };
