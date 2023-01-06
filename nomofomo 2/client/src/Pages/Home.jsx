import { BoltIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { ReactComponent as Banner } from "../assets/banner.svg";
import { authAtom } from "../atoms/authAtom";

function Home() {
  const auth = useRecoilValue(authAtom);
  const navigate = useNavigate();

  return (
    <main className="p-2 md:p-4 lg:p-6 lg:h-screen w-screen overflow-hidden lg:flex items-center justify-around ">
      <section className="">
        <div className="">
          <Banner className="w-full" />
        </div>
      </section>
      <section className="text-center -mt-24 sm:mt-4">
        <h1 className="title text-animation uppercase 2xl:text-[100px] xl:text-7xl lg:text-6xl text-4xl md:text-5xl tracking-widest">
          NOMOFOMO
        </h1>
        <h2 className="xl:text-6xl lg:text-3xl text-2xl text-animation capitalize teko">
          Fear no more!
        </h2>

        <button
          className="btn xl:mt-8 mt-4 flex items-center w-30 justify-center gap-x-2 mx-auto"
          onClick={() => {
            if (auth?.isAuthenticated) return navigate("/dashboard");
            navigate("/signin");
          }}
        >
          <span className="text-primary-500">Get</span>
          <BoltIcon className="h-5 w-5 text-green-500" />
          <span className="text-primary-500">Started</span>
        </button>
      </section>
    </main>
  );
}

export default Home;
