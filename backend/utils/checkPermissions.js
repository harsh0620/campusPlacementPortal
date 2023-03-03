/*CHECK PERMISSION FUNCTION TO VERIFY WHETHER THE USER 
CALLING FOR THE REQUEST HAS ACCESS TO DO IT OR NOT*/

const checkPermissions = (requestUser, resourceUserId) => {
  // if (requestUser.role === 'admin') return
  if (requestUser.userId === resourceUserId.toString()) return;
  throw new CustomError.UnAuthenticatedError(
    "Not authorized to access this route"
  );
};

export default checkPermissions;
