const updateCourse = async (event) => {
  event.preventDefault();

  // get course id or create new course
  // return int - course id
  const getCourseId = async (form, courseData) => {
    const courseId = form.getAttribute("data-course-id");
    if (courseId) return courseId; // update only

    const response = await fetch(`/api/courses/create`, {
      method: "POST",
      body: JSON.stringify(courseData),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      const data = await response.json();
      return data.id; // create new course
    } else {
      return null; // error
    }
  };

  // get input value depending on their type
  const getInputValue = (input) => {
    if (input.type === "checkbox") return input.checked;
    return input.value.trim();
  };

  // get input data
  const getInputdata = (form) => {
    const inputs = form.querySelectorAll("input");
    const result = [...inputs].reduce((acc, input) => {
      if (input.hasAttribute("name")) {
        const key = input.name;
        const value = getInputValue(input);
        return value ? { ...acc, [key]: value } : { ...acc };
      }
      return { ...acc };
    }, {});
    return result;
  };

  // reset the form
  const resetForm = (form) => {
    form.setAttribute("data-course-id", "");
    form.reset();
    const modalEl = form.closest(".modal");
    const modal = bootstrap.Modal.getInstance(modalEl);
    modal.hide();
  };

  // update course
  const updateDatabase = async (data, courseId) => {
    const response = await fetch(`/api/courses/${courseId}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      const data = await response.json();
      console.error(data);
    }
    return true;
  };

  // -----------------------------------------
  // combine

  const form = event.target.closest("form");
  const courseData = getInputdata(form);
  const courseId = await getCourseId(form, courseData);

  if (!courseId) {
    alert("Incomplete form");
    return;
  }
  await updateDatabase(courseData, courseId);
  document.location.reload();
  resetForm(form);
};

document
  .getElementById("course-update-form")
  .addEventListener("submit", updateCourse);
