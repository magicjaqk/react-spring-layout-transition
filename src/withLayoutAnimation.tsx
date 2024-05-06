import React from "react";
import {
  type ElementType,
  type SpringConfig,
  animated,
  easings,
  useSpring,
} from "@react-spring/web";
import { useAnimatePresence } from "./AnimatePresence";

interface AnimatedFlipProps {
  children: React.ReactNode;
  layoutId: string;
  config?: SpringConfig;
}

export const withLayoutAnimation = (component: ElementType) => {
  const AnimatedElement = animated(component);

  return function AnimatedFlip({
    layoutId,
    children,
    ...props
  }: AnimatedFlipProps & typeof AnimatedElement.defaultProps) {
    const defaultConfig = {
      easing: easings.easeInOutExpo,
      duration: 1000,
    };

    // const [elementRef, elementRect] = useMeasure();
    const itemRef = React.useRef<HTMLElement>(null);
    const { layoutMap } = useAnimatePresence();

    const [spring, springApi] = useSpring(() => ({
      x: 0,
      y: 0,
      scaleX: 1,
      scaleY: 1,
      transformOrigin: "50% 50%",
      config: props.config ?? defaultConfig,
      onChange: () => {
        if (itemRef.current) {
          const currentRect = itemRef.current.getBoundingClientRect();

          // const currentRectCenter = {
          //   x: currentRect.left + currentRect.width / 2,
          //   y: currentRect.top + currentRect.height / 2,
          // };
          // console.log("onChange", layoutId, currentRectCenter.x);

          layoutMap.set(layoutId, currentRect);
        }
      },
    }));

    React.useLayoutEffect(() => {
      // Update layoutMap on mount
      if (itemRef.current && !layoutMap.has(layoutId)) {
        layoutMap.set(layoutId, itemRef.current.getBoundingClientRect());
      }

      // Update the spring on mount
      const originalElementRect = layoutMap.get(layoutId);
      if (itemRef.current && originalElementRect) {
        const currentRect = itemRef.current.getBoundingClientRect();
        const currentRectCenter = {
          x: currentRect.left + currentRect.width / 2,
          y: currentRect.top + currentRect.height / 2,
        };
        const originalRectCenter = {
          x: originalElementRect.left + originalElementRect.width / 2,
          y: originalElementRect.top + originalElementRect.height / 2,
        };

        const deltaX = originalRectCenter.x - currentRectCenter.x;
        const deltaY = originalRectCenter.y - currentRectCenter.y;
        const deltaScaleX = originalElementRect.width / currentRect.width;
        const deltaScaleY = originalElementRect.height / currentRect.height;

        springApi.start({
          x: deltaX,
          y: deltaY,
          scaleX: deltaScaleX,
          scaleY: deltaScaleY,
          immediate: true,
        });
      }
    }, []);

    // Animation on render
    React.useLayoutEffect(() => {
      const originalElementRect = layoutMap.get(layoutId);

      // console.log(
      //   "bool",
      //   originalElementRect,
      //   itemRef.current?.getBoundingClientRect(),
      //   !deepEqual(
      //     itemRef.current?.getBoundingClientRect(),
      //     originalElementRect,
      //   ),
      // );
      if (
        originalElementRect &&
        itemRef.current &&
        !deepEqual(
          itemRef.current?.getBoundingClientRect(),
          originalElementRect,
        )
      ) {
        const currentRect = itemRef.current.getBoundingClientRect();
        const currentRectCenter = {
          x: currentRect.left + currentRect.width / 2,
          y: currentRect.top + currentRect.height / 2,
        };
        const originalRectCenter = {
          x: originalElementRect.left + originalElementRect.width / 2,
          y: originalElementRect.top + originalElementRect.height / 2,
        };

        const deltaX = originalRectCenter.x - currentRectCenter.x;
        const deltaY = originalRectCenter.y - currentRectCenter.y;
        const deltaScaleX = originalElementRect.width / currentRect.width;
        const deltaScaleY = originalElementRect.height / currentRect.height;

        console.log({
          layoutId,
          old: { ...originalRectCenter },
          target: { ...currentRectCenter },
          // currentRect,
          // deltaX,
          // deltaY,
          // deltaScaleX,
          // deltaScaleY,
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
        });
      }
    });

    // Resize listener
    React.useEffect(() => {
      const updateRectOnResize = () => {
        if (itemRef.current) {
          layoutMap.set(layoutId, itemRef.current.getBoundingClientRect());
        }
      };

      window.addEventListener("resize", updateRectOnResize);

      return () => {
        window.removeEventListener("resize", updateRectOnResize);
      };
    }, []);

    return (
      <AnimatedElement ref={itemRef} style={spring} {...props}>
        <animated.div
          style={{
            scaleX: spring.scaleX.to((value) => 1 / value),
            scaleY: spring.scaleY.to((value) => 1 / value),
            // x: spring.x.to((value) => -value * (1 / spring.scaleX.get())),
            // y: spring.y.to((value) => -value * (1 / spring.scaleY.get())),
          }}
        >
          {children}
        </animated.div>
      </AnimatedElement>
    );
  };
};

// Functions
function deepEqual(obj1: any, obj2: any) {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}

function uuid() {
  return Math.random().toString(36).substring(7);
}
