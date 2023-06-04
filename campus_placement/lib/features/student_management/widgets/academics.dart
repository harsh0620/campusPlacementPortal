import 'package:dropdown_button2/dropdown_button2.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

import '../../../constants/colors.dart';
import '../../login/UI/login_page.dart';
import '../UI/student_home.dart';
import '../cubit/student_settings_cubit.dart';

class AcademicsWidget extends StatefulWidget {
  const AcademicsWidget({super.key, required this.no});
  final int no;

  @override
  State<AcademicsWidget> createState() => _AcademicsWidgetState();
}

class _AcademicsWidgetState extends State<AcademicsWidget> {
  late TextEditingController _resultController;
  late TextEditingController _semesterController;
  late TextEditingController _degreeNameontroller;
  late TextEditingController _specializationController;
  late TextEditingController _instituteController;
  late TextEditingController _boardController;
  String? resultError;
  String? noOfSemError;
  String? instituteError;
  String? boardError;
  String? fatherError;
  String? motherError;
  late String selectedValue;
  String? markingCriteriaValue;

  late List<DropdownMenuItem<String>> yearTypeList;
  late List<DropdownMenuItem<String>> markingCriteriaList;

// = [
//     DropdownMenuItem(
//         value: 'CGPA',
//         child: Text(
//           'CGPA',
//           style: TextStyle(
//             fontSize: 16.sp,
//             fontWeight: FontWeight.w600,
//             color: ColorConst.black,
//           ),
//         )),
//     DropdownMenuItem(
//         value: 'Percentage',
//         child: Text(
//           'Percentage',
//           style: TextStyle(
//             fontSize: 16.sp,
//             fontWeight: FontWeight.w600,
//             color: ColorConst.black,
//           ),
//         )),
//   ];

  List<int> yearList =
      List.generate((2023 - 1995) + 1, (index) => 2023 - index);

  static const List<String> markingCriteria = ['CGPA', 'Percentage'];
  void degreeValidation(
    String value,
  ) {
    if (value.isEmpty) {
      setState(() {
        fatherError = 'Enter degree';
      });
    } else {
      setState(() {
        fatherError = null;
      });
    }
  }

  void specializationValidation(
    String value,
  ) {
    if (value.isEmpty) {
      setState(() {
        motherError = 'Enter text';
      });
    } else {
      setState(() {
        motherError = null;
      });
    }
  }

  void instituteValidation(
    String value,
  ) {
    if (value.isEmpty) {
      setState(() {
        instituteError = 'Enter College';
      });
    } else {
      setState(() {
        instituteError = null;
      });
    }
  }

  void boardalidation(
    String value,
  ) {
    if (value.isEmpty) {
      setState(() {
        boardError = 'Enter correct board name';
      });
    } else {
      setState(() {
        boardError = null;
      });
    }
  }

  void resultValidation(String value) {
    RegExp decimalRegex = RegExp(r'^\d+(\.\d{1,2})?$');
    if (value.isEmpty) {
      setState(() {
        resultError = null;
      });
    } else {
      setState(() {
        resultError = decimalRegex.hasMatch(value.trim())
            ? null
            : 'Enter decimal no. till 2 digits only';
      });
    }
  }

  void noOfSemValidation(String value) {
    RegExp digitRegex = RegExp(r'^[0-9]+$');
    if (value.isEmpty) {
      setState(() {
        noOfSemError = null;
      });
    } else {
      setState(() {
        noOfSemError =
            digitRegex.hasMatch(value.trim()) ? null : 'Enter digits only';
      });
    }
  }

  @override
  void dispose() {
    // TODO: implement dispose

    _resultController.dispose();
    _semesterController.dispose();
    _degreeNameontroller.dispose();
    _specializationController.dispose();
    _instituteController.dispose();
    _boardController.dispose();
    super.dispose();
  }

  @override
  void initState() {
    super.initState();

    yearTypeList = List.generate(
      yearList.length,
      (index) => DropdownMenuItem(
          value: yearList[index].toString(),
          child: Text(
            '${yearList[index]}',
            style: TextStyle(
              fontSize: 16.sp,
              fontWeight: FontWeight.w600,
              color: ColorConst.black,
            ),
          )),
    );
    markingCriteriaList = List.generate(
      markingCriteria.length,
      (index) => DropdownMenuItem(
          value: markingCriteria[index],
          child: Text(
            '${markingCriteria[index]}',
            style: TextStyle(
              fontSize: 16.sp,
              fontWeight: FontWeight.w600,
              color: ColorConst.black,
            ),
          )),
    );

    selectedValue = yearTypeList[0].value ?? '2023';
    _degreeNameontroller = TextEditingController();
    _resultController = TextEditingController();
    _semesterController = TextEditingController();
    _specializationController = TextEditingController();
    _instituteController = TextEditingController();
    _boardController = TextEditingController();
  }

  @override
  Widget build(BuildContext context) {
    return BlocConsumer<StudentSettingsCubit, StudentSettingsState>(
      listener: (context, state) {
        // TODO: implement listener
      },
      builder: (context, state) {
        return Container(
            padding: EdgeInsets.symmetric(horizontal: 10.h, vertical: 10.h),
            decoration: BoxDecoration(
                border: Border.all(color: ColorConst.grey),
                borderRadius: BorderRadius.circular(5.r),
                color: ColorConst.white),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.start,
              mainAxisSize: MainAxisSize.min,
              children: [
                SizedBox(
                  height: 15.h,
                ),
                Align(
                    alignment: Alignment.topLeft,
                    child: Text(
                      'Academic Details ${widget.no}',
                      style: TextStyle(
                          fontWeight: FontWeight.w700, fontSize: 22.sp),
                    )),
                SizedBox(
                  height: 30.h,
                ),
                TextContainer(
                    errorText: fatherError,
                    label: 'Specialization',
                    hint: "Enter Degree",
                    onChanged: degreeValidation,
                    controller: _degreeNameontroller),
                TextContainer(
                    errorText: motherError,
                    label: 'Specialization',
                    hint: "Enter Specialization",
                    onChanged: specializationValidation,
                    controller: _specializationController),
                TextContainer(
                    errorText: instituteError,
                    label: 'Institute',
                    hint: "Enter Institute",
                    onChanged: instituteValidation,
                    controller: _specializationController),
                Align(
                  alignment: Alignment.topLeft,
                  child: Text(
                    'Year of Passing',
                    style: TextStyle(
                      fontSize: 18.sp,
                      fontWeight: FontWeight.w900,
                    ),
                  ),
                ),
                SizedBox(height: 10.0.h),
                SizedBox(
                  width: double.infinity,
                  child: DropdownButtonHideUnderline(
                      child: DropdownButton2(
                    items: yearTypeList,
                    value: selectedValue,
                    onChanged: (String? newValue) {
                      setState(() {
                        selectedValue = newValue!;
                        // print('SElected value:  $selectedValue');
                      });
                    },
                    // buttonStyleData: ,
                    // menuItemStyleData:,
                    dropdownStyleData: DropdownStyleData(
                        // maxHeight: 200,
                        // width: 155.w,
                        padding: null,
                        decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(0),
                          color: ColorConst.white,
                        ),
                        elevation: 3,
                        // offset: const Offset(-20, 0),
                        scrollbarTheme: ScrollbarThemeData(
                          radius: const Radius.circular(6),
                          thickness: MaterialStateProperty.all(4),
                          thumbVisibility: MaterialStateProperty.all(true),
                        )),
                    buttonStyleData: ButtonStyleData(
                      height: 50.h,
                      width: 160.w,
                      padding: const EdgeInsets.only(left: 14, right: 14),
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(6),
                        border: Border.all(
                          color: ColorConst.lightGrey3,
                        ),
                        color: Colors.white,
                      ),
                      elevation: 0,
                    ),
                    iconStyleData: const IconStyleData(
                      icon: const Icon(
                        Icons.keyboard_arrow_down_outlined,
                      ),
                      iconSize: 18,
                      iconEnabledColor: ColorConst.customPink,
                      // iconDisabledColor: Colors.grey,
                    ),
                  )),
                ),
                SizedBox(
                  height: 20.0.h,
                ),
                Align(
                  alignment: Alignment.topLeft,
                  child: Text(
                    'Marking Criteria',
                    style: TextStyle(
                      fontSize: 18.sp,
                      fontWeight: FontWeight.w900,
                    ),
                  ),
                ),
                SizedBox(height: 10.0.h),
                SizedBox(
                  width: double.infinity,
                  child: DropdownButtonHideUnderline(
                      child: DropdownButton2(
                    items: markingCriteriaList,
                    value: markingCriteriaValue,
                    onChanged: (String? newValue) {
                      setState(() {
                        markingCriteriaValue = newValue!;
                        // print('SElected value:  $selectedValue');
                      });
                    },
                    // buttonStyleData: ,
                    // menuItemStyleData:,
                    dropdownStyleData: DropdownStyleData(
                        // maxHeight: 200,
                        // width: 155.w,
                        padding: null,
                        decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(0),
                          color: ColorConst.white,
                        ),
                        elevation: 3,
                        // offset: const Offset(-20, 0),
                        scrollbarTheme: ScrollbarThemeData(
                          radius: const Radius.circular(6),
                          thickness: MaterialStateProperty.all(4),
                          thumbVisibility: MaterialStateProperty.all(true),
                        )),
                    buttonStyleData: ButtonStyleData(
                      height: 50.h,
                      width: 160.w,
                      padding: const EdgeInsets.only(left: 14, right: 14),
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(6),
                        border: Border.all(
                          color: ColorConst.lightGrey3,
                        ),
                        color: Colors.white,
                      ),
                      elevation: 0,
                    ),
                    iconStyleData: const IconStyleData(
                      icon: const Icon(
                        Icons.keyboard_arrow_down_outlined,
                      ),
                      iconSize: 18,
                      iconEnabledColor: ColorConst.customPink,
                      // iconDisabledColor: Colors.grey,
                    ),
                  )),
                ),
                SizedBox(
                  height: 20.0.h,
                ),
                TextContainer(
                    errorText: boardError,
                    label: 'Board',
                    hint: "Enter study board",
                    onChanged: boardalidation,
                    controller: _boardController),
                TextContainer(
                    errorText: resultError,
                    label: 'Result',
                    hint: "Enter study board",
                    onChanged: resultValidation,
                    controller: _resultController),
                TextContainer(
                    errorText: noOfSemError,
                    label: 'No. of Semester',
                    hint: "Enter no. of semester",
                    onChanged: noOfSemValidation,
                    controller: _semesterController),
              ],
            ));
      },
    );
  }
}
