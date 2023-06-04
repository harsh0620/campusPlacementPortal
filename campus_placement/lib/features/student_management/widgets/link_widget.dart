import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

import '../../../constants/colors.dart';
import '../../login/UI/login_page.dart';
import '../UI/student_home.dart';

class LinkWidget extends StatefulWidget {
  const LinkWidget({super.key, required this.skillCount});
  final int skillCount;
  @override
  State<LinkWidget> createState() => LinkWidgetState();
}

class LinkWidgetState extends State<LinkWidget> {
  late List<TextEditingController> controller;
  String? errorStr;
  late int count;

  @override
  void initState() {
    super.initState();
    controller =
        List.generate(widget.skillCount, (index) => TextEditingController());
    errorList = List.generate(widget.skillCount, (index) {
      return '';
    });
    count = widget.skillCount;
  }

  late List<String> errorList;

  void skillValidation(String value, String? errorCont) {
    if (value.isEmpty) {
      setState(() {
        errorCont = 'Enter skill';
      });
    } else {
      setState(() {
        errorCont = null;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    print("List count:- ${controller.length}");
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
            ...List.generate(
              count,
              (index) {
                return Column(
                  children: [
                    SizedBox(
                      height: 10.h,
                    ),
                    CustomTextFormField(
                      controller: controller[index],
                      hint: 'Link',
                      errorText: errorList[index],
                      onChanged: (val) {
                        skillValidation(val, errorList[index]);
                      },
                    ),
                    SizedBox(
                      height: 10.h,
                    ),
                  ],
                );
              },
            ),
            SizedBox(
              height: 20.h,
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: [
                Expanded(
                    child: ElevatedButton(
                        onPressed: () {}, child: Text('Update Skills'))),
                SizedBox(
                  width: 15.w,
                ),
                InkWell(
                    onTap: () {
                      setState(() {
                        count += 1;
                        // valList.add(skillValidation);
                        controller.add(TextEditingController());
                      });
                    },
                    child: Icon(
                      Icons.add,
                      color: ColorConst.black,
                    ))
              ],
            )
          ]),
    );
  }
}
