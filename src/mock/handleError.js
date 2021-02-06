function handleError(error) {
  if (error.response.status == 409) {
    alert("Oops! already exist");
    return;
  }
  if (error.response.status == 500) {
    alert("Server Error, please try again");
    return;
  }

  if (error.response.status == 401) {
    alert("Password or username incorrect");
    return;
  }

  if (error.response.status == 400) {
    alert("Ensure all fields are filled");
    return;
  }
  if (error.response.status == 404) {
    alert("not found");
  }
}
export default handleError;
