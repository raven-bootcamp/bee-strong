const populateUpdateCourseModal = async (event) => {
  event.preventDefault();

  // populate checkboxes for tags
  const populateTagCheckboxes = (inputs, courseData) => {
    const { tags } = courseData;
    const tagIds = tags.map(({ id }) => id);
    const tagInputs = inputs.filter(({ name }) => name === "tags");
    tagInputs.forEach((input) => {
      console.log(input.value);
      input.checked = tagIds.includes(parseInt(input.value)) ? true : false;
    });
  };

  // populate other input fields (not tags)
  const populateOtherInputs = (inputs, courseData) => {
    const otherInputs = inputs.filter(({ name }) => name !== "tags");
    const { tags, ...withoutTags } = courseData;
    const keys = Object.keys(withoutTags);
    keys.map((key) => {
      const input = otherInputs.find((i) => i.name === key);
      if (!input) return;
      if (input.type === "checkbox") {
        input.checked = withoutTags[key];
      } else {
        input.value = withoutTags[key];
      }
    });
  };

  // populate existing data to modal
  const populateForm = (modal, courseData) => {
    const inputs = modal.querySelectorAll("input");
    const dataInputs = [...inputs].filter((input) =>
      input.hasAttribute("name")
    );
    populateTagCheckboxes(dataInputs, courseData);
    populateOtherInputs(dataInputs, courseData);

    const form = modal.querySelector("#course-update-form");
    form.setAttribute("data-course-id", courseData.id);
  };

  //-----------------------------
  // Combine
  const courseId = event.target.getAttribute("data-course-id");
  const modalId = event.target.getAttribute("data-bs-target");
  const modal = document.querySelector(modalId);
  const response = await fetch(`/api/courses/${courseId}`, {
    method: "GET",
  });
  const data = await response.json();

  if (response.ok) {
    populateForm(modal, data);
  } else {
    console.log(data);
  }
};

document.querySelectorAll(".btn-update-course").forEach((button) => {
  button.addEventListener("click", populateUpdateCourseModal);
});
