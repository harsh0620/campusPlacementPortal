import 'package:bloc/bloc.dart';
import 'package:campus_placement/data/repository/repo.dart';
import 'package:meta/meta.dart';

part 'student_home_state.dart';

class StudentHomeCubit extends Cubit<StudentHomeState> {
  final RemoteRepository _remoteRepository;
  StudentHomeCubit(this._remoteRepository) : super(StudentHomeState());

  Future<void> getStats() async {
    emit(
        state.copyWith(studentHomeStatsStatus: StudentHomeStatsStatus.loading));
    final response = await _remoteRepository.getStudentStats();
    if (response != null) {
      emit(state.copyWith(
          stats: response,
          studentHomeStatsStatus: StudentHomeStatsStatus.success));
    } else {
      emit(state.copyWith(
          studentHomeStatsStatus: StudentHomeStatsStatus.failure));
    }
  }

  Future<void> getProfileFilled() async {
    emit(state.copyWith(
        studentHomeProfileStatus: StudentHomeProfileStatus.loading));
    final response = await _remoteRepository.getProfileFilled();
    if (response != null) {
      emit(state.copyWith(
          profileFilled: response,
          studentHomeProfileStatus: StudentHomeProfileStatus.success));
    } else {
      emit(state.copyWith(
          studentHomeProfileStatus: StudentHomeProfileStatus.failure));
    }
  }
}
