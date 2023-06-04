// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'student_academic_details.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

StudentAcademicDetailsList _$StudentAcademicDetailsListFromJson(
        Map<String, dynamic> json) =>
    StudentAcademicDetailsList(
      detailsList: (json['detailsList'] as List<dynamic>?)
          ?.map(
              (e) => StudentAcademicDetails.fromJson(e as Map<String, dynamic>))
          .toList(),
    );

Map<String, dynamic> _$StudentAcademicDetailsListToJson(
        StudentAcademicDetailsList instance) =>
    <String, dynamic>{
      'detailsList': instance.detailsList?.map((e) => e.toJson()).toList(),
    };

StudentAcademicDetails _$StudentAcademicDetailsFromJson(
        Map<String, dynamic> json) =>
    StudentAcademicDetails(
      degree: json['degree'] as String?,
      specialization: json['specialization'] as String?,
      institute: json['institute'] as String?,
      yearOfPassing: json['yearOfPassing'] as int?,
      board: json['board'] as String?,
      numberOfSemesters: json['numberOfSemesters'] as int?,
      backlogSubjects: json['backlogSubjects'] as String?,
    );

Map<String, dynamic> _$StudentAcademicDetailsToJson(
        StudentAcademicDetails instance) =>
    <String, dynamic>{
      'degree': instance.degree,
      'specialization': instance.specialization,
      'institute': instance.institute,
      'yearOfPassing': instance.yearOfPassing,
      'board': instance.board,
      'numberOfSemesters': instance.numberOfSemesters,
      'backlogSubjects': instance.backlogSubjects,
    };

Result _$ResultFromJson(Map<String, dynamic> json) => Result(
      option: json['option'] as String?,
      value: json['value'] as int?,
    );

Map<String, dynamic> _$ResultToJson(Result instance) => <String, dynamic>{
      'option': instance.option,
      'value': instance.value,
    };
