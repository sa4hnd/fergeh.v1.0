
    setIgnoreMouse(true);
    setSelectionIndex((i) => {
      const next = i > 0 ? i - 1 : filteredEvents.length - 1;
      const scrollTo =
        next == filteredEvents.length - 1
          ? next
          : Math.max(selectionIndex - 1, 0);

      if (!isScrolledIntoView(resultsRef.current[scrollTo]!))
        resultsRef.current[scrollTo]!.scrollIntoView();

      return next;
    });
  };

  useShortcut(["ArrowUp"], up, {
    ctrlKey: false,
  });
  useShortcut(["Tab"], up, {
    ctrlKey: false,
    shiftKey: "Tab",
  });

  useShortcut(
    ["Enter"],
    () => {
      if (!!filteredEvents.length) onSubmit(false);
    },
    {
      ctrlKey: false,
    },
  );
  useShortcut(
    ["Enter"],
    () => {
      if (!!filteredEvents.length) onSubmit(true);
    },
    {
      ctrlKey: true,
    },
  );

  return <></>;
};