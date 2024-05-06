import React from "react";
import AnimatePresence from "./AnimatePresence";
import { withLayoutAnimation } from "./withLayoutAnimation";

const AnimatedLayoutDiv = withLayoutAnimation("div");
const AnimatedLayoutButton = withLayoutAnimation("button");

const App = () => {
  const [toggle, setToggle] = React.useState(false);

  return (
    <>
      <AnimatePresence>
        <div className="flex h-screen w-full flex-col items-center justify-center bg-gray-900">
          <AnimatedLayoutButton
            layoutId="button"
            onClick={() => {
              setToggle(!toggle);
            }}
            className="mb-8 rounded bg-blue-500 px-4 py-2 text-white"
          >
            Toggle
          </AnimatedLayoutButton>

          {toggle ? (
            <>
              <AnimatedLayoutDiv
                layoutId="square"
                className="relative left-96 flex h-80 w-80 items-center justify-center bg-red-500"
              >
                {/* <AnimatedFlipComponent layoutId="hello"> */}
                <p className="font-bold text-white">Hello</p>
                {/* </AnimatedFlipComponent> */}
              </AnimatedLayoutDiv>
            </>
          ) : (
            <>
              <AnimatedLayoutDiv
                layoutId="square"
                className="relative right-96 flex h-40 w-40 items-center justify-center bg-red-500"
              >
                {/* <AnimatedFlipComponent layoutId="hello"> */}
                <p className="font-bold text-white">There</p>
                {/* </AnimatedFlipComponent> */}
              </AnimatedLayoutDiv>
            </>
          )}
        </div>
      </AnimatePresence>
    </>
  );
};

export default App;
