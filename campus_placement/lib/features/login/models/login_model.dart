import 'package:equatable/equatable.dart';
import 'package:json_annotation/json_annotation.dart';

part 'login_model.g.dart';

@JsonSerializable(explicitToJson: true)
class LoginResponse extends Equatable {
  final String token;
  final Object user;
//
  const LoginResponse({
    required this.token,
    required this.user,
  });

  // factory LoginResponse.fromJson(Map<String, dynamic> json) {
  //   return LoginResponse(
  //     token: json['token'] as String,
  //     user: json['user'] as Map<String, dynamic>,
  //   );
  // }
  factory LoginResponse.fromJson(Map<String, dynamic> json) {
    return _$LoginResponseFromJson(json);
  }

  Map<String, dynamic> toJson() => _$LoginResponseToJson(this);

  // LoginResponse _$LoginResponseFromJson(Map<String, dynamic> json) =>
  //     LoginResponse(
  //       token: json['token'] as String,
  //       user: json['user'] as Map<String, dynamic>,
  //     );

  // Map<String, dynamic> _$LoginResponseToJson(LoginResponse instance) =>
  //     <String, dynamic>{
  //       'token': instance.token,
  //       'user': instance.user,
  //     };
  @override
  List<Object?> get props => [token];
}
