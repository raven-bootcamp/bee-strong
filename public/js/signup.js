// sign user up

const signUserUp = async (event) => {
  event.preventDefault();

  const getInputValue = (input) => {
    if (input.type === "radio") {
      return input.checked ? input.value : null;
    }
    return input.value.trim();
  };

  const getUserData = (form) => {
    const textInputsEls = form.querySelectorAll("input");
    const result = [...textInputsEls].reduce((acc, input) => {
      const key = input.getAttribute("name");
      const value = getInputValue(input);
      return value ? { ...acc, [key]: value } : { ...acc };
    }, {});
    return result;
  };

  const form = event.target.closest("form");
  const userData = getUserData(form);
  if (!"client" in userData) return;

  console.log(userData);

  const response = await fetch(`/api/${userData.client}s/signup`, {
    method: "POST",
    body: JSON.stringify({
      ...userData,
      [`${userData.client}_name`]: userData.name,
    }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert("Fail to sign up");
  }
};

document.getElementById("signUpForm").addEventListener("submit", signUserUp);
