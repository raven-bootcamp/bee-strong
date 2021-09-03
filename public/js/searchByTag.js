// get all courses with the tag and then display
const searchByTag = async (event) => {
  event.preventDefault();

  // check that it is search button
  if (!event.target.classList.contains("btn-search")) return;
  const tagName = event.target.getAttribute("data-tag-name");
  document.location.replace(`/results?tag_name=${tagName}`);
};

document.getElementById("search-bar").addEventListener("click", searchByTag);
