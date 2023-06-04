import 'package:campus_placement/core/locator/locator.dart';
import 'package:campus_placement/features/student_management/cubit/student_settings_cubit.dart';
import 'package:dropdown_button2/dropdown_button2.dart';
import 'package:flutter/material.dart';
import 'package:flutter/scheduler.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

import '../../../constants/colors.dart';
import '../../login/UI/login_page.dart';
import '../cubit/student_settings_cubit.dart';
import '../cubit/student_settings_cubit.dart';
import '../widgets/academics.dart';
import '../widgets/experience_widget.dart';
import '../widgets/link_widget.dart';
import '../widgets/personal_details.dart';
import '../widgets/projects_widget.dart';
import '../widgets/skills_widget.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class StudentHomeWrapper extends StatelessWidget {
  const StudentHomeWrapper({super.key});

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (ctx) => locator<StudentSettingsCubit>(),
      child: StudentHome(),
    );
  }
}

class StudentHome extends StatefulWidget {
  const StudentHome({super.key});

  @override
  State<StudentHome> createState() => _StudentHomeState();
}

class _StudentHomeState extends State<StudentHome> {
  bool isBasicDetailsopened = false;
  bool isPersonalOpen = false;
  bool isAcademicsOpen = false;
  bool isExperiencesOpen = false;
  bool isProjectsOpen = false;
  bool isSkillsOpen = false;
  bool isCertificatesOpen = false;
  bool isLinksOpen = false;
  bool isDocumentsOpen = false;
  bool isUpDatePasswordOpen = false;

  @override
  Widget build(BuildContext context) {
    final bottomPadding = MediaQuery.of(context).padding.bottom;

    return SingleChildScrollView(
      physics: AlwaysScrollableScrollPhysics(),
      child: Container(
        // height: 515.h,
        padding: EdgeInsets.symmetric(
          horizontal: 15.w,
          vertical: 20.h,
        ),
        // color: Colors.amber,
        child: Column(
          // mainAxisSize: MainAxisSize.max,
          children: [
            DetialsContainer(
              label: 'Basic Details',
              color: ColorConst.customBlue,
              iconWidget: Icon(
                Icons.info_outline,
                // color: Colors.white,
                color: ColorConst.customBlue,
              ),
              child: BlocProvider(
                create: (context) => locator<StudentSettingsCubit>(),
                child: BasicDetailsWidget(),
              ),
            ),
            // SizedBox(
            //   height: 15.h,
            // ),
            // DetialsContainer(
            //   label: 'Basic Details',
            //   color: ColorConst.customPurple,
            //   iconWidget: Icon(
            //     Icons.person,
            //     color: ColorConst.customPurple,
            //   ),
            //   child: BasicDetailsWidget(),
            // ),
            SizedBox(
              height: 15.h,
            ),
            DetialsContainer(
              label: 'Personals',
              color: ColorConst.customPink,
              iconWidget: Icon(
                Icons.school,
                color: ColorConst.customPink,
              ),
              child: PersonelWidget(),
            ),
            SizedBox(
              height: 15.h,
            ),
            AddedContainer(
              label: 'Academic',
              color: ColorConst.customPink,
              iconWidget: Icon(
                Icons.school,
                color: ColorConst.customPink,
              ),
              containerCount: 2,
              child: AcademicsWidget(no: 2),
            ),
            SizedBox(
              height: 15.h,
            ),
            AddedContainer(
              label: 'Professional Experience',
              color: ColorConst.customPink,
              iconWidget: Icon(
                Icons.school,
                color: ColorConst.customPink,
              ),
              containerCount: 2,
              child: ExperienceWidget(no: 2),
            ),
            SizedBox(
              height: 15.h,
            ),
            AddedContainer(
              label: 'Projects',
              color: ColorConst.customPink,
              iconWidget: Icon(
                Icons.school,
                color: ColorConst.customPink,
              ),
              containerCount: 2,
              child: ProjectsWidget(),
            ),
            SizedBox(
              height: 15.h,
            ),
            DetialsContainer(
              label: 'Skills',
              color: ColorConst.customPink,
              iconWidget: Icon(
                Icons.school,
                color: ColorConst.customPink,
              ),
              child: SkillsWidget(skillCount: 2),
            ),
            SizedBox(
              height: 15.h,
            ),
            DetialsContainer(
              label: 'Links',
              color: ColorConst.customPink,
              iconWidget: Icon(
                Icons.school,
                color: ColorConst.customPink,
              ),
              child: LinkWidget(skillCount: 2),
            ),
          ],
        ),
      ),
    );
  }
}

class DetialsContainer extends StatefulWidget {
  final String label;
  final Color color;
  final Widget iconWidget;
  final Widget? child;
  // final List<Widget>? children;
  // final VoidCallback isOpen;

  const DetialsContainer({
    super.key,
    required this.label,
    required this.color,
    required this.iconWidget,
    this.child,
    // this.children
    // required this.openContainer,
    // required this.isOpen
  });

  @override
  State<DetialsContainer> createState() => _DetialsContainerState();
}

class _DetialsContainerState extends State<DetialsContainer> {
  bool openContainer = false;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.symmetric(horizontal: 10.h, vertical: 10.w),
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
              print("Opeining container");
              setState(() {
                openContainer = !openContainer;
              });
              print("Value $openContainer");
              if (openContainer) {
                // context.read<StudentSettingsCubit>().getBasicDetails();
              }
              // widget.isOpen();
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
                    widget.iconWidget,
                    SizedBox(
                      width: 15.w,
                    ),
                    Text(
                      widget.label,
                      style: TextStyle(
                          fontSize: 16.sp,
                          fontWeight: FontWeight.w700,
                          color: ColorConst.black),
                    ),
                  ],
                ),
                Icon(
                  openContainer ? Icons.expand_less : Icons.expand_more,
                  color: widget.color,
                  size: 24.w,
                ),
              ],
            ),
          ),
          if (openContainer) ...[SizedBox(height: 20.h), widget.child!],
          // if(widget.children != null) ...?widget.children,
        ],
      ),
    );
  }
}

class AddedContainer extends StatefulWidget {
  final String label;
  final Color color;
  final Widget iconWidget;
  final int containerCount;
  final Widget child;
  const AddedContainer({
    super.key,
    required this.label,
    required this.color,
    required this.iconWidget,
    required this.containerCount,
    required this.child,
  });

  @override
  State<AddedContainer> createState() => _AddedContainerState();
}

class _AddedContainerState extends State<AddedContainer> {
  bool openContainer = false;
  late int count;
  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    count = widget.containerCount;
  }

  @override
  Widget build(BuildContext context) {
    print("Count:- $count");
    return Container(
      padding: EdgeInsets.symmetric(horizontal: 10.h, vertical: 10.w),
      decoration: BoxDecoration(
          border: Border.all(color: ColorConst.grey),
          borderRadius: BorderRadius.circular(5.r),
          color: ColorConst.white),
      child: Column(
        children: [
          InkWell(
            onTap: () {
              print("Opeining container");
              setState(() {
                openContainer = !openContainer;
              });
              print("Value $openContainer");
              // widget.isOpen();
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
                    widget.iconWidget,
                    SizedBox(
                      width: 15.w,
                    ),
                    Text(
                      widget.label,
                      style: TextStyle(
                          fontSize: 16.sp,
                          fontWeight: FontWeight.w700,
                          color: ColorConst.black),
                    ),
                  ],
                ),
                Icon(
                  openContainer ? Icons.expand_less : Icons.expand_more,
                  color: widget.color,
                  size: 24.w,
                ),
              ],
            ),
          ),
          if (openContainer) ...[
            SizedBox(height: 20.h),
          ],
          // if (openContainer) ...[widget.child],
          if (openContainer) ...List.generate(count, (index) => widget.child),
          if (openContainer) ...[
            SizedBox(height: 20.h),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: [
                Expanded(
                    child: ElevatedButton(
                        onPressed: () {}, child: Text('Update Profile'))),
                SizedBox(
                  width: 15.w,
                ),
                InkWell(
                    onTap: () {
                      setState(() {
                        count += 1;
                      });
                    },
                    child: Icon(
                      Icons.add,
                      color: ColorConst.black,
                    ))
              ],
            )
          ],
        ],
      ),
    );
  }
}

class BasicDetailsWidget extends StatefulWidget {
  const BasicDetailsWidget({super.key});

  @override
  State<BasicDetailsWidget> createState() => _BasicDetailsWidgetState();
}

class _BasicDetailsWidgetState extends State<BasicDetailsWidget> {
  late TextEditingController _nameController;
  late TextEditingController _aboutMeController;
  late TextEditingController _enrollController;
  String? _aboutMeval;
  String? _enrollVal;
  String? enrollError;
  String? nameError;
  String? aboutMeError;
  String? _nameVal;
  @override
  void dispose() {
    _aboutMeController.dispose();
    _nameController.dispose();
    _enrollController.dispose();
    super.dispose();
  }

  @override
  void initState() {
    super.initState();
    print("Calling innit state");
    context.read<StudentSettingsCubit>().getBasicDetails();

    _aboutMeController = TextEditingController();
    _nameController = TextEditingController();
    _enrollController = TextEditingController();
  }

  // Future<void> loadAndSetData()async{
  //   SchedulerBinding.instance.addPostFrameCallback((timeStamp) {
  //
  //   _nameController.text =
  //   });

  // }

  bool nameVal(String? value) {
    // final alphanumericRegex = RegExp(r'^[a-zA-Z0-9]+$');
    // final regex = RegExp(r'^[a-zA-Z0-9]+(?:\s[a-zA-Z0-9]+)*$');
    if (value == null) {
      setState(() {
        nameError = 'Please enter valid Name';
      });
      return false;
    } else {
      setState(() {
        nameError = null;
      });
      return true;
    }
  }

  bool enrollmentVal(String? value) {
    if (value == null) {
      setState(() {
        enrollError = 'Please enter valid enrollment no.';
      });
      return false;
    } else {
      setState(() {
        enrollError = null;
      });
      return true;
    }
  }

  @override
  Widget build(BuildContext context) {
    return BlocConsumer<StudentSettingsCubit, StudentSettingsState>(
      listener: (context, state) {
        // print("Listening to StudentSettingsCubit");
        if (state.getBasicStatus ==
            StudentSettingsGetBasicDetailsStatus.success) {
          setState(() {
            _nameController.text = state.name ?? '';
            _aboutMeController.text = state.about ?? '';
            _enrollController.text = state.enrollmentNo ?? '';
          });
        }
        // TODO: implement listener
      },
      builder: (context, state) {
        // print("State $state");
        return Container(
          padding: EdgeInsets.symmetric(horizontal: 10.h, vertical: 10.h),
          decoration: BoxDecoration(
              border: Border.all(color: ColorConst.grey),
              borderRadius: BorderRadius.circular(5.r),
              color: ColorConst.white),
          child: SingleChildScrollView(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.start,
              mainAxisSize: MainAxisSize.min,
              children: [
                Align(
                  alignment: Alignment.topLeft,
                  child: Text(
                    'Name',
                    style: TextStyle(
                      fontSize: 18.sp,
                      fontWeight: FontWeight.w900,
                    ),
                  ),
                ),
                SizedBox(height: 20.0.h),
                CustomTextFormField(
                  // initialValue: _nameVal,
                  controller: _nameController,
                  hint: 'Enter your name',
                  errorText: nameError,
                  onChanged: (val) {
                    if (nameVal(val)) {
                      setState(() {
                        _nameVal = val;
                      });
                    }
                  },
                ),
                SizedBox(height: 20.0.h),
                Align(
                  alignment: Alignment.topLeft,
                  child: Text(
                    'Enrollment No.',
                    style: TextStyle(
                      fontSize: 16.0.sp,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
                SizedBox(height: 20.0.h),
                CustomTextFormField(
                  // initialValue: _enrollVal,
                  controller: _enrollController,
                  // controller:
                  //     TextEditingController(text: state.enrollmentNo ?? ''),
                  hint: 'Enter Enrollment No.',
                  errorText: enrollError,
                  onChanged: (val) {
                    if (enrollmentVal(val)) {
                      setState(() {
                        _enrollVal = val;
                      });
                    }
                  },
                ),
                SizedBox(height: 20.0.h),
                Align(
                  alignment: Alignment.topLeft,
                  child: Text(
                    'About',
                    style: TextStyle(
                      fontSize: 16.0.sp,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
                SizedBox(height: 10.0.h),
                TextField(
                  onChanged: (value) {
                    setState(() {
                      _aboutMeval = value;
                    });
                  },
                  controller: _aboutMeController,
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
                    hintText: 'Enter Description about yourself',
                    focusedBorder: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(6),
                      borderSide: const BorderSide(
                        color: ColorConst.dartGrey3,
                        width: 2,
                      ),
                    ),
                  ),
                ),
                SizedBox(height: 20.0.h),
                SizedBox(
                  width: double.infinity,
                  child: ElevatedButton(
                      onPressed: () {
                        context
                            .read<StudentSettingsCubit>()
                            .updateBasicDetailsStudent(
                                name: _nameVal,
                                about: _aboutMeval,
                                enrollmentNo: _enrollVal);
                      },
                      child: Text(
                        'Update Profile',
                        style: TextStyle(color: Colors.white, fontSize: 16.sp),
                      )),
                )
              ],
            ),
          ),
        );
      },
    );
  }
}

class TextContainer extends StatelessWidget {
  final String label;
  final String hint;
  final TextEditingController controller;
  final String? errorText;
  final Function(String)? onChanged;
  final double? upperHeight;
  final double? height;
  const TextContainer(
      {super.key,
      this.height,
      this.upperHeight,
      required this.errorText,
      required this.label,
      required this.hint,
      required this.onChanged,
      required this.controller});

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        if (upperHeight != null) ...[
          SizedBox(
            height: upperHeight,
          )
        ],
        Align(
          alignment: Alignment.topLeft,
          child: Text(
            label,
            style: TextStyle(
              fontSize: 18.sp,
              fontWeight: FontWeight.w600,
            ),
          ),
        ),
        SizedBox(height: 10.0.h),
        CustomTextFormField(
          controller: controller,
          hint: hint,
          errorText: errorText,
          onChanged: onChanged,
        ),
        SizedBox(height: height ?? 20.0.h),
      ],
    );
  }
}
