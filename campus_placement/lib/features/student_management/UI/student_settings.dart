import 'package:campus_placement/constants/colors.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

import '../../../core/locator/locator.dart';
import '../cubit/student_home_cubit.dart';

class StudentSettingsWrapper extends StatelessWidget {
  const StudentSettingsWrapper({super.key});

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (ctx) => locator<StudentHomeCubit>(),
      child: StudentSettings(),
    );
  }
}

class StudentSettings extends StatefulWidget {
  const StudentSettings({super.key});

  @override
  State<StudentSettings> createState() => _StudentSettingsState();
}

class _StudentSettingsState extends State<StudentSettings> {
  int appliedJobsCount = 0;
  int rejectedJobsCount = 0;
  String filledProfilesCount = '';
  String applicationStatus = "";
  List totalApplied = [];
  bool isOpen = false;
  @override
  void initState() {
    super.initState();
    context.read<StudentHomeCubit>().getStats();
    context.read<StudentHomeCubit>().getProfileFilled();
  }

  List<Widget> _buildCells(int count) {
    return List.generate(
      count,
      (index) => Container(
        padding: EdgeInsets.symmetric(horizontal: 20.w, vertical: 12.h),
        alignment: Alignment.center,
        // width: 120.0,
        // height: 60.0,
        color: Colors.white,
        // margin: EdgeInsets.all(4.0),
        child: Text(''),
      ),
    );
  }
// Container(
//     padding: EdgeInsets.symmetric(horizontal: 20.w, vertical: 12.h),
//     child: Text(
//       label,
//       style: TextStyle(
//         fontSize: 16.sp,
//         fontWeight: FontWeight.w700,
//       ),
//     ),
//   );

  List<Widget> _buildRows(int count) {
    return List.generate(
      count,
      (index) => Row(
        children: [
          Container(
            padding: EdgeInsets.symmetric(horizontal: 20.w, vertical: 12.h),
            child: Text(
              '${totalApplied[count]['company']['name']}',
              style: TextStyle(
                fontSize: 16.sp,
                fontWeight: FontWeight.w700,
              ),
            ),
          ),
          Column(
              children: List.generate(
            totalApplied[count]['designations'].length,
            (index) => Container(
              padding: EdgeInsets.symmetric(horizontal: 20.w, vertical: 12.h),
              child: Text(
                '',
                style: TextStyle(
                  fontSize: 16.sp,
                  fontWeight: FontWeight.w700,
                ),
              ),
            ),
          )),
          Container(
            padding: EdgeInsets.symmetric(horizontal: 20.w, vertical: 12.h),
            child: Text(
              '',
              style: TextStyle(
                fontSize: 16.sp,
                fontWeight: FontWeight.w700,
              ),
            ),
          ),
          Container(
            padding: EdgeInsets.symmetric(horizontal: 20.w, vertical: 12.h),
            child: Text(
              '',
              style: TextStyle(
                fontSize: 16.sp,
                fontWeight: FontWeight.w700,
              ),
            ),
          ),
          Container(
            padding: EdgeInsets.symmetric(horizontal: 20.w, vertical: 12.h),
            child: Text(
              '',
              style: TextStyle(
                fontSize: 16.sp,
                fontWeight: FontWeight.w700,
              ),
            ),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return BlocConsumer<StudentHomeCubit, StudentHomeState>(
      listener: (context, state) {
        // TODO: implement listener
        if (state.studentHomeStatsStatus == StudentHomeStatsStatus.success) {
          setState(() {
            totalApplied = state.stats?['totalApplied'];
            print("${totalApplied[0]["company"]["name"]}");
            print("${totalApplied[0]['designations'][0]}");
            print("${totalApplied[0]['locations'][0]}");
            print("${totalApplied[0]['driveDate']}");
            print("${totalApplied[0]['packageValue']['min']}");
            print("${totalApplied[0]['packageValue']['max']}");
            print('${totalApplied[0]['pdfLink']}');
            appliedJobsCount = state.stats?['totalAppliedCount'];
            rejectedJobsCount = state.stats?['totalRejectedCount'];
            applicationStatus = state.stats?['applicationStatus'];
          });
        }

        if (state.studentHomeProfileStatus ==
            StudentHomeProfileStatus.success) {
          setState(() {
            filledProfilesCount = state.profileFilled ?? '';
          });
        }
      },
      builder: (context, state) {
        return Container(
          // color: Colors.green,
          padding: EdgeInsets.symmetric(
            horizontal: 15.w,
            vertical: 30.h,
          ),
          child: SingleChildScrollView(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                Container(
                  // width: 0.4.sw,
                  padding:
                      EdgeInsets.symmetric(horizontal: 10.h, vertical: 10.w),
                  decoration: BoxDecoration(
                    color: ColorConst.white,
                    borderRadius: BorderRadius.circular(5),
                    border: Border.all(color: ColorConst.lightGrey2),
                  ),
                  child: Row(
                    children: [
                      Container(
                        decoration: BoxDecoration(
                          color: ColorConst.white,
                          borderRadius: BorderRadius.circular(5),
                          border: Border.all(color: ColorConst.lightGrey2),
                        ),
                        child: Icon(
                          Icons.check,
                          color: ColorConst.customGreen,
                        ),
                      ),
                      SizedBox(
                        width: 30.w,
                      ),
                      Container(
                          padding: EdgeInsets.all(3.w),
                          decoration: BoxDecoration(
                            color: ColorConst.white,
                            borderRadius: BorderRadius.circular(5),
                            border: Border.all(color: ColorConst.lightGrey2),
                          ),
                          child: Row(
                            children: [
                              Text(
                                'Applied In :',
                                style: TextStyle(
                                    fontSize: 16.sp,
                                    fontWeight: FontWeight.w700,
                                    color: ColorConst.black),
                              ),
                              SizedBox(
                                width: 5.w,
                              ),
                              Text(
                                '$appliedJobsCount Jobs',
                                style: TextStyle(
                                    fontSize: 16.sp,
                                    fontWeight: FontWeight.w700,
                                    color: ColorConst.customGreen),
                              )
                            ],
                          )),
                    ],
                  ),
                ),
                SizedBox(
                  height: 20.h,
                ),
                Container(
                  // width: 0.4.sw,
                  padding:
                      EdgeInsets.symmetric(horizontal: 10.h, vertical: 10.w),
                  decoration: BoxDecoration(
                    color: ColorConst.white,
                    borderRadius: BorderRadius.circular(5),
                    border: Border.all(color: ColorConst.lightGrey2),
                  ),
                  child: Row(
                    children: [
                      Container(
                        decoration: BoxDecoration(
                          color: ColorConst.white,
                          borderRadius: BorderRadius.circular(5),
                          border: Border.all(color: ColorConst.lightGrey2),
                        ),
                        child: Icon(
                          Icons.close,
                          color: ColorConst.customred,
                        ),
                      ),
                      SizedBox(
                        width: 30.w,
                      ),
                      Container(
                          padding: EdgeInsets.all(3.w),
                          decoration: BoxDecoration(
                            color: ColorConst.white,
                            borderRadius: BorderRadius.circular(5),
                            border: Border.all(color: ColorConst.lightGrey2),
                          ),
                          child: Row(
                            children: [
                              Text(
                                'Rejected In :',
                                style: TextStyle(
                                    fontSize: 16.sp,
                                    fontWeight: FontWeight.w700,
                                    color: ColorConst.black),
                              ),
                              SizedBox(
                                width: 5.w,
                              ),
                              Text(
                                '$rejectedJobsCount Jobs',
                                style: TextStyle(
                                    fontSize: 16.sp,
                                    fontWeight: FontWeight.w700,
                                    color: ColorConst.customred),
                              )
                            ],
                          )),
                    ],
                  ),
                ),
                SizedBox(
                  height: 20.h,
                ),
                Container(
                  // width: 0.4.sw,
                  padding:
                      EdgeInsets.symmetric(horizontal: 10.h, vertical: 10.w),
                  decoration: BoxDecoration(
                    color: ColorConst.white,
                    borderRadius: BorderRadius.circular(5),
                    border: Border.all(color: ColorConst.lightGrey2),
                  ),
                  child: Row(
                    children: [
                      Container(
                        decoration: BoxDecoration(
                          color: ColorConst.white,
                          borderRadius: BorderRadius.circular(5),
                          border: Border.all(color: ColorConst.lightGrey2),
                        ),
                        child: Icon(
                          Icons.check,
                          color: Colors.orange,
                        ),
                      ),
                      SizedBox(
                        width: 30.w,
                      ),
                      Container(
                          padding: EdgeInsets.all(3.w),
                          decoration: BoxDecoration(
                            color: ColorConst.white,
                            borderRadius: BorderRadius.circular(5),
                            border: Border.all(color: ColorConst.lightGrey2),
                          ),
                          child: Row(
                            children: [
                              Text(
                                'Profile Filled :',
                                style: TextStyle(
                                    fontSize: 16.sp,
                                    fontWeight: FontWeight.w700,
                                    color: ColorConst.black),
                              ),
                              SizedBox(
                                width: 5.w,
                              ),
                              Text(
                                '$filledProfilesCount %',
                                style: TextStyle(
                                    fontSize: 16.sp,
                                    fontWeight: FontWeight.w700,
                                    color: Colors.orange),
                              )
                            ],
                          )),
                    ],
                  ),
                ),
                SizedBox(
                  height: 20.h,
                ),
                Container(
                  // width: 0.4.sw,
                  padding:
                      EdgeInsets.symmetric(horizontal: 10.h, vertical: 10.w),
                  decoration: BoxDecoration(
                    color: ColorConst.white,
                    borderRadius: BorderRadius.circular(5),
                    border: Border.all(color: ColorConst.lightGrey2),
                  ),
                  child: Row(
                    children: [
                      Container(
                        decoration: BoxDecoration(
                          color: ColorConst.white,
                          borderRadius: BorderRadius.circular(5),
                          border: Border.all(color: ColorConst.lightGrey2),
                        ),
                        child: Icon(
                          Icons.person,
                          color: ColorConst.customBlue,
                        ),
                      ),
                      SizedBox(
                        width: 30.w,
                      ),
                      Container(
                          padding: EdgeInsets.all(3.w),
                          decoration: BoxDecoration(
                            color: ColorConst.white,
                            borderRadius: BorderRadius.circular(5),
                            border: Border.all(color: ColorConst.lightGrey2),
                          ),
                          child: Row(
                            children: [
                              Text(
                                'Application Status :',
                                style: TextStyle(
                                    fontSize: 16.sp,
                                    fontWeight: FontWeight.w700,
                                    color: ColorConst.black),
                              ),
                              SizedBox(
                                width: 5.w,
                              ),
                              Text(
                                applicationStatus,
                                style: TextStyle(
                                    fontSize: 16.sp,
                                    fontWeight: FontWeight.w700,
                                    color: ColorConst.blue),
                              )
                            ],
                          )),
                    ],
                  ),
                ),
                SizedBox(
                  height: 20.h,
                ),
                Container(
                  padding:
                      EdgeInsets.symmetric(horizontal: 10.h, vertical: 10.w),
                  decoration: BoxDecoration(
                    color: ColorConst.white,
                    borderRadius: BorderRadius.circular(5),
                    border: Border.all(color: ColorConst.lightGrey2),
                  ),
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.start,
                    children: [
                      InkWell(
                        onTap: () {
                          setState(() {
                            isOpen = !isOpen;
                          });
                        },
                        splashFactory: NoSplash.splashFactory,
                        focusColor: Colors.transparent,
                        hoverColor: Colors.transparent,
                        overlayColor: MaterialStateColor.resolveWith(
                          (states) => Colors.transparent,
                        ),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Row(
                              children: [
                                Icon(
                                  Icons.check,
                                  color: ColorConst.customPurple,
                                ),
                                SizedBox(
                                  width: 15.w,
                                ),
                                Text(
                                  'Applied In Jobs',
                                  style: TextStyle(
                                      fontSize: 16.sp,
                                      fontWeight: FontWeight.w700,
                                      color: ColorConst.black),
                                ),
                              ],
                            ),
                            Icon(
                              isOpen ? Icons.expand_less : Icons.expand_more,
                              color: ColorConst.customPurple,
                              size: 24.w,
                            ),
                          ],
                        ),
                      ),
                      if (isOpen) ...[
                        SizedBox(height: 20.h),
                        SingleChildScrollView(
                          scrollDirection: Axis.horizontal,
                          child: Column(
                            children: [
                              Row(
                                mainAxisAlignment:
                                    MainAxisAlignment.spaceBetween,
                                children: [
                                  _header('Company'),
                                  _header('Designations'),
                                  _header('Drive Data'),
                                  _header('Package'),
                                  _header('Locations'),
                                  _header('Pdf Link'),
                                ],
                              ),

                              // ..._buildRows(totalApplied.length ?? 0)
                            ],
                          ),
                        )
                      ]
                    ],
                  ),
                )
              ],
            ),
          ),
        );
      },
    );
  }
}

Widget _header(String label) {
  return Container(
    padding: EdgeInsets.symmetric(horizontal: 20.w, vertical: 12.h),
    child: Text(
      label,
      style: TextStyle(
        fontSize: 16.sp,
        fontWeight: FontWeight.w700,
      ),
    ),
  );
}
