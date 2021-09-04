// delete user account
const deleteUser = async (event) => {
  event.preventDefault();

  const userId = event.target.getAttribute("data-user-id");

  const response = await fetch(`/api/users/${userId}`, {
    method: "DELETE",
    body: "",
    headers: { "Content-Type": "application/json" },
  });

  if (response.status === 204) {
    document.location.replace("/");
  } else {
    alert("Fail to delete the user");
  }
};

document
  .getElementById("btn-delete-user")
  .addEventListener("click", deleteUser);
