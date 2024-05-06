import React from "react";
import AnimatedFlipComponent from "./AnimatedFlip";
import AnimatePresence from "./AnimatePresence";

type Props = {};

const App = (props: Props) => {
  const [toggle, setToggle] = React.useState(false);

  return (
    <AnimatePresence>
      <div className="flex h-screen w-full flex-col items-center justify-center bg-gray-900">
        <AnimatedFlipComponent layoutId="button">
          <button
            onClick={() => {
              setToggle(!toggle);
            }}
            className="rounded bg-blue-500 px-4 py-2 text-white"
          >
            Toggle
          </button>
        </AnimatedFlipComponent>

        {toggle ? (
          <>
            <AnimatedFlipComponent
              layoutId="square"
              className="relative left-40"
            >
              <div className="h-40 w-96 bg-red-500"></div>
            </AnimatedFlipComponent>
          </>
        ) : (
          <>
            <AnimatedFlipComponent
              layoutId="square"
              className="relative right-40"
            >
              <div className="relative h-10 w-10 bg-red-500"></div>
            </AnimatedFlipComponent>
          </>
        )}
      </div>
    </AnimatePresence>
  );
};

export default App;
