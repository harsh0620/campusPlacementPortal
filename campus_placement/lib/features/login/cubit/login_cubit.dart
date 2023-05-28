import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:meta/meta.dart';

import '../../../data/repository/repo.dart';

part 'login_state.dart';

class LoginCubit extends Cubit<LoginState> {
  final RemoteRepository _repository;

  LoginCubit(this._repository) : super(const LoginState());

  Future<void> login(String email, String password, String userType) async {
    emit(state.copyWith(loginStatus: LoginStatus.loading));
    final response = await _repository.loginUser(email, password, userType);
    if (response != null) {
      emit(state.copyWith(
        // user: response.user,
        token: response.token,
        loginStatus: LoginStatus.success,
      ));
    } else {
      emit(state.copyWith(loginStatus: LoginStatus.failure));
    }
  }

  void resetLoginState() => emit(const LoginState());
}
