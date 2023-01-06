const express = require("express");
const eventController = require("../controllers/event-controller");

const router = express.Router();

// event routes
router.get("/events/:initiatorEmail", eventController.getAllEvents);
router.post("/events", eventController.creteEvent);
router.get("/event/:eventId", eventController.getEvent);
router.delete("/event/:eventId", eventController.deleteEvent);

// collaborator routes
router.post("/collaborators", eventController.createCollaborator);
router.delete(
  "/collaborator/:collaboratorId",
  eventController.deleteCollaborator
);

// flight routes
router.post("/flights", eventController.createFlight);
router.delete("/flight/:flightId", eventController.deleteFlight);

// expense routes
router.post("/expenses", eventController.createExpense);
router.delete("/expense/:expenseId", eventController.deleteExpense);

// task routes
router.post("/tasks", eventController.createTask);
router.delete("/task/:taskId", eventController.deleteTask);

module.exports = router;
