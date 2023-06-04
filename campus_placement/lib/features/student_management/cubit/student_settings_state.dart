part of 'student_settings_cubit.dart';

enum StudentSettingsGetBasicDetailsStatus { initial, loading, success, failure }

enum StudentSettingsUpdateBasicDetailsStatus {
  initial,
  loading,
  success,
  failure
}

enum StudentSettingsGetPersonalDetailsStudent {
  initial,
  loading,
  success,
  failure
}

enum StudentSettingsGetAcademicDetailsStudent {
  initial,
  loading,
  success,
  failure
}

enum StudentSettingsUpdatePersonalDetailsStudent {
  initial,
  loading,
  success,
  failure
}

class StudentSettingsState extends Equatable {
  final String? name;
  final String? enrollmentNo;
  final String? about;
  final StudentPersonalDetails? personalDetails;
  final StudentSettingsUpdatePersonalDetailsStudent?
      updatePersonalDetailsStatus;
  final StudentSettingsGetAcademicDetailsStudent?
      getAcademicDetailsStudentStatus;
  final Map<String, dynamic>? academicDetails;
  final StudentSettingsGetBasicDetailsStatus? getBasicStatus;
  final StudentSettingsUpdateBasicDetailsStatus? updateBasicStatus;
  final StudentSettingsGetPersonalDetailsStudent? getPersonalDetailsStatus;

  StudentSettingsState(
      {this.name,
      this.academicDetails,
      this.getAcademicDetailsStudentStatus =
          StudentSettingsGetAcademicDetailsStudent.initial,
      this.personalDetails,
      this.getPersonalDetailsStatus =
          StudentSettingsGetPersonalDetailsStudent.initial,
      this.updatePersonalDetailsStatus =
          StudentSettingsUpdatePersonalDetailsStudent.initial,
      this.updateBasicStatus = StudentSettingsUpdateBasicDetailsStatus.initial,
      this.enrollmentNo,
      this.about,
      this.getBasicStatus = StudentSettingsGetBasicDetailsStatus.initial});

  StudentSettingsState copyWith(
      {String? name,
      Map<String, dynamic>? academicDetails,
      StudentSettingsGetAcademicDetailsStudent? getAcademicDetailsStudentStatus,
      StudentSettingsUpdateBasicDetailsStatus? updateBasicStatus,
      String? enrollmentNo,
      StudentPersonalDetails? personalDetails,
      StudentSettingsUpdatePersonalDetailsStudent? updatePersonalDetailsStatus,
      StudentSettingsGetPersonalDetailsStudent? getPersonalDetailsStatus,
      String? about,
      StudentSettingsGetBasicDetailsStatus? getBasicStatus}) {
    return StudentSettingsState(
        getAcademicDetailsStudentStatus: getAcademicDetailsStudentStatus ??
            this.getAcademicDetailsStudentStatus,
        academicDetails: academicDetails ?? this.academicDetails,
        updatePersonalDetailsStatus:
            updatePersonalDetailsStatus ?? this.updatePersonalDetailsStatus,
        getPersonalDetailsStatus:
            getPersonalDetailsStatus ?? this.getPersonalDetailsStatus,
        personalDetails: personalDetails ?? this.personalDetails,
        updateBasicStatus: updateBasicStatus ?? this.updateBasicStatus,
        getBasicStatus: getBasicStatus ?? this.getBasicStatus,
        name: name ?? this.name,
        enrollmentNo: enrollmentNo ?? this.enrollmentNo,
        about: about ?? this.about);
  }

  @override
  // TODO: implement props
  List<Object?> get props => [
        name,
        enrollmentNo,
        getAcademicDetailsStudentStatus,
        about, academicDetails,
        // updateBasicStatus,
        personalDetails,
        getPersonalDetailsStatus,
        // updatePersonalDetailsStatus
      ];
}



// class StudentSettingsInitial extends StudentSettingsState {}
