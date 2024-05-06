import React from "react";

interface Rect extends DOMRect {}

const AnimatePresenceContext = React.createContext({
  layoutMap: new Map<string, Rect>(),
});

interface AnimatePresenceInterface {
  children: React.ReactNode;
}
export default function AnimatePresence(props: AnimatePresenceInterface) {
  const [layoutMap] = React.useState(new Map<string, Rect>());

  return (
    <AnimatePresenceContext.Provider value={{ layoutMap }}>
      {props.children}
    </AnimatePresenceContext.Provider>
  );
}

export const useAnimatePresence = () =>
  React.useContext(AnimatePresenceContext);
