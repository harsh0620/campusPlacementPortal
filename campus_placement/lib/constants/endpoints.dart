class EndPoints {
  static const user = '';
  static const defaultEndPoint = '/default';
  static const login = '/api/v1/auth/login';
  static const registerStudentUser = '/api/v1/student/auth/register';
  static const logoutUser = '';
  static const getStudentHomeStats = '/api/v1/student/stats';
  static const getStudentProfileFilled =
      '/api/v1/student/calculateProfileFilledPercentage';
  static const getStudentProfileBasics = '/api/v1/student/basicDetails';
  static const getStudentProfilePersonal = '/api/v1/student/personalDetails';
  static const getStudentProfileAcademic = '/api/v1/student/academicDetails';
  static const getStudentProfileProfessional =
      '/api/v1/student/professionalDetails';
  static const searchCompaniesByStudent = '/api/v1/student/company';
  // static const getCompanyByIdByStudent = '/api/v1/student/company/${id}';
  static const searchJobsByStudent = '/api/v1/student/job';
  // static const applyJobByStudent = '/api/v1/student/apply/${jobId}';
}
