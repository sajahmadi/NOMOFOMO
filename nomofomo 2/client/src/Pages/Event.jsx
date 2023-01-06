import {
  PlusIcon,
  ChevronLeftIcon,
  StarIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { Modal } from "react-responsive-modal";
import DatePicker from "react-datepicker";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import axiosInstance from "../config/axiosConfig";

function Event() {
  const params = useParams();
  const navigate = useNavigate();

  // Task states
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [taskDate, setTaskDate] = useState(new Date());
  const [taskDescription, setTaskDescription] = useState("");
  const [taskCreateLoading, setTaskCreateLoading] = useState(false);

  // event states
  const [event, setEvent] = useState(null);
  const [pageLoading, setPageLoading] = useState(true);
  const [refetch, setRefetch] = useState(false);

  // collaborators states
  const [isCollaboratorModalOpen, setIsCollaboratorModalOpen] = useState(false);
  const [collaboratorEmail, setCollaboratorEmail] = useState("");
  const [collaboratorLoading, setCollaboratorLoading] = useState(false);
  const [collaboratorName, setCollaboratorName] = useState("");
  const [collaboratorDeleteLoading, setCollaboratorDeleteLoading] =
    useState(false);

  // expenses states
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [collaboratorNameForExpense, setCollaboratorNameForExpense] =
    useState("guest");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expenseDescription, setExpenseDescription] = useState("");
  const [expenseLoading, setExpenseLoading] = useState(false);
  const [expenseDeleteLoading, setExpenseDeleteLoading] = useState(false);

  // fetch event
  useEffect(() => {
    axiosInstance
      .get(`/dashboard/event/${Number(params.eventId)}`)
      .then((res) => {
        if (res?.data?.success) {
          setEvent(res.data?.event);
          setPageLoading(false);
        }
      })
      .catch((err) => {
        setPageLoading(false);
        console.log(err);
      });
  }, [refetch, params.eventId]);

  // Handle create task
  const handleCreateTask = (e) => {
    setTaskCreateLoading(true);
    e.preventDefault();

    // call api for creating task
    axiosInstance
      .post(`/dashboard/tasks`, {
        event_id: Number(params.eventId),
        description: taskDescription,
        date: taskDate,
      })
      .then((res) => {
        if (res?.data?.success) {
          toast.success("Intinerary added successfully!");
          setRefetch((prev) => !prev);
        } else {
          toast.error("Something went wrong!");
        }
        setTaskCreateLoading(false);
        setIsTaskModalOpen(false);
      });
  };

  // Handle delete task
  const handleDeleteTask = (taskId) => {
    axiosInstance
      .delete(`/dashboard/task/${taskId}`)
      .then((res) => {
        if (res?.data?.success) {
          toast.success("Intinerary deleted successfully!");
          setRefetch((prev) => !prev);
        } else {
          toast.error("Something went wrong!");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Handle create collaborator
  const handleAddCollaborator = (e) => {
    setCollaboratorLoading(true);
    e.preventDefault();

    // call api for creating task
    axiosInstance
      .post(`/dashboard/collaborators`, {
        event_id: Number(params.eventId),
        email: collaboratorEmail,
        name: collaboratorName,
      })
      .then((res) => {
        if (res?.data?.success) {
          toast.success("Collaborator added successfully!");
          setRefetch((prev) => !prev);
        } else {
          toast.error("Something went wrong!");
        }
        setCollaboratorLoading(false);
        setIsCollaboratorModalOpen(false);
      });
  };

  // Handle delete collaborator
  const handleDeleteCollaborator = (collaboratorId) => {
    setCollaboratorDeleteLoading(true);
    axiosInstance
      .delete(`/dashboard/collaborator/${collaboratorId}`)
      .then((res) => {
        if (res?.data?.success) {
          toast.success("Collaborator deleted successfully!");
          setRefetch((prev) => !prev);
        } else {
          toast.error("Something went wrong!");
        }
        setCollaboratorDeleteLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Handle add expense
  const handleAddExpense = (e) => {
    setExpenseLoading(true);
    e.preventDefault();

    // call api for creating task
    axiosInstance
      .post(`/dashboard/expenses`, {
        event_id: Number(params.eventId),
        collaborator_name: collaboratorNameForExpense,
        amount: expenseAmount,
        description: expenseDescription,
      })
      .then((res) => {
        if (res?.data?.success) {
          toast.success("Expense added successfully!");
          setRefetch((prev) => !prev);
        } else {
          toast.error("Something went wrong!");
        }
        setExpenseLoading(false);
        setIsExpenseModalOpen(false);
      });
  };

  // Handle delete expense
  const handleDeleteExpense = (expenseId) => {
    setExpenseDeleteLoading(true);
    axiosInstance
      .delete(`/dashboard/expense/${expenseId}`)
      .then((res) => {
        if (res?.data?.success) {
          toast.success("Expense deleted successfully!");
          setRefetch((prev) => !prev);
        } else {
          toast.error("Something went wrong!");
        }
        setExpenseDeleteLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (pageLoading)
    return (
      <div className="w-screen h-screen flex justify-center items-center text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-primary-500 title">
        <p>Loading...</p>
      </div>
    );

  return (
    <main className="p-2 md:p-4 lg:p-6 ">
      <section className="mb-4">
        <button
          className="btn py-1"
          onClick={() => {
            navigate(-1);
          }}
        >
          <ChevronLeftIcon className="h-6 w-6 text-gray-600" />
        </button>
      </section>
      <div className="md:flex justify-around mt-6 space-y-6 sm:space-y-0">
        <section>
          {/* collaborators div */}
          <div className="bg-white border-t-[10px] rounded-t-md border-emerald-500 w-[350px] px-4 pb-6 pt-2 relative min-h-[200px] ">
            <h2 className="text-center title text-lg">
              {collaboratorDeleteLoading ? "Updating..." : "Collaborators"}
            </h2>
            <div className="flex gap-4 mt-2">
              {event?.Collaborators?.map((collaborator) => (
                <div className="w-15 h-15 flex items-center gap-x-1">
                  <div className="w-10 h-10 p-1 rounded-full bg-primary-500 flex font-bold teko justify-center items-center text-lg text-white">
                    {collaborator?.name?.charAt(0) +
                      collaborator?.name?.charAt(1)}
                  </div>
                  <TrashIcon
                    className="h-5 w-5 text-red-600 cursor-pointer"
                    onClick={() => handleDeleteCollaborator(collaborator?.id)}
                  />
                </div>
              ))}
            </div>
            <span
              className="absolute bottom-2 right-3 cursor-pointer"
              onClick={() => setIsCollaboratorModalOpen(true)}
            >
              <PlusIcon className="h-7 w-7 text-green-600 " />
            </span>
          </div>

          {/* expenses div */}
          <div className="bg-white border-t-[10px] rounded-t-md border-primary-500 w-[350px] px-4 pb-6 pt-2 relative min-h-[200px] mt-6">
            <h2 className="text-center title text-lg">
              {expenseDeleteLoading ? "Updating..." : "Expenses"}
            </h2>
            <div>
              {event?.Expenses?.map((expense) => (
                <div className="flex justify-between items-center gap-2 mt-2 bg-gray-100 px-3 py-2 rounded-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 p-1 rounded-full bg-primary-500 flex font-bold teko justify-center items-center text-lg text-white">
                      {expense?.collaborator_name?.charAt(0) +
                        expense?.collaborator_name?.charAt(1)}
                    </div>
                    <p className="text-sm">{expense?.description}</p>
                  </div>
                  <div className="flex items-center gap-x-2">
                    <span className="text-sm">${expense?.amount}</span>
                    <TrashIcon
                      className="h-5 w-5 text-red-600 cursor-pointer"
                      onClick={() => {
                        handleDeleteExpense(expense?.id);
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <span
              className="absolute bottom-2 right-3 cursor-pointer"
              onClick={() => {
                if (event?.Collaborators?.length === 0)
                  return toast.error(
                    "Please add at least one collaborator first!"
                  );
                setIsExpenseModalOpen(true);
              }}
            >
              <PlusIcon className="h-7 w-7 text-green-600 " />
            </span>
          </div>
        </section>

        {/* vertiacl timeline component */}
        <section className="w-2/3">
          <VerticalTimeline>
            {event?.Tasks?.map((task) => {
              return (
                <VerticalTimelineElement
                  className="vertical-timeline-element--education"
                  date={task?.date?.split("T")[0]}
                  iconStyle={{ background: "#8b5cf6", color: "#fff" }}
                  icon={<StarIcon className="w-5 h-5" />}
                >
                  <div className="relative">
                    <h3 className="vertical-timeline-element-title">
                      {task?.description}
                    </h3>
                    <TrashIcon
                      className="h-5 w-5 text-red-600 cursor-pointer absolute bottom-0 right-0"
                      onClick={() => handleDeleteTask(task?.id)}
                    />
                  </div>
                </VerticalTimelineElement>
              );
            })}

            <VerticalTimelineElement
              iconStyle={{ background: "rgb(16, 204, 82)", color: "#fff" }}
              icon={<PlusIcon className="w-5 h-5" />}
              className="cursor-pointer"
              iconOnClick={() => setIsTaskModalOpen(true)}
            />
          </VerticalTimeline>
        </section>
      </div>

      {/* create modal */}
      <Modal
        open={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        classNames={{
          modal: "customModal",
        }}
      >
        <div className="w-[300px] md:w-[450x]">
          <h3 className="capitalize text-xl">Add new itinerary</h3>

          <form className="mt-4" onSubmit={handleCreateTask}>
            <textarea
              placeholder="Description"
              rows={3}
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              className="border outline-none focus:border-primary-500 border-gray-300  p-2 focus:outline-none rounded-md transition-all duration-200 ease-in-out w-full"
            />
            <div className="my-2">
              <DatePicker
                startDate={taskDate}
                onChange={(date) => setTaskDate(date?.toISOString())}
                inline
              />
            </div>
            <button
              className="bg-primary-500 text-white tracking-widest rounded-md p-2 mt-4 hover:bg-primary-600 transition-all duration-200 ease-in-out uppercase w-full font-bold"
              type="submit"
            >
              {taskCreateLoading ? "Adding..." : "Add"}
            </button>
          </form>
        </div>
      </Modal>

      {/* collaborator modal */}
      <Modal
        open={isCollaboratorModalOpen}
        onClose={() => setIsCollaboratorModalOpen(false)}
        classNames={{
          modal: "customModal",
        }}
      >
        <div className="w-[300px] md:w-[450x]">
          <h3 className="capitalize text-xl">Add collaborator</h3>

          <form className="mt-4" onSubmit={handleAddCollaborator}>
            <input
              type="text"
              placeholder="Name"
              value={collaboratorName}
              onChange={(e) => setCollaboratorName(e.target.value)}
              className="border outline-none focus:border-primary-500 border-gray-300 placeholder:tracking-widest p-2 focus:outline-none rounded-md transition-all duration-200 ease-in-out w-full my-2"
            />
            <input
              type="email"
              placeholder="Email"
              value={collaboratorEmail}
              onChange={(e) => setCollaboratorEmail(e.target.value)}
              className="border outline-none focus:border-primary-500 border-gray-300 placeholder:tracking-widest p-2 focus:outline-none rounded-md transition-all duration-200 ease-in-out my-2 w-full"
            />
            <button
              className="bg-primary-500 text-white tracking-widest rounded-md p-2 mt-4 hover:bg-primary-600 transition-all duration-200 ease-in-out uppercase w-full font-bold"
              type="submit"
            >
              {collaboratorLoading ? "Adding..." : "Add"}
            </button>
          </form>
        </div>
      </Modal>

      <Modal
        open={isExpenseModalOpen}
        onClose={() => setIsExpenseModalOpen(false)}
        classNames={{
          modal: "customModal",
        }}
      >
        <div className="w-[300px] md:w-[450x]">
          <h3 className="capitalize text-xl">Add expense</h3>

          <form className="mt-4" onSubmit={handleAddExpense}>
            <input
              type="number"
              accept="number"
              value={expenseAmount}
              onChange={(e) => setExpenseAmount(e.target.value)}
              placeholder="Amount"
              className="border outline-none focus:border-primary-500 border-gray-300 placeholder:tracking-widest p-2 focus:outline-none rounded-md transition-all duration-200 ease-in-out w-full my-2"
            />
            <textarea
              placeholder="Description"
              rows={3}
              value={expenseDescription}
              onChange={(e) => setExpenseDescription(e.target.value)}
              className="border outline-none focus:border-primary-500 border-gray-300  p-2 focus:outline-none rounded-md transition-all duration-200 ease-in-out w-full"
            />
            <select
              name=""
              id=""
              value={collaboratorNameForExpense}
              onSelect={(e) => {
                console.log(e.target.value);
                setCollaboratorNameForExpense(e.target.value);
              }}
              onChange={(e) => {
                console.log(e.target.value);
                setCollaboratorNameForExpense(e.target.value);
              }}
              className="border outline-none focus:border-primary-500 border-gray-300 placeholder:tracking-widest p-2 focus:outline-none rounded-md transition-all duration-200 ease-in-out w-full my-2"
            >
              {event?.Collaborators?.map((collaborator) => {
                return (
                  <option value={collaborator.name}>{collaborator.name}</option>
                );
              })}
            </select>

            <button
              className="bg-primary-500 text-white tracking-widest rounded-md p-2 mt-4 hover:bg-primary-600 transition-all duration-200 ease-in-out uppercase w-full font-bold"
              type="submit"
            >
              {expenseLoading ? "Adding..." : "Add"}
            </button>
          </form>
        </div>
      </Modal>

      <Toaster
        toastOptions={{
          duration: 3000,
        }}
      />
    </main>
  );
}

export default Event;
