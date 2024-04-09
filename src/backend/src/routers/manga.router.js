const router = require("express").Router({ mergeParams: true });
const controller = require("../controllers/manga.controller");

console.log("Router file loaded."); // Add a log statement to indicate that the router file is being loaded

router
  .route("/")
  .get(controller.list);

router
  .route("/comments")
  .get(controller.listComments)

router
  .route("/:manga_id/info")
  .get(controller.read)

  router
  .route("/:createReview")
  .post(controller.createComment);
console.log("Routes configured."); // Add a log statement to indicate that the routes are configured

module.exports = router;