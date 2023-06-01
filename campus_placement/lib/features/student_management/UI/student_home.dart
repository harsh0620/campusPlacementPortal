import 'package:dropdown_button2/dropdown_button2.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

import '../../../constants/colors.dart';
import '../../login/UI/login_page.dart';

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

    return Container(
      height: 515.h,
      padding: EdgeInsets.symmetric(
        horizontal: 15.w,
        vertical: 20.h,
      ),
      // color: Colors.amber,
      child: SingleChildScrollView(
        physics: AlwaysScrollableScrollPhysics(),
        child: Column(
          // mainAxisSize: MainAxisSize.max,
          children: [
            // DetialsContainer(
            //   label: 'Basic Details',
            //   color: ColorConst.customBlue,
            //   iconWidget: Icon(
            //     Icons.info_outline,
            //     // color: Colors.white,
            //     color: ColorConst.customBlue,
            //   ),
            //   child: BasicDetailsWidget(),
            // ),
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
            // SizedBox(
            //   height: 15.h,
            // ),
            DetialsContainer(
              label: 'Personals',
              color: ColorConst.customPink,
              iconWidget: Icon(
                Icons.school,
                color: ColorConst.customPink,
              ),
              child: PersonelWidget(),
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
  final Widget child;
  // final VoidCallback isOpen;

  const DetialsContainer({
    super.key,
    required this.label,
    required this.color,
    required this.iconWidget,
    required this.child,
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
    return SingleChildScrollView(
      physics: AlwaysScrollableScrollPhysics(),
      child: Container(
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
                      // SizedBox(
                      //   //<-- SEE HERE
                      //   width: 22.w,
                      //   height: 22.w,
                      //   child: FittedBox(
                      //     //<-- SEE HERE
                      //     child: FloatingActionButton(
                      //       //<-- SEE HERE
                      //       backgroundColor: widget.color,
                      //       onPressed: () {
                      //         print("Opeining container");
                      //         setState(() {
                      //           openContainer = !openContainer;
                      //         });
                      //         print("Value $openContainer");
                      //       },
                      //       child: widget.iconWidget,
                      //     ),
                      //   ),
                      // ),
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
                  // SizedBox(
                  //   //<-- SEE HERE
                  //   width: 22.w,
                  //   height: 22.w,
                  //   child: FittedBox(
                  //     //<-- SEE HERE
                  //     child: FloatingActionButton(
                  //       //<-- SEE HERE
                  //       backgroundColor: widget.color,
                  //       onPressed: () {
                  //         print("Opeining container");
                  //         setState(() {
                  //           openContainer = !openContainer;
                  //         });
                  //         print("Value $openContainer");
                  //       },
                  //       child: Icon(
                  //         openContainer ? Icons.expand_less : Icons.expand_more,
                  //         color: Colors.white,
                  //         size: 24.w,
                  //       ),
                  //     ),
                  //   ),
                  // ),
                  // FloatingActionButton.small(
                  //   //<-- SEE HERE
                  //   backgroundColor: Colors.amberAccent,
                  //   onPressed: () {},
                  //   child: Icon(
                  //     openContainer ? Icons.expand_less : Icons.expand_more,
                  //     color: widget.color,
                  //     size: 24.w,
                  //   ),
                  // ),
                  Icon(
                    openContainer ? Icons.expand_less : Icons.expand_more,
                    color: widget.color,
                    size: 24.w,
                  ),
                ],
              ),
            ),
            if (openContainer) ...[SizedBox(height: 20.h), widget.child]
          ],
        ),
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
  String? enrollError;
  String? nameError;
  String? aboutMeError;
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

    _aboutMeController = TextEditingController();
    _nameController = TextEditingController();
    _enrollController = TextEditingController();
  }

  void nameVal(String? value) {
    // final alphanumericRegex = RegExp(r'^[a-zA-Z0-9]+$');
    // final regex = RegExp(r'^[a-zA-Z0-9]+(?:\s[a-zA-Z0-9]+)*$');
    if (value == null) {
      setState(() {
        nameError = 'Please enter valid Name';
      });
    } else {
      setState(() {
        nameError = null;
      });
    }
  }

  void enrollmentVal(String? value) {
    if (value == null) {
      setState(() {
        enrollError = 'Please enter valid enrollment no.';
      });
    } else {
      setState(() {
        enrollError = null;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
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
              controller: _nameController,
              hint: 'Enter your name',
              errorText: nameError,
              onChanged: nameVal,
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
              controller: _enrollController,
              hint: 'Enter Enrollment No.',
              errorText: enrollError,
              onChanged: enrollmentVal,
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
                  onPressed: () {},
                  child: Text(
                    'Update Profile',
                    style: TextStyle(color: Colors.white, fontSize: 16.sp),
                  )),
            )
          ],
        ),
      ),
    );
  }
}

class PersonelWidget extends StatefulWidget {
  const PersonelWidget({super.key});

  @override
  State<PersonelWidget> createState() => _PersonelWidgetState();
}

class _PersonelWidgetState extends State<PersonelWidget> {
  late TextEditingController _dobontroller;
  late TextEditingController _phoneController;
  late TextEditingController _aadharController;
  late TextEditingController _clgNameontroller;
  late TextEditingController _universityController;
  late TextEditingController _fatherNameController;
  late TextEditingController _motherrNameController;
  late TextEditingController _addressController;
  late TextEditingController _permanentaddressController;
  late TextEditingController _pincodeController;
  late TextEditingController _cityController;
  late TextEditingController _stateController;
  late TextEditingController _countryController;
  String? phoneError;
  String? aadharError;
  String? clgError;
  String? uniError;
  String? fatherError;
  String? motherError;
  String? addressError;
  String? permanentAddressError;
  String? pincodeError;
  String? cityError;
  String? stateError;
  String? countryError;
  String? dobError;

  late String selectedValue;
  late String degreeSelectedValue;
  late String streamSelectedValue;

  late List<DropdownMenuItem<String>> genderList;
  late List<DropdownMenuItem<String>> degreeTypeList;
  late List<DropdownMenuItem<String>> streamTypeList;
  static const List<String> degreeList = [
    'B. Tech',
    'M. Tech',
    'MBA',
    'MCA',
    'BBA',
    'BCA',
    'B. Sc',
    'M. Sc'
  ];
  static const List<String> streamList = [
    'Computer Science',
    'Electronics',
    'Mechanical',
    'Civil',
    'Electrical',
    'Agriculture',
    'Mining',
    'Chemical',
    'Biotechnology',
    'Food Technology',
    'Textile'
  ];
  @override
  void dispose() {
    _dobontroller.dispose();
    _phoneController.dispose();
    _aadharController.dispose();
    _clgNameontroller.dispose();
    _universityController.dispose();
    _fatherNameController.dispose();
    _motherrNameController.dispose();
    _addressController.dispose();
    _permanentaddressController.dispose();
    _pincodeController.dispose();
    _cityController.dispose();
    _stateController.dispose();
    _countryController.dispose();

    super.dispose();
  }

  @override
  void initState() {
    super.initState();
    genderList = [
      DropdownMenuItem(
          value: 'Male',
          child: Text(
            'Male',
            // type: TextType.text5,
            style: TextStyle(
              fontSize: 16.sp,
              fontWeight: FontWeight.w600,
              color: ColorConst.black,
            ),
          )),
      DropdownMenuItem(
          value: 'Female',
          child: Text(
            'Female',
            // type: TextType.text5,
            style: TextStyle(
              fontSize: 16.sp,
              fontWeight: FontWeight.w600,
              color: ColorConst.black,
            ),
          )),
      DropdownMenuItem(
          value: 'Others',
          child: Text(
            'Others',
            // type: TextType.text5,
            style: TextStyle(
              fontSize: 16.sp,
              fontWeight: FontWeight.w600,
              color: ColorConst.black,
            ),
          ))
    ];
    degreeTypeList = List.generate(
      8,
      (index) => DropdownMenuItem(
          value: degreeList[index],
          child: Text(
            degreeList[index],
            style: TextStyle(
              fontSize: 16.sp,
              fontWeight: FontWeight.w600,
              color: ColorConst.black,
            ),
          )),
    );
    streamTypeList = List.generate(
      8,
      (index) => DropdownMenuItem(
          value: streamList[index],
          child: Text(
            streamList[index],
            style: TextStyle(
              fontSize: 16.sp,
              fontWeight: FontWeight.w600,
              color: ColorConst.black,
            ),
          )),
    );
    selectedValue = genderList[0].value ?? 'Male';
    degreeSelectedValue = degreeTypeList[0].value ?? 'B. Tech';
    streamSelectedValue = streamTypeList[0].value ?? 'Computer Science';
    _dobontroller = TextEditingController();
    _clgNameontroller = TextEditingController();
    _phoneController = TextEditingController();
    _aadharController = TextEditingController();
    _universityController = TextEditingController();
    _fatherNameController = TextEditingController();
    _motherrNameController = TextEditingController();
    _addressController = TextEditingController();
    _permanentaddressController = TextEditingController();
    _pincodeController = TextEditingController();
    _cityController = TextEditingController();
    _stateController = TextEditingController();
    _countryController = TextEditingController();
  }

  void phoneValidation(String value) {
    RegExp digitRegex = RegExp(r'^[0-9]+$');
    if (value.isEmpty) {
      setState(() {
        phoneError = null;
      });
    } else {
      setState(() {
        phoneError =
            digitRegex.hasMatch(value.trim()) ? null : 'Enter digits only';
      });
    }
  }

  void aadharValidation(String value) {
    RegExp digitRegex = RegExp(r'^[0-9]+$');
    if (value.isEmpty) {
      setState(() {
        aadharError = null;
      });
    } else {
      setState(() {
        aadharError =
            digitRegex.hasMatch(value.trim()) ? null : 'Enter digits only';
      });
    }
  }

  void clgNameValidation(
    String value,
  ) {
    if (value.isEmpty) {
      setState(() {
        clgError = null;
      });
    } else {
      setState(() {
        clgError = 'Enter text';
      });
    }
  }

  void uniValidation(
    String value,
  ) {
    if (value.isEmpty) {
      setState(() {
        uniError = null;
      });
    } else {
      setState(() {
        uniError = 'Enter text';
      });
    }
  }

  void fatherValidation(
    String value,
  ) {
    if (value.isEmpty) {
      setState(() {
        fatherError = null;
      });
    } else {
      setState(() {
        fatherError = 'Enter text';
      });
    }
  }

  void motherValidation(
    String value,
  ) {
    if (value.isEmpty) {
      setState(() {
        motherError = null;
      });
    } else {
      setState(() {
        motherError = 'Enter text';
      });
    }
  }

  void currentAddValidation(
    String value,
  ) {
    if (value.isEmpty) {
      setState(() {
        addressError = null;
      });
    } else {
      setState(() {
        addressError = 'Enter Address';
      });
    }
  }

  void perAddValidation(
    String value,
  ) {
    if (value.isEmpty) {
      setState(() {
        permanentAddressError = null;
      });
    } else {
      setState(() {
        permanentAddressError = 'Enter Address';
      });
    }
  }

  void cityValidation(
    String value,
  ) {
    if (value.isEmpty) {
      setState(() {
        cityError = null;
      });
    } else {
      setState(() {
        cityError = 'Enter city';
      });
    }
  }

  void stateValidation(
    String value,
  ) {
    if (value.isEmpty) {
      setState(() {
        stateError = null;
      });
    } else {
      setState(() {
        stateError = 'Enter State';
      });
    }
  }

  void countryValidation(
    String value,
  ) {
    if (value.isEmpty) {
      setState(() {
        countryError = null;
      });
    } else {
      setState(() {
        countryError = 'Enter Address';
      });
    }
  }

  void pincodeValidation(
    String value,
  ) {
    final RegExp pattern = RegExp(r'^\d{6}$');
    if (value.isEmpty) {
      setState(() {
        phoneError = null;
      });
    } else {
      setState(() {
        phoneError =
            pattern.hasMatch(value.trim()) ? null : 'Enter only 6 digits';
      });
    }
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
          Align(
            alignment: Alignment.topLeft,
            child: Text(
              'Phone',
              style: TextStyle(
                fontSize: 18.sp,
                fontWeight: FontWeight.w900,
              ),
            ),
          ),
          SizedBox(height: 10.0.h),
          CustomTextFormField(
            controller: _phoneController,
            hint: 'Enter Contact No.',
            errorText: phoneError,
            onChanged: phoneValidation,
          ),
          SizedBox(height: 20.0.h),
          Align(
            alignment: Alignment.topLeft,
            child: Text(
              'Aadhar No.',
              style: TextStyle(
                fontSize: 18.sp,
                fontWeight: FontWeight.w900,
              ),
            ),
          ),
          SizedBox(height: 10.0.h),
          CustomTextFormField(
            controller: _phoneController,
            hint: 'Enter Aadhar No.',
            errorText: aadharError,
            onChanged: aadharValidation,
          ),
          SizedBox(height: 20.0.h),
          Align(
            alignment: Alignment.topLeft,
            child: Text(
              'Gender',
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
              items: genderList,
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
          SizedBox(height: 20.0.h),
          Align(
            alignment: Alignment.topLeft,
            child: Text(
              'Degree',
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
              items: degreeTypeList,
              value: degreeSelectedValue,
              onChanged: (String? newValue) {
                setState(() {
                  degreeSelectedValue = newValue!;
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
          SizedBox(height: 20.0.h),
          Align(
            alignment: Alignment.topLeft,
            child: Text(
              'Stream',
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
              items: streamTypeList,
              value: streamSelectedValue,
              onChanged: (String? newValue) {
                setState(() {
                  streamSelectedValue = newValue!;
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
          SizedBox(height: 20.0.h),
          TextContainer(
              errorText: fatherError,
              label: 'Father Name',
              hint: "Enter Father's Name",
              onChanged: fatherValidation,
              controller: _fatherNameController),
          TextContainer(
              errorText: motherError,
              label: "Mother's Name",
              hint: "Enter Mother's Name",
              onChanged: motherValidation,
              controller: _motherrNameController),
          TextContainer(
              errorText: addressError,
              label: 'Current Address',
              hint: 'Enter Address',
              onChanged: currentAddValidation,
              controller: _addressController),
          TextContainer(
              errorText: permanentAddressError,
              label: 'Permanent Address',
              hint: 'Enter permanent address',
              onChanged: perAddValidation,
              controller: _permanentaddressController),
          TextContainer(
              errorText: pincodeError,
              label: 'Pincode',
              hint: 'Enter 6 digit pincode',
              onChanged: pincodeValidation,
              controller: _pincodeController),
          TextContainer(
              errorText: cityError,
              label: 'City',
              hint: 'Enter city',
              onChanged: cityValidation,
              controller: _cityController),
          TextContainer(
              errorText: stateError,
              label: 'State',
              hint: 'Enter state',
              onChanged: stateValidation,
              controller: _stateController),
          TextContainer(
            errorText: countryError,
            label: 'Country',
            hint: 'Enter city',
            onChanged: countryValidation,
            controller: _countryController,
            height: 10.h,
          ),
          Divider(
            thickness: 2.w,
            color: ColorConst.grey,
          ),
          TextContainer(
              upperHeight: 10.h,
              errorText: clgError,
              label: 'College Name',
              hint: 'Enter College Name',
              onChanged: clgNameValidation,
              controller: _clgNameontroller),
          TextContainer(
              errorText: uniError,
              label: 'University Name',
              hint: 'Enter University Name',
              onChanged: uniValidation,
              controller: _universityController),
        ],
      ),
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
              fontWeight: FontWeight.w900,
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
