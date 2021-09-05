// delete course account
const deleteCourse = async (event) => {
  event.preventDefault();

  const courseId = event.target.getAttribute("data-course-id");

  const response = await fetch(`/api/courses/${courseId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    document.location.replace("/");
  } else {
    alert("Fail to delete the course");
  }
};

document.querySelectorAll(".btn-delete-course").forEach((btn) => {
  btn.addEventListener("click", deleteCourse);
});
