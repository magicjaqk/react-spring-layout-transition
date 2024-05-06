import React from "react";
import AnimatedFlipComponent from "./AnimatedFlip";
import AnimatePresence from "./AnimatePresence";

const App = () => {
  const [toggle, setToggle] = React.useState(false);

  return (
    <AnimatePresence>
      <div className="flex h-screen w-full flex-col items-center justify-center bg-gray-900">
        <AnimatedFlipComponent layoutId="button">
          <button
            onClick={() => {
              setToggle(!toggle);
            }}
            className="mb-8 rounded bg-blue-500 px-4 py-2 text-white"
          >
            Toggle
          </button>
        </AnimatedFlipComponent>

        {toggle ? (
          <>
            <AnimatedFlipComponent
              layoutId="square"
              className="ml-80 h-40 w-96 bg-red-500"
            >
              {/* <AnimatedFlipComponent layoutId="hello"> */}
              <p className="font-bold text-white">Hello</p>
              {/* </AnimatedFlipComponent> */}
            </AnimatedFlipComponent>
          </>
        ) : (
          <>
            <AnimatedFlipComponent
              layoutId="square"
              className="relative mr-80 h-10 w-10 bg-red-500"
            >
              {/* <AnimatedFlipComponent layoutId="hello"> */}
              <p className="font-bold text-white">Hello</p>
              {/* </AnimatedFlipComponent> */}
            </AnimatedFlipComponent>
          </>
        )}
      </div>
    </AnimatePresence>
  );
};

export default App;
