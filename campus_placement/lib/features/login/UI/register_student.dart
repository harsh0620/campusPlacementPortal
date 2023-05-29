import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:go_router/go_router.dart';

import '../../../auth/auth_bloc.dart';
import '../../../constants/colors.dart';
import '../../../core/router/router.dart';
import '../../common/utils.dart';
import '../cubit/register_student_cubit.dart';
import 'login_page.dart';

class RegisterStudent extends StatefulWidget {
  const RegisterStudent({super.key});

  @override
  State<RegisterStudent> createState() => _RegisterStudentState();
}

class _RegisterStudentState extends State<RegisterStudent> {
  late TextEditingController _emailController;
  late TextEditingController _nameController;
  late TextEditingController _passwordController;
  late TextEditingController _enrollController;
  late PasswordInput _passwordInput;
  String? emailError;
  String? enrollError;
  String? nameError;
  String? passwordError;

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    _nameController.dispose();
    _enrollController.dispose();
    super.dispose();
  }

  @override
  void initState() {
    super.initState();
    _passwordInput = const PasswordInput.pure();
    _emailController = TextEditingController();
    _passwordController = TextEditingController();
    _nameController = TextEditingController();
    _enrollController = TextEditingController();
  }

  void emailVal(String? value) {
    final regex = RegExp(
        r'^([a-zA-Z0-9_\-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$');
    if (value == null) {
      setState(() {
        emailError = 'Please enter valid email address';
      });
    } else {
      setState(() {
        emailError = regex.hasMatch(value) ? null : 'Invalid Email address';
      });
    }
  }

  void enrollmentVal(String? value) {
    // final regex = RegExp(r'^\d{4}/CTAE/\d{4}$');
    RegExp regex = RegExp(r'^\d{4}/CTAE/\d{4}$');
    if (value == null) {
      setState(() {
        emailError = 'Please enter valid enrollment no.';
      });
    } else {
      setState(() {
        enrollError = regex.hasMatch(value) ? null : 'Invalid Enrollment no.';
      });
    }
  }

  void nameVal(String? value) {
    final alphanumericRegex = RegExp(r'^[a-zA-Z0-9]+$');
    if (value == null) {
      setState(() {
        emailError = 'Please enter valid Name';
      });
    } else {
      setState(() {
        emailError =
            alphanumericRegex.hasMatch(value) ? null : 'Invalid Email address';
      });
    }
  }

  // void passwordVal(String? value) {
  //   setState(() {
  //     passwordError =
  //         value == null || value.isEmpty ? 'Please enter your password' : null;
  //   });
  // }
  void submit() {
    if (_emailController.text.isEmpty) {
      emailVal(_emailController.text);
    }
    if (_nameController.text.isEmpty) {
      nameVal(_passwordController.text);
    }
    if (_enrollController.text.isEmpty) {
      enrollmentVal(_enrollController.text);
    }
    if (emailError == null && passwordError == null) {
      context.read<RegisterStudentCubit>().registerStudent(
          email: _emailController.text.trim(),
          password: _passwordController.text,
          enrollmentNo: _enrollController.text.trim(),
          studentName: _nameController.text.trim());
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: SingleChildScrollView(
          child: Container(
            margin: EdgeInsets.symmetric(horizontal: 20.w, vertical: 40.h),
            // alignment: Alignment.center,
            width: 350.w,

            padding: EdgeInsets.all(20.w),
            decoration: BoxDecoration(
                color: ColorConst.white,
                border: Border.all(color: Colors.black),
                borderRadius: BorderRadius.circular(10)),
            child: BlocConsumer<RegisterStudentCubit, RegisterStudentState>(
              listener: (context, state) {
                if (state.registerStudentStatus ==
                    RegisterStudentStatus.success) {
                  context
                      .read<AuthBloc>()
                      .add(LoginEvent(user: state.user!, token: state.token!));
                  context.goNamed(Routes.root);
                }
                if (state.registerStudentStatus ==
                    RegisterStudentStatus.failure) {
                  // showErrorToast(context);
                }
              },
              builder: (context, state) {
                return Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  mainAxisSize: MainAxisSize.min,
                  children: <Widget>[
                    Text(
                      'Register Student',
                      style: TextStyle(
                        fontSize: 20.sp,
                        fontWeight: FontWeight.w900,
                      ),
                    ),
                    SizedBox(height: 20.0.h),
                    Align(
                      alignment: Alignment.topLeft,
                      child: Text(
                        'Name',
                        style: TextStyle(
                          fontSize: 16.0.sp,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ),
                    SizedBox(height: 10.0.h),
                    CustomTextFormField(
                      controller: _emailController,
                      hint: 'Enter your name',
                      errorText: nameError,
                      onChanged: nameVal,
                    ),
                    SizedBox(height: 10.0.h),
                    Align(
                      alignment: Alignment.topLeft,
                      child: Text(
                        'Email',
                        style: TextStyle(
                          fontSize: 16.0.sp,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ),
                    SizedBox(height: 10.0.h),
                    CustomTextFormField(
                      controller: _emailController,
                      hint: 'Enter Email Address',
                      errorText: emailError,
                      onChanged: emailVal,
                    ),
                    SizedBox(height: 10.0.h),
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
                    SizedBox(height: 10.0.h),
                    CustomTextFormField(
                      controller: _enrollController,
                      hint: 'Enter Enrollment Address',
                      errorText: enrollError,
                      onChanged: enrollmentVal,
                    ),
                    SizedBox(height: 10.0.h),
                    Align(
                      alignment: Alignment.topLeft,
                      child: Text(
                        'Password',
                        style: TextStyle(
                          fontSize: 16.0.sp,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ),
                    SizedBox(height: 10.0.h),
                    CustomTextFormField(
                      controller: _passwordController,
                      hint: 'Enter your Password',
                      errorText: _passwordInput.displayError?.text(),
                      onChanged: (value) => setState(() {
                        _passwordInput = PasswordInput.dirty(value);
                      }),
                    ),
                    SizedBox(height: 10.0.h),
                    SizedBox(
                      width: double.infinity,
                      child: ElevatedButton(
                        style: ButtonStyle(
                          // textStyle: MaterialStateProperty.all(value),
                          backgroundColor:
                              MaterialStateProperty.all(ColorConst.black),
                        ),
                        child: const Text('Login'),
                        onPressed: () {
                          submit();
                          // String userType = _selectedUserType ?? '';
                          // String email = _emailController.text.trim();
                          // String password = _passwordController.text.trim();

                          // Perform login logic here
                          // You can validate the inputs and authenticate the user
                          // using the provided email and password

                          // Clear input fields after login
                          _emailController.clear();
                          _passwordController.clear();
                        },
                      ),
                    ),
                    SizedBox(height: 10.0.h),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                      children: [
                        Row(
                          children: [
                            Text('Have an account ',
                                style: TextStyle(
                                    // fontWeight: FontWeight.w600,
                                    color: ColorConst.black,
                                    fontSize: 11.sp)),
                            InkWell(
                              onTap: () {
                                context.goNamed(Routes.login);
                              },
                              child: Text(
                                'Login',
                                style: TextStyle(
                                    fontWeight: FontWeight.w600,
                                    color: ColorConst.black,
                                    fontSize: 11.sp),
                              ),
                            ),
                          ],
                        ),
                        InkWell(
                          onTap: () {},
                          child: Text(
                            'Forgot Password?',
                            style: TextStyle(
                                fontWeight: FontWeight.w400,
                                color: ColorConst.black,
                                fontSize: 11.sp),
                          ),
                        ),
                      ],
                    )
                  ],
                );
              },
            ),
          ),
        ),
      ),
    );
  }
}
