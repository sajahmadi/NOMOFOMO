import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { TrashIcon, ChevronDoubleRightIcon } from "@heroicons/react/24/outline";
import axiosInstance from "../config/axiosConfig";

function EventCard({ event, setRefetch }) {
  // Instances
  const navigate = useNavigate();

  // Handle delete event
  const handleDeleteEvent = () => {
    axiosInstance
      .delete(`/dashboard/event/${event?.id}`)
      .then((res) => {
        if (res?.data?.success) {
          toast.success("Event deleted successfully!");
          setRefetch((prev) => !prev);
        } else {
          toast.error("Something went wrong!");
        }
      })
      .catch((err) => {
        toast.error("Something went wrong!");
      });
  };

  return (
    <div className="bg-primary-500 px-4 py-6 max-w-xs text-center text-white rounded-md">
      <h3 className="title text-xl md:text-3xl lg:text-4xl">{event?.name}</h3>
      <p className="teko text-xl md:text-2xl lg:text-3xl mt-2">
        {event?.location}
      </p>
      <p className="my-1">{event?.date?.split("T")[0]}</p>
      <div className="flex justify-around items-center mt-2">
        <span className="w-7 h-7 flex justify-center items-center bg-white rounded-md cursor-pointer">
          <TrashIcon
            className="h-5 w-5 text-red-500"
            onClick={handleDeleteEvent}
          />
        </span>
        <span className="w-7 h-7 flex justify-center items-center bg-white rounded-md cursor-pointer">
          <ChevronDoubleRightIcon
            className="h-5 w-5 text-green-500"
            onClick={() => navigate(`/event/${event?.id}`)}
          />
        </span>
      </div>
    </div>
  );
}

export default EventCard;
