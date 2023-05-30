import 'package:bloc/bloc.dart';
import 'package:meta/meta.dart';

import '../../../data/repository/repo.dart';

part 'register_student_state.dart';

class RegisterStudentCubit extends Cubit<RegisterStudentState> {
  final RemoteRepository _repository;
  RegisterStudentCubit(this._repository) : super(const RegisterStudentState());

  Future<void> registerStudent(
      {required String email,
      required String password,
      required String enrollmentNo,
      required String studentName}) async {
    emit(state.copyWith(registerStudentStatus: RegisterStudentStatus.loading));
    final response = await _repository.registerStudentUser(
        email, password, enrollmentNo, studentName);
    if (response != null) {
      emit(state.copyWith(
        user: response.user,
        token: response.token,
        registerStudentStatus: RegisterStudentStatus.success,
      ));
    } else {
      emit(
          state.copyWith(registerStudentStatus: RegisterStudentStatus.failure));
    }
  }
}
