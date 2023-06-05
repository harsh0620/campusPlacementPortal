import 'package:dropdown_button2/dropdown_button2.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:intl/intl.dart';

import '../../../constants/colors.dart';
import '../UI/student_home.dart';

class ExperienceWidget extends StatefulWidget {
  const ExperienceWidget({super.key, required this.no});
  final int no;

  @override
  State<ExperienceWidget> createState() => ExperienceWidgetState();
}

class ExperienceWidgetState extends State<ExperienceWidget> {
  late TextEditingController _fromController;
  late TextEditingController _durationController;
  late TextEditingController _companyNameontroller;
  late TextEditingController _designationController;
  late TextEditingController _locationController;
  late TextEditingController _jobDescriptionController;
  late TextEditingController _toController;
  String? resultError;
  String? noOfSemError;
  String? locationeError;
  String? jobDescriptionError;
  String? compNameError;
  String? designationError;

  void companyNameValidation(
    String value,
  ) {
    if (value.isEmpty) {
      setState(() {
        compNameError = 'Enter company name';
      });
    } else {
      setState(() {
        compNameError = null;
      });
    }
  }

  void designValidation(
    String value,
  ) {
    if (value.isEmpty) {
      setState(() {
        designationError = 'Enter Designation';
      });
    } else {
      setState(() {
        designationError = null;
      });
    }
  }

  void locationValidation(
    String value,
  ) {
    if (value.isEmpty) {
      setState(() {
        locationeError = 'Enter job location';
      });
    } else {
      setState(() {
        locationeError = null;
      });
    }
  }

  void jobDescriptionilidation(
    String value,
  ) {
    if (value.isEmpty) {
      setState(() {
        jobDescriptionError = 'Enter description to work you did';
      });
    } else {
      setState(() {
        jobDescriptionError = null;
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

    _fromController.dispose();
    _durationController.dispose();
    _companyNameontroller.dispose();
    _designationController.dispose();
    _locationController.dispose();
    _jobDescriptionController.dispose();
    super.dispose();
  }

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    _toController = TextEditingController();
    _companyNameontroller = TextEditingController();
    _fromController = TextEditingController();
    _durationController = TextEditingController();
    _designationController = TextEditingController();
    _locationController = TextEditingController();
    _jobDescriptionController = TextEditingController();
  }

  @override
  Widget build(BuildContext context) {
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
                  'Professional Details',
                  style:
                      TextStyle(fontWeight: FontWeight.w700, fontSize: 18.sp),
                )),
            SizedBox(
              height: 30.h,
            ),
            TextContainer(
                errorText: compNameError,
                label: 'Company Name',
                hint: "Enter company name",
                onChanged: companyNameValidation,
                controller: _companyNameontroller),
            TextContainer(
                errorText: designationError,
                label: 'Designation',
                hint: "Enter Designation",
                onChanged: designValidation,
                controller: _designationController),
            TextContainer(
                errorText: locationeError,
                label: 'Location',
                hint: "Enter Location",
                onChanged: locationValidation,
                controller: _locationController),
            TextContainer(
                errorText: jobDescriptionError,
                label: 'Duration in Months',
                hint: "Enter duration",
                onChanged: noOfSemValidation,
                controller: _jobDescriptionController),
            Align(
              alignment: Alignment.topLeft,
              child: Text(
                'From',
                style: TextStyle(
                  fontSize: 18.sp,
                  fontWeight: FontWeight.w900,
                ),
              ),
            ),
            SizedBox(height: 10.0.h),
            TextField(
              controller:
                  _fromController, //editing controller of this TextField
              decoration: InputDecoration(
                  hintStyle: TextStyle(
                    fontSize: 14.sp,
                    // TextType.text1,
                    color: ColorConst.lightGrey3,
                    // fontSize: hintFontSize,
                  ),
                  focusedErrorBorder: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(6),
                    borderSide: const BorderSide(
                      color: ColorConst.red,
                      width: 2,
                    ),
                  ),
                  filled: true,
                  hoverColor: Colors.transparent,
                  focusColor: ColorConst.white,
                  fillColor: ColorConst.white,
                  // disabledBorder: OutlineInputBorder(
                  //   borderRadius: BorderRadius.circular(6),
                  //   borderSide: const BorderSide(
                  //     color: ColorConst.dartGrey3,
                  //     width: 1,
                  //   ),
                  // ),
                  enabledBorder: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(6),
                    borderSide: const BorderSide(
                      color: ColorConst.dartGrey3,
                      width: 1,
                    ),
                  ),
                  // hintText: 'Enter Description of what you did in internship',
                  focusedBorder: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(6),
                    borderSide: const BorderSide(
                      color: ColorConst.dartGrey3,
                      width: 2,
                    ),
                  ),
                  suffixIcon: Icon(Icons.calendar_today), //icon of text field
                  labelText: "Enter Date" //label text of field
                  ),
              readOnly:
                  true, //set it true, so that user will not able to edit text
              onTap: () async {
                DateTime? pickedDate = await showDatePicker(
                    context: context,
                    initialDate: DateTime.now(),
                    firstDate: DateTime(
                        2000), //DateTime.now() - not to allow to choose before today.
                    lastDate: DateTime(2101));

                if (pickedDate != null) {
                  print(
                      pickedDate); //pickedDate output format => 2021-03-10 00:00:00.000
                  String formattedDate =
                      DateFormat('dd/MM/yyyy').format(pickedDate);
                  print(
                      formattedDate); //formatted date output using intl package =>  2021-03-16
                  //you can implement different kind of Date Format here according to your requirement

                  setState(() {
                    _fromController.text =
                        formattedDate; //set output date to TextField value.
                  });
                } else {
                  print("Date is not selected");
                }
              },
            ),
            SizedBox(height: 20.0.h),
            Align(
              alignment: Alignment.topLeft,
              child: Text(
                'To',
                style: TextStyle(
                  fontSize: 18.sp,
                  fontWeight: FontWeight.w900,
                ),
              ),
            ),
            SizedBox(height: 10.0.h),
            TextField(
              controller: _toController, //editing controller of this TextField
              decoration: InputDecoration(
                  hintStyle: TextStyle(
                    fontSize: 14.sp,
                    // TextType.text1,
                    color: ColorConst.lightGrey3,
                    // fontSize: hintFontSize,
                  ),
                  focusedErrorBorder: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(6),
                    borderSide: const BorderSide(
                      color: ColorConst.red,
                      width: 2,
                    ),
                  ),
                  filled: true,
                  hoverColor: Colors.transparent,
                  focusColor: ColorConst.white,
                  fillColor: ColorConst.white,
                  // disabledBorder: OutlineInputBorder(
                  //   borderRadius: BorderRadius.circular(6),
                  //   borderSide: const BorderSide(
                  //     color: ColorConst.dartGrey3,
                  //     width: 1,
                  //   ),
                  // ),
                  enabledBorder: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(6),
                    borderSide: const BorderSide(
                      color: ColorConst.dartGrey3,
                      width: 1,
                    ),
                  ),
                  // hintText: 'Enter Description of what you did in internship',
                  focusedBorder: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(6),
                    borderSide: const BorderSide(
                      color: ColorConst.dartGrey3,
                      width: 2,
                    ),
                  ),
                  suffixIcon: Icon(Icons.calendar_today), //icon of text field
                  labelText: "Enter Date" //label text of field
                  ),
              readOnly:
                  true, //set it true, so that user will not able to edit text
              onTap: () async {
                DateTime? pickedDate = await showDatePicker(
                    context: context,
                    initialDate: DateTime.now(),
                    firstDate: DateTime(
                        2000), //DateTime.now() - not to allow to choose before today.
                    lastDate: DateTime(2101));

                if (pickedDate != null) {
                  print(
                      pickedDate); //pickedDate output format => 2021-03-10 00:00:00.000
                  String formattedDate =
                      DateFormat('dd/MM/yyyy').format(pickedDate);
                  print(
                      formattedDate); //formatted date output using intl package =>  2021-03-16
                  //you can implement different kind of Date Format here according to your requirement

                  setState(() {
                    _toController.text =
                        formattedDate; //set output date to TextField value.
                  });
                } else {
                  print("Date is not selected");
                }
              },
            ),
            SizedBox(
              height: 20.h,
            ),
            Align(
              alignment: Alignment.topLeft,
              child: Text(
                'Job Description',
                style: TextStyle(
                  fontSize: 18.sp,
                  fontWeight: FontWeight.w900,
                ),
              ),
            ),
            SizedBox(height: 10.0.h),
            TextField(
              controller: _jobDescriptionController,
              keyboardType: TextInputType.multiline,
              maxLines: 4,
              // enabled: enabled,
              decoration: InputDecoration(
                hintStyle: TextStyle(
                  fontSize: 14.sp,
                  // TextType.text1,
                  color: ColorConst.lightGrey3,
                  // fontSize: hintFontSize,
                ),
                focusedErrorBorder: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(6),
                  borderSide: const BorderSide(
                    color: ColorConst.red,
                    width: 2,
                  ),
                ),
                filled: true,
                hoverColor: Colors.transparent,
                focusColor: ColorConst.white,
                fillColor: ColorConst.white,
                // disabledBorder: OutlineInputBorder(
                //   borderRadius: BorderRadius.circular(6),
                //   borderSide: const BorderSide(
                //     color: ColorConst.dartGrey3,
                //     width: 1,
                //   ),
                // ),
                enabledBorder: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(6),
                  borderSide: const BorderSide(
                    color: ColorConst.dartGrey3,
                    width: 1,
                  ),
                ),
                hintText: 'Enter Description of what you did in internship',
                focusedBorder: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(6),
                  borderSide: const BorderSide(
                    color: ColorConst.dartGrey3,
                    width: 2,
                  ),
                ),
              ),
            ),
          ],
        ));
  }
}
