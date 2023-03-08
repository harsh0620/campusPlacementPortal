const checkPermissionsCompany = (requestUser, resourceUserId) => {
  if (requestUser.role === "admin") return;
  if (requestUser.userId === resourceUserId.toString()) return;
  res
    .status(StatusCodes.UNAUTHORIZED)
    .json({ message: "Not authorized to access this route" });
  return;
};

export default checkPermissionsCompany;
