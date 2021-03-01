function handleError(error) {
  if (error.response.status == 409) {
    this.$toasted.error("Oops! already exist");
    return;
  }
  if (error.response.status == 500) {
    this.$toasted.error("Server Error, please try again");
    return;
  }

  if (error.response.status == 401) {
    this.$toasted.error("Password or username incorrect");
    return;
  }

  if (error.response.status == 400) {
    this.$toasted.error("Ensure all fields are filled");
    return;
  }
  if (error.response.status == 404) {
    this.$toasted.error("not found");
  }
}
export default handleError;
