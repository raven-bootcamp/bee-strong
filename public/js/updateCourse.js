const populateUpdateCourseModal = async (event) => {
  event.preventDefault();

  // populate existing data to modal
  const populateData = (modal, courseData) => {
    const inputs = modal.querySelectorAll("input");

    const saveBtn = modal.querySelector(".btn-save-course");
    saveBtn.setAttribute("data-course-id", courseData.id);

    const keys = Object.keys(data);
    keys.map((key) => {
      const input = [...inputs].find((i) => i.name === key);
      if (!input) return;
      if (input.type === "checkbox") {
        input.checked = courseData[key];
      } else {
        input.value = courseData[key];
      }
    });
  };

  const courseId = event.target.getAttribute("data-course-id");
  const modalId = event.target.getAttribute("data-bs-target");
  const modal = document.querySelector(modalId);
  const response = await fetch(`/api/courses/${courseId}`, {
    method: "GET",
  });
  const data = await response.json();

  if (response.ok) {
    populateData(modal, data);
  } else {
    console.log(data);
  }
};

document.querySelectorAll(".btn-update-course").forEach((button) => {
  button.addEventListener("click", populateUpdateCourseModal);
});
