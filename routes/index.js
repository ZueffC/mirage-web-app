async function indexRoute(req, res) {
    await res.view("/templates/index.eta", { text: "text" });
}


module.exports = { indexRoute: indexRoute };