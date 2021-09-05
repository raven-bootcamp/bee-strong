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

  // get tag data
  const getTagData = (tagInputs) => {
    const result = tagInputs.reduce((acc, input) => {
      if (input.checked) return [...acc, input.value];
      return [...acc];
    }, []);
    return result;
  };

  // get data from other fields
  const getOtherData = (otherInputs) => {
    const result = otherInputs.reduce((acc, input) => {
      const key = input.name;
      const value = getInputValue(input);
      return { ...acc, [key]: value };
    }, {});

    console.log(result);
    return result;
  };

  // get input data
  const getInputdata = (form) => {
    const inputs = form.querySelectorAll("input");
    const dataInputs = [...inputs].filter((input) =>
      input.hasAttribute("name")
    );
    const tagInputs = dataInputs.filter(({ name }) => name === "tags");
    const otherInputs = dataInputs.filter(({ name }) => name !== "tags");

    const tagData = getTagData(tagInputs);
    const otherData = getOtherData(otherInputs);
    const result = { ...otherData, tags: tagData };
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
