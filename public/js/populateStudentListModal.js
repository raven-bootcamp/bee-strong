const populateStudentList = async (event) => {
  event.preventDefault();

  // create table row
  const createTableRow = (studentData) => {
    const tr = document.createElement("tr");
    const th = document.createElement("th");
    th.setAttribute("scope", "row");
    th.textContent = studentData.id;
    const td = document.createElement("td");
    td.textContent = studentData.student_name;
    tr.appendChild(th);
    tr.appendChild(td);
    return tr;
  };

  // populate the table body with student data
  const populateTable = (data, table) => {
    const tbody = table.querySelector("tbody");
    if (tbody) tbody.remove();

    const newTbody = document.createElement("tbody");
    data.forEach((student) => {
      const tr = createTableRow(student);
      newTbody.appendChild(tr);
    });
    table.appendChild(newTbody);
  };

  // ---------------------------------
  // combine
  const courseId = event.target.getAttribute("data-course-id");
  const modalId = event.target.getAttribute("data-bs-target");
  const modal = document.querySelector(modalId);
  const table = modal.querySelector("table");

  const response = await fetch(`/api/courses/${courseId}/students`, {
    method: "GET",
  });
  const data = await response.json();

  if (response.ok) {
    populateTable(data, table);
  } else {
    console.log(data);
  }
};

document.querySelectorAll(".btn-course-student").forEach((button) => {
  button.addEventListener("click", populateStudentList);
});
