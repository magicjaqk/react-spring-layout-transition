import React from "react";
import { SpringConfig, animated, easings, useSpring } from "@react-spring/web";
import { useAnimatePresence } from "./AnimatePresence";

interface AnimatedFlipProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  layoutId: string;
  config?: SpringConfig;
}
function AnimatedFlip({ layoutId, ...props }: AnimatedFlipProps) {
  const defaultConfig = {
    // easing: easings.easeInOutExpo,
    // duration: 1000,
  };
  const itemRef = React.useRef<HTMLDivElement>(null);

  const { layoutMap } = useAnimatePresence();
  const originalElementRect = layoutMap.get(layoutId);

  const [spring, springApi] = useSpring(() => ({
    x: 0,
    y: 0,
    scaleX: 1,
    scaleY: 1,
    transformOrigin: "top left",
    config: props.config ?? defaultConfig,
  }));

  React.useLayoutEffect(() => {
    if (originalElementRect && itemRef.current) {
      const currentRect = itemRef.current.getBoundingClientRect();
      const deltaX = originalElementRect.left - currentRect.left;
      const deltaY = originalElementRect.top - currentRect.top;
      const deltaScaleX = originalElementRect.width / currentRect.width;
      const deltaScaleY = originalElementRect.height / currentRect.height;

      console.log({
        currentRect,
        deltaX,
        deltaY,
        deltaScaleX,
        deltaScaleY,
      });

      springApi.start({
        from: {
          x: deltaX,
          y: deltaY,
          scaleX: deltaScaleX,
          scaleY: deltaScaleY,
        },
        to: {
          x: 0,
          y: 0,
          scaleX: 1,
          scaleY: 1,
        },
        config: props.config ?? defaultConfig,

        onChange: () => {
          if (itemRef.current) {
            const currentRect = itemRef.current.getBoundingClientRect();

            layoutMap.set(layoutId, currentRect);
          }
        },
      });
    } else {
      // Do nothing
      return;
    }

    return () => {};
  }, [originalElementRect, springApi]);

  React.useLayoutEffect(() => {
    if (!originalElementRect && itemRef.current) {
      layoutMap.set(layoutId, itemRef.current.getBoundingClientRect());
    }
  }, []);

  return (
    <animated.div style={{ ...spring }} {...props}>
      <div ref={itemRef} className="relative h-auto w-auto">
        {props.children}
      </div>
    </animated.div>
  );
}

export default AnimatedFlip;
