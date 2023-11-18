import React from "react";
import Testbox from "../../components/Testbox/Testbox";
import Classbox from "../../components/classbox/classbox";
import teach from "../../assets/teach.jpg";
import { useStateContext }from "../../context/StateContext";

export default function Home() {
  React.useEffect(() => {
    if(!localStorage.getItem('uid') || localStorage.getItem('uid') == ''){
      window.location.replace('/login')
    }
  }, [])
  const {classes, tests, userDetails} = useStateContext()
  return (
    <div className="h-screen mx-auto px-4 mt-16">
      <h1 className="font-bold text-2xl text-teal-500 ml-3 mt-2">
        Recent Tests
      </h1>
      <div className="flex flex-wrap justify-between ">
        {tests && tests.map(test => (
          <Testbox test={test}/>
        ))
        }
      </div>

      <h1 className="font-bold text-2xl text-teal-500 ml-3 mt-4">Classes</h1>
      <div className="flex flex-wrap justify-between md:space-x-4">
        {classes && classes.map((cls) => (
          <Classbox section={cls}/>
        ))
        }
      </div>
      <img src={teach} alt="teach" className="w-full mt-[6rem]" />
    </div>
  );
}
