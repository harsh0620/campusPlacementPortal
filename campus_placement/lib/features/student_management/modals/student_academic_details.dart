import 'package:equatable/equatable.dart';
import 'package:json_annotation/json_annotation.dart';

part 'student_academic_details.g.dart';

@JsonSerializable(explicitToJson: true)
class StudentAcademicDetailsList extends Equatable {
  final List<StudentAcademicDetails>? detailsList;

  StudentAcademicDetailsList({this.detailsList});

  factory StudentAcademicDetailsList.fromJson(Map<String, dynamic> json) =>
      _$StudentAcademicDetailsListFromJson(json);

  Map<String, dynamic> toJson() => _$StudentAcademicDetailsListToJson(this);
  @override
  List<Object?> get props => [detailsList];
}

@JsonSerializable(explicitToJson: true)
class StudentAcademicDetails extends Equatable {
  final String? degree;
  final String? specialization;
  final String? institute;
  final int? yearOfPassing;
  final String? board;
  final int? numberOfSemesters;
  final String? backlogSubjects;

  StudentAcademicDetails(
      {this.degree,
      this.specialization,
      this.institute,
      this.yearOfPassing,
      this.board,
      this.numberOfSemesters,
      this.backlogSubjects});

  // StudentAcademicDetails({this.detailsList});
  factory StudentAcademicDetails.fromJson(Map<String, dynamic> json) =>
      _$StudentAcademicDetailsFromJson(json);
  Map<String, dynamic> toJson() => _$StudentAcademicDetailsToJson(this);
  @override
  List<Object?> get props => [
        degree,
        specialization,
        institute,
        yearOfPassing,
        board,
        numberOfSemesters,
        backlogSubjects
      ];
}

@JsonSerializable(explicitToJson: false)
class Result extends Equatable {
  final String? option;
  final int? value;

  Result({this.option, this.value});
  factory Result.fromJson(Map<String, dynamic> json) => _$ResultFromJson(json);

  Map<String, dynamic> toJson() => _$ResultToJson(this);

  @override
  List<Object?> get props => [
        option,
        value,
      ];
}
