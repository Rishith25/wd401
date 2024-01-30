const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  //API Endpoint for sign-up
  try {
    const response = await fetch(`${API_ENDPOINT}/organisations`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: organisationName,
        user_name: userName,
        email: userEmail,
        password: userPassword,
      }),
    });

    console.log("This is from Branch");

    if (!response.ok) {
      throw new Error(`Sign-up failed with status ${response.status}`);
    }
    //If signup successful
    console.log("Sign-up successful");
    //Token saved to Localstorage
    const data = await response.json();
    localStorage.setItem("authToken", data.token);
    localStorage.setItem("userData", JSON.stringify(data.user));
    const navigate = (path: string) => {
      // Your navigation logic here
    };
    navigate("/dashboard");
  } catch (error) {
    console.error("Sign-up failed:", error);
  }
};
