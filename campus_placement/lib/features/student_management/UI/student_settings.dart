import 'package:campus_placement/constants/colors.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class StudentSettings extends StatefulWidget {
  const StudentSettings({super.key});

  @override
  State<StudentSettings> createState() => _StudentSettingsState();
}

class _StudentSettingsState extends State<StudentSettings> {
  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.symmetric(
        horizontal: 30.w,
        vertical: 30.h,
      ),
      decoration: BoxDecoration(
        color: ColorConst.white,
        borderRadius: BorderRadius.circular(10),
        border: Border.all(color: ColorConst.lightGrey2),
      ),
    );
  }
}
