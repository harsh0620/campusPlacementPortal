import 'package:equatable/equatable.dart';
import 'package:hydrated_bloc/hydrated_bloc.dart';
import 'package:json_annotation/json_annotation.dart';

import '../../data/repository/repo.dart';

part 'auth_bloc.g.dart';
part 'auth_event.dart';
part 'auth_state.dart';

class AuthBloc extends HydratedBloc<AuthEvent, AuthState> {
  final RemoteRepository _repository;
  AuthBloc(this._repository) : super(const AuthState()) {
    on<LoginEvent>((event, emit) {
      emit(AuthState(accessToken: event.token, user: event.user));
    });
    on<LogoutEvent>((event, emit) async {
      await _repository.logoutUser();
      emit(const AuthState());
    });
  }

  @override
  AuthState fromJson(Map<String, dynamic> json) => AuthState.fromJson(json);

  @override
  Map<String, dynamic> toJson(AuthState state) => state.toJson();
}
