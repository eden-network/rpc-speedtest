export const scrollToBottom = () => {
  const element =
    document.getElementById("scrollAnchor") || document.documentElement;

  element.scrollIntoView({ block: "end" });
};
