// sign user up and go to dashboard

const signUserUp = async (event) => {
  event.preventDefault();

  const getUserData = (form) => {
    const textInputsEls = form.querySelectorAll(".form-control");
    const result = [...textInputsEls].reduce((acc, input) => {
      const key = input.getAttribute("name");
      const value = input.value.trim();
      return value ? { ...acc, [key]: value } : { ...acc };
    }, {});
    return result;
  };

  const form = event.target.closest("form");
  const radios = form.querySelectorAll(".form-check-input");
  const checked = [...radios].filter((radio) => radio.checked)[0];
  if (!checked) return;

  const userData = getUserData(form);
  const clientType = checked.value;
  const response = await fetch(`/api/${clientType}s/signup`, {
    method: "POST",
    body: JSON.stringify({
      ...userData,
      [`${clientType}_name`]: userData.name,
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
