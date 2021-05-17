module.exports = async (client) => {
  console.log(`[API] Logged in as ${client.user.username}`);
  await client.user.setActivity(`%도움말`, {
    type: "LISTENING",//can be LISTENING, WATCHING, PLAYING, STREAMING
  });
};
