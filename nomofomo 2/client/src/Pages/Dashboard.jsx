import { PlusIcon, PowerIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { Modal } from "react-responsive-modal";
import { useRecoilValue, useSetRecoilState } from "recoil";
import DatePicker from "react-datepicker";
import toast, { Toaster } from "react-hot-toast";
import axiosInstance from "../config/axiosConfig";
import useAxios from "../utils/useAxios";
import { authAtom } from "../atoms/authAtom";
import EventCard from "../Components/EventCard";
import { ReactComponent as DashboardBanner } from "../assets/dashboard-banner.svg";

function Dashboard() {
  // Global states
  const auth = useRecoilValue(authAtom);
  const setAuth = useSetRecoilState(authAtom);
  const [refetch, setRefetch] = useState(false);

  const { response: eventsData, loading: eventsDataLoading } = useAxios({
    url: `/dashboard/events/${auth.user?.email}`,
    method: "get",
    refetch,
  });

  // Local states
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [createEventLoading, setCreateEventLoading] = useState(false);
  const [events, setEvents] = useState([]);
  const [date, setDate] = useState(new Date());
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");

  // setting events data to local state events
  useEffect(() => {
    if (eventsData) {
      if (!eventsData.success) return toast.error("Something went wrong!");
      setEvents(eventsData.events);
    }
  }, [eventsData, eventsDataLoading]);

  // Handle form submit
  const handleSubmit = (e) => {
    setCreateEventLoading(true);
    e.preventDefault();

    // call api for creating event
    axiosInstance
      .post("/dashboard/events", {
        initiator_email: auth.user?.email,
        name,
        location,
        date,
      })
      .then((res) => {
        if (res?.data?.success) {
          toast.success("Event created successfully!");
          setIsCreateModalOpen(false);
          setRefetch((prev) => !prev);
        } else {
          toast.error("Something went wrong!");
          setIsCreateModalOpen(false);
        }
        setCreateEventLoading(false);
      });
  };

  if (eventsDataLoading)
    return (
      <div className="w-screen h-screen flex justify-center items-center text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-primary-500 title">
        <p>Loading...</p>
      </div>
    );

  return (
    <>
      <main className="p-2 md:p-4 lg:p-6 ">
        <section className="lg:w-2/3 mx-auto">
          <div className="w-full">
            <DashboardBanner className="w-full" />
          </div>
        </section>
        <section className="lg:w-2/3 mx-auto mt-4 lg:mb-10">
          <div className="flex items-center justify-between">
            <div>
              <button
                className="bg-primary-500 text-white rounded-md py-2 px-4 mt-4 hover:bg-primary-600 transition-all duration-200 ease-in-out flex justify-center items-center "
                onClick={() => setIsCreateModalOpen(true)}
              >
                <PlusIcon className="h-5 w-5" />
              </button>
            </div>
            <div>
              <button
                className="bg-red-500 text-white rounded-md py-2 px-4 mt-4 hover:bg-red-600 transition-all duration-200 ease-in-out flex justify-center items-center "
                onClick={() => {
                  setAuth({
                    isAuthenticated: false,
                    token: null,
                    user: null,
                  });
                  localStorage.removeItem("__NOMOFOMO_TOKEN");
                  localStorage.removeItem("__NOMOFOMO_USER");
                }}
              >
                <PowerIcon className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* event cards section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3  gap-2 gap-y-4 md:gap-y-6 lg:gap-y-8 mt-4 md:mt-6 lg:mt-8 xl:mt-10">
            {
              // mapping events to event cards
              events.map((event) => (
                <EventCard event={event} setRefetch={setRefetch} />
              ))
            }
          </div>
        </section>
      </main>

      {/* create modal */}
      <Modal
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        classNames={{
          modal: "customModal",
        }}
      >
        <div className="w-[300px] md:w-[450x]">
          <h3 className="capitalize text-xl">Create a new event</h3>

          <form className="mt-4" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Name"
              className="border outline-none focus:border-primary-500 border-gray-300  p-2 focus:outline-none rounded-md transition-all duration-200 ease-in-out w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Location"
              className="border outline-none focus:border-primary-500 border-gray-300  p-2 focus:outline-none rounded-md transition-all duration-200 ease-in-out w-full my-2"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <div className="my-2">
              <DatePicker
                startDate={date}
                onChange={(date) => setDate(date?.toISOString())}
                inline
              />
            </div>
            <button
              className="bg-primary-500 text-white tracking-widest rounded-md p-2 mt-4 hover:bg-primary-600 transition-all duration-200 ease-in-out uppercase w-full font-bold"
              type="submit"
            >
              {createEventLoading ? "Creating..." : "Create"}
            </button>
          </form>
        </div>
      </Modal>

      <Toaster
        toastOptions={{
          duration: 3000,
        }}
      />
    </>
  );
}

export default Dashboard;
