// sign user up and go to dashboard

const signUserUp = async (event) => {
  event.preventDefault();

  const getUserData = (form) => {
    const textInputsEls = form.querySelectorAll("input");
    const result = [...textInputsEls].reduce((acc, input) => {
      const key = input.getAttribute("name");
      const value = input.value.trim();
      return value ? { ...acc, [key]: value } : { ...acc };
    }, {});
    return result;
  };

  const form = event.target.closest("form");
  const userData = getUserData(form);
  if (!"client" in userData) return;
  const response = await fetch(`/api/${userData.client}s/signup`, {
    method: "POST",
    body: JSON.stringify({
      ...userData,
      [`${userData.client}_name`]: userData.name,
    }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/dashboard"); /////  NOT SURE WHERE TO GO
  } else {
    alert("Fail to sign up ");
  }
};

document.getElementById("signUpForm").addEventListener("submit", signUserUp);
