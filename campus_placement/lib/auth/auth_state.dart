part of 'auth_bloc.dart';

@JsonSerializable(explicitToJson: true)
class AuthState extends Equatable {
  const AuthState({this.accessToken, this.user});

  final String? accessToken;
  final Object? user;

  @override
  List<Object?> get props => [accessToken, user];

  static AuthState fromJson(Map<String, dynamic> json) =>
      _$AuthStateFromJson(json);

  bool get isAuthenticated {
    return accessToken?.isNotEmpty == true && user != null;
  }

  Map<String, dynamic> toJson() => _$AuthStateToJson(this);
}
