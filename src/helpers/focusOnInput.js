export const focusOnInput = (inputId) => {
  const el = document.getElementById(inputId).scrollIntoView({
    behavior: "smooth",
  });
};
