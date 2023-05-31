part of 'register_student_cubit.dart';

enum RegisterStudentStatus { initial, loading, success, failure }

class RegisterStudentState {
  final RegisterStudentStatus registerStudentStatus;
  final user;
  final String? token;
  final String? errorMessage;

  const RegisterStudentState(
      {this.registerStudentStatus = RegisterStudentStatus.initial,
      this.user,
      this.token,
      this.errorMessage});

  RegisterStudentState copyWith(
      {RegisterStudentStatus? registerStudentStatus,
      user,
      String? token,
      String? errorMessage}) {
    return RegisterStudentState(
        registerStudentStatus:
            registerStudentStatus ?? this.registerStudentStatus,
        user: user ?? this.user,
        token: token ?? this.token,
        errorMessage: errorMessage ?? this.errorMessage);
  }

  @override
  List<Object?> get props => [registerStudentStatus, errorMessage];
}

// class RegisterStudentInitial extends RegisterStudentState {}
