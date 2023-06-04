import 'package:equatable/equatable.dart';
import 'package:json_annotation/json_annotation.dart';
part 'student_personel.g.dart';

@JsonSerializable(explicitToJson: true)
class MapStudentPersonalDetails extends Equatable {
  Map<String, StudentPersonalDetails>? details;
  MapStudentPersonalDetails({this.details});

  factory MapStudentPersonalDetails.fromJson(Map<String, dynamic> json) =>
      _$MapStudentPersonalDetailsFromJson(json);

  Map<String, dynamic> toJson() => _$MapStudentPersonalDetailsToJson(this);
  MapStudentPersonalDetails copyWith(
      {Map<String, StudentPersonalDetails>? details}) {
    return MapStudentPersonalDetails(details: details ?? this.details);
  }

  @override
  // TODO: implement props
  List<Object?> get props => [details];
}

@JsonSerializable(explicitToJson: false)
class StudentPersonalDetails extends Equatable {
  final String? gender;
  @JsonKey(name: 'contactNo')
  final String? phoneNumber;
  final String? aadharNo;
  @JsonKey(name: 'program')
  final String? degree;
  final String? stream;
  final String? fatherName;
  final String? motherName;
  final String? currentAddress;
  final String? permanentAddress;
  @JsonKey(name: 'homeCity')
  final String? city;
  @JsonKey(name: 'homeState')
  final String? state;
  @JsonKey(name: 'homeCountry')
  final String? country;
  final String? dob;
  @JsonKey(name: 'collegeName')
  final String? clgName;
  @JsonKey(name: 'universityName')
  final String? uniName;
  final String? pincode;

  StudentPersonalDetails(
      {this.gender,
      this.pincode,
      this.phoneNumber,
      this.aadharNo,
      this.degree,
      this.stream,
      this.fatherName,
      this.motherName,
      this.currentAddress,
      this.permanentAddress,
      this.city,
      this.state,
      this.country,
      this.dob,
      this.clgName,
      this.uniName});
  StudentPersonalDetails copyWith({
    final String? pincode,
    final String? gender,
    final String? phoneNumber,
    final String? aadharNo,
    final String? degree,
    final String? stream,
    final String? fatherName,
    final String? motherName,
    final String? currentAddress,
    final String? permanentAddress,
    final String? city,
    final String? state,
    final String? country,
    final String? dob,
    final String? clgName,
    final String? uniName,
  }) {
    return StudentPersonalDetails(
        pincode: pincode ?? this.pincode,
        aadharNo: aadharNo ?? this.aadharNo,
        gender: gender ?? this.gender,
        phoneNumber: phoneNumber ?? this.phoneNumber,
        permanentAddress: permanentAddress ?? this.permanentAddress,
        degree: degree ?? this.degree,
        stream: stream ?? this.stream,
        fatherName: fatherName ?? this.fatherName,
        motherName: motherName ?? this.motherName,
        currentAddress: currentAddress ?? this.currentAddress,
        city: city ?? this.city,
        state: state ?? this.state,
        country: country ?? this.country,
        dob: dob ?? this.dob,
        clgName: clgName ?? this.clgName,
        uniName: uniName ?? this.uniName);
  }

  factory StudentPersonalDetails.fromJson(Map<String, dynamic> json) =>
      _$StudentPersonalDetailsFromJson(json);

  Map<String, dynamic> toJson() => _$StudentPersonalDetailsToJson(this);

  @override
  // TODO: implement props
  List<Object?> get props => [
        pincode,
        aadharNo,
        phoneNumber,
        permanentAddress,
        gender,
        degree,
        stream,
        fatherName,
        motherName,
        currentAddress,
        city,
        state,
        country,
        dob,
        clgName,
        uniName
      ];
}
