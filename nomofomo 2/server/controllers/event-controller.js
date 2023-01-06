const { Event, Collaborator, Flight, Expense, Task } = require("../models");

// create a new event
exports.creteEvent = async (req, res) => {
  const { initiator_email, name, date, location } = req.body;

  // check if the values are provided
  if (!initiator_email || !name || !date || !location) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    // create a new event
    const event = await Event.create({
      initiator_email,
      name,
      date,
      location,
    });

    if (!event) {
      return res
        .status(500)
        .json({ success: false, message: "Event could not be created" });
    }

    res.status(201).json({
      success: true,
      message: "Event created successfully",
      event,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// get all events
exports.getAllEvents = async (req, res) => {
  const { initiatorEmail } = req.params;

  // check if the values are provided
  if (!initiatorEmail) {
    return res
      .status(400)
      .json({ success: false, message: "Initiator email is required" });
  }

  try {
    // get all events including the collaborators, flights, expenses, accommodations, and tasks
    const events = await Event.findAll({
      where: { initiator_email: initiatorEmail },
    });

    if (!events) {
      return res
        .status(500)
        .json({ success: false, message: "Events could not be found" });
    }

    res.status(200).json({
      success: true,
      message: "Events found successfully",
      events,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// get an event
exports.getEvent = async (req, res) => {
  const { eventId } = req.params;

  // check if the values are provided
  if (!eventId) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    // get an event including the collaborators, flights, expenses, accommodations, and tasks
    const event = await Event.findOne({
      where: { id: Number(eventId) },
      include: [
        {
          model: Collaborator,
          attributes: ["id", "name", "email"],
        },
        {
          model: Flight,
          attributes: ["id", "collaborator_name", "flight_number", "date"],
        },
        {
          model: Expense,
          attributes: [
            "id",
            "collaborator_name",
            "amount",
            "description",
            "date",
          ],
        },

        {
          model: Task,
          attributes: ["id", "description", "date"],
        },
      ],
    });

    if (!event) {
      return res
        .status(404)
        .json({ success: false, message: "Event could not be found" });
    }

    res.status(200).json({
      success: true,
      message: "Event retrieved successfully",
      event,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// delete an event
exports.deleteEvent = async (req, res) => {
  const { eventId } = req.params;

  // check if the values are provided
  if (!eventId) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    // delete an event
    const event = await Event.destroy({
      where: { id: Number(eventId) },
    });

    if (!event) {
      return res
        .status(404)
        .json({ success: false, message: "Event could not be found" });
    }

    res.status(200).json({
      success: true,
      message: "Event deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// create a new collaborator
exports.createCollaborator = async (req, res) => {
  const { event_id, name, email } = req.body;

  // check if the values are provided
  if (!event_id || !name || !email) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    // create a new collaborator
    const collaborator = await Collaborator.create({
      event_id: Number(event_id),
      name,
      email,
    });

    if (!collaborator) {
      return res
        .status(500)
        .json({ success: false, message: "Collaborator could not be created" });
    }

    res.status(201).json({
      success: true,
      message: "Collaborator created successfully",
      collaborator,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// delete a collaborator
exports.deleteCollaborator = async (req, res) => {
  const { collaboratorId } = req.params;

  // check if the values are provided
  if (!collaboratorId) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    // delete a collaborator
    const collaborator = await Collaborator.destroy({
      where: { id: Number(collaboratorId) },
    });

    if (!collaborator) {
      return res
        .status(404)
        .json({ success: false, message: "Collaborator could not be found" });
    }

    res.status(200).json({
      success: true,
      message: "Collaborator deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// create a new flight
exports.createFlight = async (req, res) => {
  const { event_id, collaborator_name, flight_number, date } = req.body;

  // check if the values are provided
  if (!event_id || !collaborator_name || !flight_number || !date) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    // create a new flight
    const flight = await Flight.create({
      event_id: Number(event_id),
      collaborator_name,
      flight_number,
      date,
    });

    if (!flight) {
      return res
        .status(500)
        .json({ success: false, message: "Flight could not be created" });
    }

    res.status(201).json({
      success: true,
      message: "Flight created successfully",
      flight,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// delete a flight
exports.deleteFlight = async (req, res) => {
  const { flightId } = req.params;

  // check if the values are provided
  if (!flightId) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    // delete a flight
    const flight = await Flight.destroy({
      where: { id: Number(flightId) },
    });

    if (!flight) {
      return res
        .status(404)
        .json({ success: false, message: "Flight could not be found" });
    }

    res.status(200).json({
      success: true,
      message: "Flight deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// create a new expense
exports.createExpense = async (req, res) => {
  const { event_id, collaborator_name, amount, description } = req.body;

  // check if the values are provided
  if (!event_id || !collaborator_name || !amount || !description) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    // create a new expense
    const expense = await Expense.create({
      event_id: Number(event_id),
      collaborator_name,
      amount: Number(amount),
      description,
      date: new Date().toISOString(),
    });

    if (!expense) {
      return res
        .status(500)
        .json({ success: false, message: "Expense could not be created" });
    }

    res.status(201).json({
      success: true,
      message: "Expense created successfully",
      expense,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// delete an expense
exports.deleteExpense = async (req, res) => {
  const { expenseId } = req.params;

  // check if the values are provided
  if (!expenseId) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    // delete an expense
    const expense = await Expense.destroy({
      where: { id: Number(expenseId) },
    });

    if (!expense) {
      return res
        .status(404)
        .json({ success: false, message: "Expense could not be found" });
    }

    res.status(200).json({
      success: true,
      message: "Expense deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// create a new task
exports.createTask = async (req, res) => {
  const { event_id, description, date } = req.body;

  // check if the values are provided
  if (!event_id || !description || !date) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    // create a new task
    const task = await Task.create({
      event_id,
      description,
      date,
    });

    if (!task) {
      return res
        .status(500)
        .json({ success: false, message: "Task could not be created" });
    }

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// delete a task
exports.deleteTask = async (req, res) => {
  const { taskId } = req.params;

  // check if the values are provided
  if (!taskId) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    // delete a task
    const task = await Task.destroy({
      where: { id: Number(taskId) },
    });

    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task could not be found" });
    }

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
