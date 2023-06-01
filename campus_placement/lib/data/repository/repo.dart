import 'package:flutter/foundation.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../../constants/endpoints.dart';
import '../../core/dio/dio_client.dart';
import '../../features/login/models/login_model.dart';

abstract class RemoteRepository {
  Future<LoginResponse?> loginUser(
    String email,
    String password,
    String userType,
  );
  Future<LoginResponse?> registerStudentUser(
      String email, String password, String enrollmentNo, String studentName);
  Future<void> logoutUser();

  Future<Map<String, dynamic>?> getStudentStats();
  Future<String?> getProfileFilled();
}

class RemoteRepositoryImpl extends RemoteRepository {
  final DioClient _client;
  // final SharedPreferences _sharedPreferences;

  RemoteRepositoryImpl(
    this._client,
  );

  @override
  Future<LoginResponse?> loginUser(
    String email,
    String password,
    String userType,
  ) async {
    try {
      print("User Type: ${userType.toLowerCase()}");
      final response = await _client.post(
        EndPoints.login,
        data: {
          'email': email,
          'password': password,
          'userType': userType.toLowerCase(),
        },
      );
      final rs = {
        'user': response.data['user'],
        'token': response.data['token'],
        // 'token': response.headers.value('x-access-token'),
      };
      print('rs ${rs['token']}');
      print('rs ${rs['user']}');
      // _sharedPreferences.setString('token', response.data['token']);
      return LoginResponse.fromJson(rs);
    } catch (e) {
      debugPrint('Error in loginUser => $e');
      return null;
    }
  }

  @override
  Future<Map<String, dynamic>?> getStudentStats() async {
    try {
      final response = await _client.get(EndPoints.getStudentHomeStats);
      final Map<String, dynamic> stats = response.data['stats'];
      print("GetStats response $response");
      return stats;
    } catch (e) {
      debugPrint('Error in getStudentStats => $e');
      return null;
    }
  }

  @override
  Future<String?> getProfileFilled() async {
    try {
      final response = await _client.get(EndPoints.getStudentProfileFilled);
      final String? profileFilled = response.data['filledPercentage'];
      print("getProfileFilled response $profileFilled");
      return profileFilled;
    } catch (e) {
      debugPrint('Error in getProfileFilled => $e');
      return null;
    }
  }

  @override
  Future<LoginResponse?> registerStudentUser(String email, String password,
      String enrollmentNo, String studentName) async {
    try {
      final response = await _client.post(
        EndPoints.registerStudentUser,
        data: {
          'enrollmentNo': enrollmentNo,
          'name': studentName,
          'email': email,
          'password': password,
        },
      );
      final rs = {
        'user': response.data['user'],
        'token': response.data['token'],
        // 'token': response.headers.value('x-access-token'),
      };
      print('rs ${rs['token']}');
      print('rs ${rs['user']}');
      // _sharedPreferences.setString('token', response.data['token']);
      return LoginResponse.fromJson(rs);
    } catch (e) {
      debugPrint('Error in loginUser => $e');
      return null;
    }
  }

  @override
  Future<void> logoutUser() async {
    // _sharedPreferences.remove('token');
    try {
      await _client.post(EndPoints.logoutUser);
    } catch (e) {
      debugPrint('error in logoutUser=> $e');
    }
  }
}
