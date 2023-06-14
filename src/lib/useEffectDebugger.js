import { useEffect, useRef } from "react";

const usePrevious = (value, initialValue) => {
  const ref = useRef(initialValue);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

const useEffectDebugger = (effectHook, dependencies, dependencyNames = []) => {
  const previousDeps = usePrevious(dependencies, []);

  const changedDeps = dependencies.reduce((acc, dependency, index) => {
    if (dependency !== previousDeps[index]) {
      const keyName = dependencyNames[index] || index;
      return {
        ...acc,
        [keyName]: {
          before: previousDeps[index],
          after: dependency,
        },
      };
    }

    return acc;
  }, {});

  useEffect(effectHook, [...dependencies, effectHook]);
};

export default useEffectDebugger;
