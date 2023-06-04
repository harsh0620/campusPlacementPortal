import 'package:dropdown_button2/dropdown_button2.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

import '../../../constants/colors.dart';
import '../../login/UI/login_page.dart';
import '../UI/student_home.dart';
import '../cubit/student_settings_cubit.dart';

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

  String? phoneVal;
  String? aadharVal;
  String? clgVal;
  String? uniVal;
  String? fatherVal;
  String? motherVal;
  String? addressVal;
  String? permanentAddressVal;
  String? pincodeVal;
  String? cityVal;
  String? stateVal;
  String? countryVal;
  String? dobVal;

  late String selectedValue;
  late String degreeSelectedValue;
  late String streamSelectedValue;

  late List<DropdownMenuItem<String>> genderList;
  late List<DropdownMenuItem<String>> degreeTypeList;
  late List<DropdownMenuItem<String>> streamTypeList;
  static const List<String> degreeList = [
    'B.Tech',
    'M.Tech',
    'MBA',
    'MCA',
    'BBA',
    'BCA',
    'B.Sc',
    'M.Sc'
  ];
  static const List<String> streamList = [
    "Computer Science",
    "Electronics",
    "Mechanical",
    "Civil",
    "Electrical",
    "Agriculture",
    "Mining",
    "Chemical",
    "Biotechnology",
    "Food Technology",
    "Textile",
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
    degreeSelectedValue = degreeTypeList[0].value ?? 'B.Tech';
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
    print("Calling init state");
    context.read<StudentSettingsCubit>().getPersonalDetailsStudent();
  }

  void phoneValidation(String value) {
    RegExp digitRegex = RegExp(r'^\d{10}$');
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
        clgError = 'Enter text';
      });
    } else {
      setState(() {
        clgError = null;
      });
    }
  }

  void uniValidation(
    String value,
  ) {
    if (value.isEmpty) {
      setState(() {
        uniError = 'Enter text';
      });
    } else {
      setState(() {
        uniError = null;
      });
    }
  }

  void fatherValidation(
    String value,
  ) {
    if (value.isEmpty) {
      setState(() {
        fatherError = 'Enter text';
      });
    } else {
      setState(() {
        fatherError = null;
      });
    }
  }

  void motherValidation(
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

  void currentAddValidation(
    String value,
  ) {
    if (value.isEmpty) {
      setState(() {
        addressError = 'Enter Address';
      });
    } else {
      setState(() {
        addressError = null;
      });
    }
  }

  void perAddValidation(
    String value,
  ) {
    if (value.isEmpty) {
      setState(() {
        permanentAddressError = 'Enter Address';
      });
    } else {
      setState(() {
        permanentAddressError = null;
      });
    }
  }

  void cityValidation(
    String value,
  ) {
    if (value.isEmpty) {
      setState(() {
        cityError = 'Enter city';
      });
    } else {
      setState(() {
        cityError = null;
      });
    }
  }

  void stateValidation(
    String value,
  ) {
    if (value.isEmpty) {
      setState(() {
        stateError = 'Enter State';
      });
    } else {
      setState(() {
        stateError = null;
      });
    }
  }

  void countryValidation(
    String value,
  ) {
    if (value.isEmpty) {
      setState(() {
        countryError = 'Enter Address';
      });
    } else {
      setState(() {
        countryError = null;
      });
    }
  }

  void pincodeValidation(
    String value,
  ) {
    final RegExp pattern = RegExp(r'^\d{6}$');
    if (value.isEmpty) {
      setState(() {
        pincodeError = null;
      });
    } else {
      setState(() {
        pincodeError =
            pattern.hasMatch(value.trim()) ? null : 'Enter only 6 digits';
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return BlocConsumer<StudentSettingsCubit, StudentSettingsState>(
      listener: (context, state) {
        if (state.getPersonalDetailsStatus ==
            StudentSettingsGetPersonalDetailsStudent.success) {
          print(
              "Inside state StudentSettingsGetPersonalDetailsStudent success ");
          print("Ste dob = ${state.personalDetails?.dob}");
          setState(() {
            streamSelectedValue =
                state.personalDetails?.stream ?? 'Computer Science';
            degreeSelectedValue = state.personalDetails?.degree ?? 'B.Tech';
            selectedValue = state.personalDetails?.gender ?? 'Male';
            _aadharController.text = state.personalDetails?.aadharNo ?? '';
            _addressController.text =
                state.personalDetails?.currentAddress ?? '';
            _permanentaddressController.text =
                state.personalDetails?.permanentAddress ?? '';
            _cityController.text = state.personalDetails?.city ?? '';
            _clgNameontroller.text = state.personalDetails?.clgName ?? '';
            _countryController.text = state.personalDetails?.country ?? '';
            _stateController.text = state.personalDetails?.state ?? '';
            _dobontroller.text = state.personalDetails?.dob ?? '';
            _fatherNameController.text =
                state.personalDetails?.fatherName ?? '';
            _motherrNameController.text =
                state.personalDetails?.motherName ?? '';
            _phoneController.text = state.personalDetails?.phoneNumber ?? '';
            _pincodeController.text = state.personalDetails?.pincode ?? '';
          });
        }
        // TODO: implement listener
      },
      builder: (context, state) {
        print("Phone Controller:- ${_phoneController.text}");
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
                // label: ,
                controller: _phoneController,
                hint: 'Enter Contact No.',
                errorText: phoneError,
                onChanged: (val) {
                  phoneValidation(val);
                  if (phoneError == null) {
                    setState(() {
                      phoneVal = val;
                    });
                  }
                },
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
                controller: _aadharController,
                hint: 'Enter Aadhar No.',
                errorText: aadharError,
                onChanged: (p0) {
                  aadharValidation(p0);
                  if (aadharError == null) {
                    setState(() {
                      aadharVal = p0;
                    });
                  }
                },
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
                  onChanged: (p0) {
                    fatherValidation(p0);
                    if (fatherError == null) {
                      fatherVal = p0;
                    }
                  },
                  controller: _fatherNameController),
              TextContainer(
                  errorText: motherError,
                  label: "Mother's Name",
                  hint: "Enter Mother's Name",
                  onChanged: (p0) {
                    motherValidation(p0);
                    if (motherError == null) {
                      motherVal = p0;
                    }
                  },
                  controller: _motherrNameController),
              TextContainer(
                  errorText: addressError,
                  label: 'Current Address',
                  hint: 'Enter Address',
                  onChanged: (p0) {
                    currentAddValidation(p0);
                    if (addressError == null) {
                      _addressController.text = p0;
                    }
                  },
                  controller: _addressController),
              TextContainer(
                  errorText: permanentAddressError,
                  label: 'Permanent Address',
                  hint: 'Enter permanent address',
                  onChanged: (p0) {
                    perAddValidation(p0);
                    if (permanentAddressError == null) {
                      permanentAddressVal = p0;
                    }
                  },
                  controller: _permanentaddressController),
              TextContainer(
                  errorText: pincodeError,
                  label: 'Pincode',
                  hint: 'Enter 6 digit pincode',
                  onChanged: (p0) {
                    pincodeValidation(p0);
                    if (pincodeError == null) {
                      pincodeVal = p0;
                    }
                  },
                  controller: _pincodeController),
              TextContainer(
                  errorText: cityError,
                  label: 'City',
                  hint: 'Enter city',
                  onChanged: (p0) {
                    cityValidation(p0);
                    if (cityError == null) {
                      cityVal = p0;
                    }
                  },
                  controller: _cityController),
              TextContainer(
                  errorText: stateError,
                  label: 'State',
                  hint: 'Enter state',
                  onChanged: (p0) {
                    stateValidation(p0);
                    if (stateError == null) {
                      stateVal = p0;
                    }
                  },
                  controller: _stateController),
              TextContainer(
                errorText: countryError,
                label: 'Country',
                hint: 'Enter city',
                onChanged: (p0) {
                  countryValidation(p0);
                  if (countryError == null) {
                    countryVal = p0;
                  }
                },
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
                  onChanged: (p0) {
                    clgNameValidation(p0);
                    if (clgError == null) {
                      clgVal = p0;
                    }
                  },
                  controller: _clgNameontroller),
              TextContainer(
                  errorText: uniError,
                  label: 'University Name',
                  hint: 'Enter University Name',
                  onChanged: (p0) {
                    uniValidation(p0);
                    if (uniError == null) {
                      uniVal = p0;
                    }
                  },
                  controller: _universityController),
              SizedBox(height: 20.0.h),
              SizedBox(
                width: double.infinity,
                child: ElevatedButton(
                    onPressed: () {
                      context
                          .read<StudentSettingsCubit>()
                          .updateStudentProfilePersonal(
                            dob: dobVal,
                            gender: selectedValue,
                            contactNo: phoneVal,
                            aadharNo: aadharVal,
                            program: degreeSelectedValue,
                            stream: streamSelectedValue,
                            universityName: uniVal,
                            collegeName: clgVal,
                            fatherName: fatherVal,
                            motherName: motherVal,
                            currentAddress: addressVal,
                            permanentAddress: permanentAddressVal,
                            pincode: pincodeVal,
                            homeCity: cityVal,
                            homeState: stateVal,
                            homeCountry: countryVal,
                          );
                    },
                    child: Text(
                      'Update Profile',
                      style: TextStyle(color: Colors.white, fontSize: 16.sp),
                    )),
              )
            ],
          ),
        );
      },
    );
  }
}
