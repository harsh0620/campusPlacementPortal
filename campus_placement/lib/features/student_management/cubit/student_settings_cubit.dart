import 'dart:ffi';

import 'package:bloc/bloc.dart';
import 'package:campus_placement/data/student_repo.dart';
import 'package:equatable/equatable.dart';
import 'package:meta/meta.dart';

import '../modals/student_personel.dart';

part 'student_settings_state.dart';

class StudentSettingsCubit extends Cubit<StudentSettingsState> {
  final StudentRepository _studentRepository;
  StudentSettingsCubit(this._studentRepository) : super(StudentSettingsState());

  Future<void> getBasicDetails() async {
    emit(state.copyWith(
        getBasicStatus: StudentSettingsGetBasicDetailsStatus.loading));
    final response = await _studentRepository.getBasicDetailsStudent();
    print("Response:- $response");
    if (response != null) {
      emit(state.copyWith(
          name: response['name'],
          enrollmentNo: response['enrollmentNo'],
          about: response['about'],
          getBasicStatus: StudentSettingsGetBasicDetailsStatus.success));
      print("Inside State:- $state");
    } else {
      emit(state.copyWith(
          getBasicStatus: StudentSettingsGetBasicDetailsStatus.failure));
    }
  }

  Future<void> updateBasicDetailsStudent(
      {String? name, String? about, String? enrollmentNo}) async {
    emit(state.copyWith(
        updateBasicStatus: StudentSettingsUpdateBasicDetailsStatus.loading));
    final response = await _studentRepository.updateBasicDetailsStudent(
        name: name, about: about, enrollmentNo: enrollmentNo);
    print("Response:- $response");
    if (response != null) {
      emit(state.copyWith(
          name: response['name'],
          enrollmentNo: response['enrollmentNo'],
          about: response['about'],
          updateBasicStatus: StudentSettingsUpdateBasicDetailsStatus.success));
      print("Inside State:- $state");
    } else {
      emit(state.copyWith(
          updateBasicStatus: StudentSettingsUpdateBasicDetailsStatus.failure));
    }
  }

  Future<void> getPersonalDetailsStudent() async {
    emit(state.copyWith(
        getPersonalDetailsStatus:
            StudentSettingsGetPersonalDetailsStudent.loading));
    final response = await _studentRepository.getPersonalDetailsStudent();
    print("Response:- $response");
    if (response != null) {
      emit(state.copyWith(
          personalDetails: response,
          getPersonalDetailsStatus:
              StudentSettingsGetPersonalDetailsStudent.success));
      print("Inside State:- $state");
    } else {
      emit(state.copyWith(
          getPersonalDetailsStatus:
              StudentSettingsGetPersonalDetailsStudent.failure));
    }
  }

  Future<void> updateStudentProfilePersonal(
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
    emit(state.copyWith(
        updateBasicStatus: StudentSettingsUpdateBasicDetailsStatus.loading));
    final response = await _studentRepository.updateStudentProfilePersonal(
        dob: dob,
        gender: gender,
        contactNo: contactNo,
        aadharNo: aadharNo,
        program: program,
        stream: stream,
        collegeName: collegeName,
        universityName: universityName,
        fatherName: fatherName,
        motherName: motherName,
        currentAddress: currentAddress,
        permanentAddress: permanentAddress,
        pincode: pincode,
        homeCity: homeCity,
        homeCountry: homeCity,
        profileImage: profileImage);
    print("Response:- $response");
    if (response != null) {
      emit(state.copyWith(
          personalDetails: response,
          updateBasicStatus: StudentSettingsUpdateBasicDetailsStatus.success));
      print("Inside State:- $state");
    } else {
      emit(state.copyWith(
          updateBasicStatus: StudentSettingsUpdateBasicDetailsStatus.failure));
    }
  }

  Future<void> getAcademicDetailsStudent() async {}
}
