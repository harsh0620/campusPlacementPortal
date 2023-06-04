// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'student_personel.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

MapStudentPersonalDetails _$MapStudentPersonalDetailsFromJson(
        Map<String, dynamic> json) =>
    MapStudentPersonalDetails(
      details: (json['details'] as Map<String, dynamic>?)?.map(
        (k, e) => MapEntry(
            k, StudentPersonalDetails.fromJson(e as Map<String, dynamic>)),
      ),
    );

Map<String, dynamic> _$MapStudentPersonalDetailsToJson(
        MapStudentPersonalDetails instance) =>
    <String, dynamic>{
      'details': instance.details?.map((k, e) => MapEntry(k, e.toJson())),
    };

StudentPersonalDetails _$StudentPersonalDetailsFromJson(
        Map<String, dynamic> json) =>
    StudentPersonalDetails(
      gender: json['gender'] as String?,
      pincode: json['pincode'] as String?,
      phoneNumber: json['contactNo'] as String?,
      aadharNo: json['aadharNo'] as String?,
      degree: json['program'] as String?,
      stream: json['stream'] as String?,
      fatherName: json['fatherName'] as String?,
      motherName: json['motherName'] as String?,
      currentAddress: json['currentAddress'] as String?,
      permanentAddress: json['permanentAddress'] as String?,
      city: json['homeCity'] as String?,
      state: json['homeState'] as String?,
      country: json['homeCountry'] as String?,
      dob: json['dob'] as String?,
      clgName: json['collegeName'] as String?,
      uniName: json['universityName'] as String?,
    );

Map<String, dynamic> _$StudentPersonalDetailsToJson(
        StudentPersonalDetails instance) =>
    <String, dynamic>{
      'gender': instance.gender,
      'contactNo': instance.phoneNumber,
      'aadharNo': instance.aadharNo,
      'program': instance.degree,
      'stream': instance.stream,
      'fatherName': instance.fatherName,
      'motherName': instance.motherName,
      'currentAddress': instance.currentAddress,
      'permanentAddress': instance.permanentAddress,
      'homeCity': instance.city,
      'homeState': instance.state,
      'homeCountry': instance.country,
      'dob': instance.dob,
      'collegeName': instance.clgName,
      'universityName': instance.uniName,
      'pincode': instance.pincode,
    };
