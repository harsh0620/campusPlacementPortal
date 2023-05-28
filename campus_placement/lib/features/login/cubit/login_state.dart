part of 'login_cubit.dart';

enum LoginStatus { initial, loading, success, failure }

enum ForgetPassword { initial, loading, success, failure }

enum OtpStatus { initial, loading, success, failure }

enum ConfirmPasswordStatus { initial, loading, success, failure }

class LoginState extends Equatable {
  final LoginStatus loginStatus;
  final ForgetPassword forgetPassword;
  final OtpStatus otpStatus;
  final ConfirmPasswordStatus confirmPasswordStatus;
  final Object? user;
  final String? token;
  final String? errorMessage;

  const LoginState(
      {this.confirmPasswordStatus = ConfirmPasswordStatus.initial,
      this.loginStatus = LoginStatus.initial,
      this.forgetPassword = ForgetPassword.initial,
      this.otpStatus = OtpStatus.initial,
      this.user,
      this.token,
      this.errorMessage});

  LoginState copyWith(
      {LoginStatus? loginStatus,
      ConfirmPasswordStatus? confirmPasswordStatus,
      ForgetPassword? forgetPassword,
      OtpStatus? otpStatus,
      Object? user,
      String? token,
      String? errorMessage}) {
    return LoginState(
        confirmPasswordStatus:
            confirmPasswordStatus ?? this.confirmPasswordStatus,
        loginStatus: loginStatus ?? this.loginStatus,
        forgetPassword: forgetPassword ?? this.forgetPassword,
        otpStatus: otpStatus ?? this.otpStatus,
        user: user ?? this.user,
        token: token ?? this.token,
        errorMessage: errorMessage ?? this.errorMessage);
  }

  @override
  List<Object?> get props => [
        loginStatus,
        forgetPassword,
        otpStatus,
        confirmPasswordStatus,
        errorMessage
      ];
}
