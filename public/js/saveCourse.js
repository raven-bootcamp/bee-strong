// add student to this course
const saveCourse = async (event) => {
  event.preventDefault();

  const btn = event.target.closest("button");
  if (!btn) return;
  if (!btn.hasAttribute("data-course-id")) return;
  const courseId = btn.getAttribute("data-course-id");

  const response = await fetch(`/api/courses/${courseId}/students`, {
    method: "POST",
    body: JSON.stringify({ add: true }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/dashboard"); ///// NOT SURE WHERE TO GO
  } else {
    alert(response.message);
  }
};

document
  .getElementById("result-container")
  .addEventListener("click", saveCourse);
