import 'package:flutter/foundation.dart';

import '../constants/endpoints.dart';
import '../core/dio/dio_client.dart';
import '../features/student_management/modals/student_academic_details.dart';
import '../features/student_management/modals/student_personel.dart';

abstract class StudentRepository {
  Future<Map<String, dynamic>?> getBasicDetailsStudent();
  Future<Map<String, dynamic>?> updateBasicDetailsStudent(
      {String? name, String? about, String? enrollmentNo});

  Future<StudentPersonalDetails?> getPersonalDetailsStudent();

  Future<StudentPersonalDetails?> updateStudentProfilePersonal(
      {String? dob,
      String? gender,
      String? contactNo,
      String? aadharNo,
      String? program,
      String? stream,
      String? collegeName,
      String? universityName,
      String? fatherName,
      String? motherName,
      String? currentAddress,
      String? permanentAddress,
      String? pincode,
      String? homeCity,
      String? homeState,
      String? homeCountry,
      String? profileImage});
  Future<Map<String, dynamic>?> getAcademicDetailsStudent();
  Future<Map<String, dynamic>?> updateAcademicDetailsStudent();
  Future<Map<String, dynamic>?> updateStudentProfileProfessional(
    String studentId, {
    String? companyName,
    String? designation,
    String? duration,
    String? location,
    String? jobDescription,
    String? from,
    String? to,
    // String? universityName,
    // String? fatherName,
    // String? motherName,
    // String? currentAddress,
    // String? permanentAddress,
    // String? pincode,
    // String? homeCity,
    // String? homeState,
    // String? homeCountry,
    // String? profileImage
  });
  Future<Map<String, dynamic>?> getProfessionalDetailsStudent();
}

class StudentRepositoryImpl extends StudentRepository {
  final DioClient _client;
  // final SharedPreferences _sharedPreferences;

  StudentRepositoryImpl(
    this._client,
  );

  @override
  Future<Map<String, dynamic>?> getBasicDetailsStudent() async {
    try {
      final response = await _client.get(EndPoints.getStudentProfileBasics);
      final Map<String, dynamic> basicDetails = response.data['basicDetails'];
      print("basicDetails response $response");
      return basicDetails;
    } catch (e) {
      debugPrint('Error in getStudentStats => $e');
      return null;
    }
  }

  @override
  Future<Map<String, dynamic>?> updateBasicDetailsStudent({
    String? name,
    String? about,
    String? enrollmentNo,
  }) async {
    try {
      final response =
          await _client.patch(EndPoints.getStudentProfileBasics, data: {
        if (name != null) 'name': name,
        if (enrollmentNo != null) 'enrollmentNo': enrollmentNo,
        if (about != null && about.isNotEmpty) 'about': about,
      });

      final Map<String, dynamic> newBasicDetails =
          response.data['basicDetails'];
      print("basicDetails response $response");
      return newBasicDetails;
    } catch (e) {
      debugPrint('Error in updateBasicDetailsStudent => $e');
      return null;
    }
  }

  @override
  Future<StudentPersonalDetails?> getPersonalDetailsStudent() async {
    try {
      final response = await _client.get(EndPoints.getStudentProfilePersonal);
      // final StudentPersonalDetails personalDetails =
      //     response.data['personalDetails'];
      // print("personalDetails response $response");
      // print("${response.data["personalDetails"]["dob"]}");
      // print("${response.data["personalDetails"]["contactNo"]}");
      // print("${response.data["personalDetails"]["gender"]}");
      // final StudentPersonalDetails stu = StudentPersonalDetails(
      //   gender: response.data["personalDetails"]['gender'] as String?,
      //   pincode: response.data["personalDetails"]['pincode'] as String?,
      //   phoneNumber: response.data["personalDetails"]['contactNo'] as String?,
      //   aadharNo: response.data["personalDetails"]['aadharNo'] as String?,
      //   degree: response.data["personalDetails"]['program'] as String?,
      //   stream: response.data["personalDetails"]['stream'] as String?,
      //   fatherName: response.data["personalDetails"]['fatherName'] as String?,
      //   motherName: response.data["personalDetails"]['motherName'] as String?,
      //   currentAddress:
      //       response.data["personalDetails"]['currentAddress'] as String?,
      //   permanentAddress:
      //       response.data["personalDetails"]['permanentAddress'] as String?,
      //   city: response.data["personalDetails"]['homeCity'] as String?,
      //   state: response.data["personalDetails"]['homeState'] as String?,
      //   country: response.data["personalDetails"]['homeCountry'] as String?,
      //   dob: response.data["personalDetails"]['dob'] as String?,
      //   clgName: response.data["personalDetails"]['collegeName'] as String?,
      //   uniName: response.data["personalDetails"]['universityName'] as String?,
      // );
      // print("Stu: - $stu");
      // return stu;
      return StudentPersonalDetails.fromJson(response.data["personalDetails"]);
    } catch (e) {
      debugPrint('Error in getPersonalDetailsStudent => $e');
      return null;
    }
  }

  @override
  Future<StudentPersonalDetails?> updateStudentProfilePersonal(
      {String? dob,
      String? gender,
      String? contactNo,
      String? aadharNo,
      String? program,
      String? stream,
      String? collegeName,
      String? universityName,
      String? fatherName,
      String? motherName,
      String? currentAddress,
      String? permanentAddress,
      String? pincode,
      String? homeCity,
      String? homeState,
      String? homeCountry,
      String? profileImage}) async {
    try {
      final response =
          await _client.patch(EndPoints.getStudentProfilePersonal, data: {
        if (dob != null) 'dob': dob,
        if (contactNo != null) 'contactNo': contactNo,
        if (gender != null && gender.isNotEmpty) 'gender': gender,
        if (profileImage != null && profileImage.isNotEmpty)
          'profileImage': gender,
        if (aadharNo != null) 'aadharNo': aadharNo,
        if (program != null) 'program': program,
        if (stream != null) 'stream': stream,
        if (collegeName != null) 'collegeName': collegeName,
        if (universityName != null) 'universityName': universityName,
        if (fatherName != null) 'fatherName': fatherName,
        if (motherName != null) 'motherName': motherName,
        if (currentAddress != null) 'currentAddress': currentAddress,
        if (permanentAddress != null) 'permanentAddress': permanentAddress,
        if (pincode != null) 'pincode': pincode,
        if (homeCity != null) 'homeCity': homeCity,
        if (homeState != null) 'homeState': homeState,
        if (homeCountry != null) 'homeCountry': homeCountry,
      });
      print("Update personal:- ${response.data}");
      return StudentPersonalDetails.fromJson(response.data["personalDetails"]);
      // final Map<String, dynamic> newBasicDetails =
      //     response.data['basicDetails'];

      // print("basicDetails response $response");
      // return newBasicDetails;
    } catch (e) {
      debugPrint('Error in updateBasicDetailsStudent => $e');
      return null;
    }
  }

  @override
  Future<Map<String, dynamic>?> getAcademicDetailsStudent() async {
    try {
      final response = await _client.get(EndPoints.getStudentProfileAcademic);
      final Map<String, dynamic> academicDetails =
          response.data['academicDetails'];
      print("academicDetails response $response");
      return academicDetails;
    } catch (e) {
      debugPrint('Error in getAcademicDetailsStudent => $e');
      return null;
    }
  }

  Future<Map<String, dynamic>?> updateAcademicDetailsStudent({
    StudentAcademicDetailsList? detailsList,
  }) async {
    try {
      final response = await _client.patch(EndPoints.getStudentProfileBasics,
          data: {'academicDetails': detailsList});

      final Map<String, dynamic> academicDetails =
          response.data['academicDetails'];
      print("basicDetails response $response");
      return academicDetails;
    } catch (e) {
      debugPrint('Error in updateBasicDetailsStudent => $e');
      return null;
    }
  }

  @override
  Future<Map<String, dynamic>?> getProfessionalDetailsStudent() async {
    try {
      final response =
          await _client.get(EndPoints.getStudentProfileProfessional);
      final Map<String, dynamic> professionalDetails =
          response.data['professionalDetails'];
      print("professionalDetails response $response");
      return professionalDetails;
    } catch (e) {
      debugPrint('Error in getProfessionalDetailsStudent => $e');
      return null;
    }
  }

  @override
  Future<Map<String, dynamic>?> updateStudentProfileProfessional(
    String studentId, {
    String? companyName,
    String? designation,
    String? duration,
    String? location,
    String? jobDescription,
    String? from,
    String? to,
    // String? universityName,
    // String? fatherName,
    // String? motherName,
    // String? currentAddress,
    // String? permanentAddress,
    // String? pincode,
    // String? homeCity,
    // String? homeState,
    // String? homeCountry,
    // String? profileImage
  }) async {
    final response =
        await _client.patch(EndPoints.getStudentProfileProfessional, data: {});
  }
}
