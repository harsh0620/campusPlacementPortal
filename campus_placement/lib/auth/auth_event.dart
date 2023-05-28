part of 'auth_bloc.dart';

abstract class AuthEvent extends Equatable {
  const AuthEvent();
  @override
  List<Object?> get props => [];
}

class LoginEvent extends AuthEvent {
  final String token;
  final Object user;

  const LoginEvent({required this.user, required this.token});

  @override
  List<Object?> get props => [user, token];
}

class LogoutEvent extends AuthEvent {}
