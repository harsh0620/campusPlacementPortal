import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:intl/intl.dart';

import '../../../constants/colors.dart';
import '../UI/student_home.dart';

class ProjectsWidget extends StatefulWidget {
  const ProjectsWidget({super.key});

  @override
  State<ProjectsWidget> createState() => _ProjectsWidgetState();
}

class _ProjectsWidgetState extends State<ProjectsWidget> {
  late TextEditingController _companyNameontroller;
  late TextEditingController _designationController;
  late TextEditingController _locationController;
  late TextEditingController _jobDescriptionController;

  String? sourceLinkError;
  String? jobDescriptionError;
  String? compNameError;
  String? liveError;

  void companyNameValidation(
    String value,
  ) {
    if (value.isEmpty) {
      setState(() {
        compNameError = 'Enter project name';
      });
    } else {
      setState(() {
        compNameError = null;
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

  void sourceLinkValidation(
    String value,
  ) {
    if (value.isEmpty) {
      setState(() {
        sourceLinkError = 'Enter source link';
      });
    } else {
      setState(() {
        sourceLinkError = null;
      });
    }
  }

  void liveLinkValidation(
    String value,
  ) {
    if (value.isEmpty) {
      setState(() {
        liveError = 'Enter live link';
      });
    } else {
      setState(() {
        liveError = null;
      });
    }
  }

  @override
  void dispose() {
    // TODO: implement dispose

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

    _companyNameontroller = TextEditingController();

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
              height: 10.h,
            ),
            Align(
                alignment: Alignment.topLeft,
                child: Text(
                  'Project ',
                  style:
                      TextStyle(fontWeight: FontWeight.w900, fontSize: 22.sp),
                )),
            SizedBox(
              height: 30.h,
            ),
            TextContainer(
                errorText: compNameError,
                label: 'Project Name',
                hint: "Enter Project name",
                onChanged: companyNameValidation,
                controller: _companyNameontroller),
            Align(
              alignment: Alignment.topLeft,
              child: Text(
                'Project Description',
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
                hintText: 'Enter Project Description ',
                focusedBorder: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(6),
                  borderSide: const BorderSide(
                    color: ColorConst.dartGrey3,
                    width: 2,
                  ),
                ),
              ),
            ),
            SizedBox(height: 10.0.h),
            TextContainer(
                errorText: 'Enter valid link',
                label: 'Source Link',
                hint: "Enter Source Link",
                onChanged: sourceLinkValidation,
                controller: _designationController),
            TextContainer(
                errorText: 'Enter live link',
                label: 'Live Link',
                hint: "Enter Live Link",
                onChanged: liveLinkValidation,
                controller: _locationController),
          ],
        ));
  }
}
