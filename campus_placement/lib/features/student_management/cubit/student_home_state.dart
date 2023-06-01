part of 'student_home_cubit.dart';

// class StudentHomeInitial extends StudentHomeState {}

enum StudentHomeStatsStatus { initial, loading, success, failure }

enum StudentHomeProfileStatus { initial, loading, success, failure }

class StudentHomeState {
  final StudentHomeStatsStatus studentHomeStatsStatus;
  final StudentHomeProfileStatus studentHomeProfileStatus;
  final Map<String, dynamic>? stats;
  final String? profileFilled;

  const StudentHomeState(
      {this.studentHomeStatsStatus = StudentHomeStatsStatus.initial,
      this.studentHomeProfileStatus = StudentHomeProfileStatus.initial,
      this.stats,
      this.profileFilled});

  StudentHomeState copyWith(
      {StudentHomeStatsStatus? studentHomeStatsStatus,
      StudentHomeProfileStatus? studentHomeProfileStatus,
      Map<String, dynamic>? stats,
      String? profileFilled}) {
    return StudentHomeState(
        profileFilled: profileFilled ?? this.profileFilled,
        studentHomeStatsStatus:
            studentHomeStatsStatus ?? this.studentHomeStatsStatus,
        studentHomeProfileStatus:
            studentHomeProfileStatus ?? this.studentHomeProfileStatus,
        stats: stats ?? this.stats);
  }

  @override
  List<Object?> get props =>
      [stats, studentHomeProfileStatus, studentHomeStatsStatus, profileFilled];
}
