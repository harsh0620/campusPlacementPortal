import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:go_router/go_router.dart';

import '../../../auth/auth_bloc.dart';
import '../../../constants/colors.dart';
import '../../../core/router/router.dart';
import '../cubit/login_cubit.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({super.key});

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  String _selectedUserType = 'Admin';
  late TextEditingController _emailController;
  late TextEditingController _passwordController;
  String? emailError;
  String? passwordError;

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  @override
  void initState() {
    super.initState();
    _emailController = TextEditingController();
    _passwordController = TextEditingController();
  }

  List<String> _userTypes = [
    'Admin',
    'Company',
    'Student',
  ];

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

  void passwordVal(String? value) {
    setState(() {
      passwordError =
          value == null || value.isEmpty ? 'Please enter your password' : null;
    });
  }

  void submit() {
    if (_emailController.text.isEmpty) {
      emailVal(_emailController.text);
    }
    if (_passwordController.text.isEmpty) {
      passwordVal(_passwordController.text);
    }
    if (emailError == null && passwordError == null) {
      context.read<LoginCubit>().login(
            _emailController.text.trim(),
            _passwordController.text,
            _selectedUserType,
          );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      // appBar: AppBar(
      //   title: Text('Login Page'),
      // ),
      body: Center(
        child: SingleChildScrollView(
          child: Container(
            margin: EdgeInsets.all(20.w),
            // alignment: Alignment.center,
            width: 350.w,

            padding: EdgeInsets.all(20.w),
            decoration: BoxDecoration(
                color: ColorConst.white,
                border: Border.all(color: Colors.black),
                borderRadius: BorderRadius.circular(10)),
            child: BlocConsumer<LoginCubit, LoginState>(
              listener: (context, state) {
                if (state.loginStatus == LoginStatus.success) {
                  context
                      .read<AuthBloc>()
                      .add(LoginEvent(user: state.user!, token: state.token!));
                  context.goNamed(Routes.root);
                }
                if (state.loginStatus == LoginStatus.failure) {
                  // showErrorToast(context);
                }
              },
              builder: (context, state) {
                return Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  mainAxisSize: MainAxisSize.min,
                  children: <Widget>[
                    Text(
                      'Login',
                      style: TextStyle(
                        fontSize: 20.sp,
                        fontWeight: FontWeight.w900,
                      ),
                    ),
                    SizedBox(height: 40.0.h),
                    Align(
                      alignment: Alignment.topLeft,
                      child: Text(
                        'User Type',
                        style: TextStyle(
                          fontSize: 16.0.sp,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ),
                    SizedBox(height: 20.0.h),
                    DropdownButtonFormField<String>(
                      value: _selectedUserType,
                      decoration: const InputDecoration(
                        filled: true,
                        fillColor: ColorConst.white,
                        border: OutlineInputBorder(
                          borderSide: BorderSide(color: Colors.grey),
                        ),
                        // labelText: 'User Type',
                      ),
                      items: _userTypes.map((String userType) {
                        return DropdownMenuItem<String>(
                          value: userType,
                          child: Text(userType),
                        );
                      }).toList(),
                      onChanged: (String? value) {
                        setState(() {
                          _selectedUserType = value ?? '';
                        });
                      },
                    ),
                    SizedBox(height: 20.0.h),
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
                    SizedBox(height: 20.0.h),
                    CustomTextFormField(
                      controller: _emailController,
                      hint: 'Enter Email Address',
                      errorText: emailError,
                      onChanged: emailVal,
                    ),
                    SizedBox(height: 20.0.h),
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
                    SizedBox(height: 20.0.h),
                    CustomTextFormField(
                      obscureText: true,
                      controller: _passwordController,
                      hint: 'Enter your Password',
                      errorText: passwordError,
                      onChanged: passwordVal,
                    ),
                    SizedBox(height: 20.0.h),
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
                    SizedBox(height: 20.0.h),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                      children: [
                        Row(
                          children: [
                            Text('Dont have an Account ',
                                style: TextStyle(
                                    // fontWeight: FontWeight.w600,
                                    color: ColorConst.black,
                                    fontSize: 11.sp)),
                            InkWell(
                              onTap: () {
                                context.goNamed(Routes.registerStudentPage);
                              },
                              child: Text(
                                'Register',
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

// class CustomTextFormField extends StatelessWidget {
//   const CustomTextFormField(
//       {super.key,
//       this.controller,
//       this.hint,
//       this.obscureText = false,
//       this.errorText,
//       this.onChanged,
//       this.onSubmitted,
//       this.initialValue});

//   final TextEditingController? controller;
//   final String? hint;
//   final bool obscureText;
//   final String? errorText;
//   final void Function(String)? onChanged;
//   final void Function(String?)? onSubmitted;
//   final String? initialValue;

//   @override
//   Widget build(BuildContext context) {
//     return TextFormField(
//       obscureText: obscureText,
//       controller: controller,
//       initialValue: initialValue,
//       keyboardType: TextInputType.emailAddress,
//       decoration: InputDecoration(
//         filled: true,
//         hoverColor: Colors.transparent,
//         focusColor: ColorConst.white,
//         fillColor: ColorConst.white,
//         disabledBorder: OutlineInputBorder(
//           borderRadius: BorderRadius.circular(6),
//           borderSide: BorderSide(
//             color: ColorConst.lightGrey3,
//             width: 1.w,
//           ),
//         ),
//         enabledBorder: OutlineInputBorder(
//           borderRadius: BorderRadius.circular(6),
//           borderSide: const BorderSide(
//             color: ColorConst.dartGrey3,
//             width: 1,
//           ),
//         ),
//         focusedBorder: OutlineInputBorder(
//           borderRadius: BorderRadius.circular(6),
//           borderSide: const BorderSide(
//             color: ColorConst.black,
//             width: 2,
//           ),
//         ),
//         focusedErrorBorder: OutlineInputBorder(
//           borderRadius: BorderRadius.circular(6),
//           borderSide: const BorderSide(
//             color: ColorConst.red,
//             width: 2,
//           ),
//         ),
//         errorBorder: OutlineInputBorder(
//           borderRadius: BorderRadius.circular(6),
//           borderSide: const BorderSide(
//             color: ColorConst.red,
//             width: 1,
//           ),
//         ),
//         // prefixIcon: prefixIcon,
//         // prefixIconColor: ColorConst.burgundy,
//         // suffixIcon: suffixIcon,
//         // suffixIconColor: ColorConst.burgundy,
//         hintText: hint,
//         hintStyle: TextStyle(
//           // TextType.subHeading2,
//           color: ColorConst.dartGrey3,
//           fontSize: 16.sp,
//         ),
//         errorText: errorText,
//         errorStyle: TextStyle(
//           // TextType.text6,
//           color: ColorConst.red,
//           fontSize: 16.sp,
//         ),
//         enabled: true,

//         // helperText: helperText,
//         // helperStyle: getTextStyle(
//         //   // TextType.text6,
//         //   color: ColorConst.dartGrey3,
//         //   fontSize: helperFontSize,
//         // ),
//         // contentPadding: contentPadding,
//       ),
//       style: TextStyle(
//         // TextType.subHeading1,
//         color: ColorConst.dartGrey3,
//         fontSize: 16.sp,
//       ),
//       onChanged: onChanged,
//       onFieldSubmitted: onSubmitted,
//     );
//   }
// }

class CustomTextFormField extends StatelessWidget {
  final TextEditingController? controller;
  final String? initialValue;
  final String? label;
  final String? hint;
  final String? errorText;
  final String? helperText;
  final Widget? prefixIcon;
  final Widget? suffixIcon;
  final bool obscureText;
  final bool autofocus;
  final bool enabled;
  final Color? focusedColor;
  final Color? enabledColor;
  final TextInputType? keyboardType;
  final TextInputAction? textInputAction;
  final void Function(String)? onChanged;
  final void Function(String?)? onSubmitted;
  final String? Function(String?)? validator;
  final Iterable<String>? autofillHints;
  final List<TextInputFormatter>? inputFormatters;
  final double? labelFontSize;
  final int? maxline;
  final int? minline;

  /// will be same for errorFontSize
  final double? helperFontSize;
  final double? hintFontSize;
  final double? inputFontSize;

  final EdgeInsets contentPadding;
  final FocusNode? focusNode;
  final void Function(PointerDownEvent)? onTapOutside;

  const CustomTextFormField({
    Key? key,
    this.label,
    this.focusNode,
    this.onTapOutside,
    this.controller,
    this.initialValue,
    this.hint,
    this.errorText,
    this.helperText,
    this.prefixIcon,
    this.suffixIcon,
    this.obscureText = false,
    this.autofocus = false,
    this.enabled = true,
    this.focusedColor,
    this.enabledColor,
    this.maxline,
    this.minline,
    this.onChanged,
    this.onSubmitted,
    this.validator,
    this.keyboardType,
    this.textInputAction,
    this.autofillHints,
    this.helperFontSize,
    this.hintFontSize,
    this.inputFontSize,
    this.labelFontSize,
    this.inputFormatters,
    this.contentPadding =
        const EdgeInsets.symmetric(horizontal: 16, vertical: 20),
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        TextFormField(
          focusNode: focusNode,
          onTapOutside: onTapOutside,
          maxLines: maxline ?? 1,
          minLines: minline ?? 1,
          controller: controller,
          initialValue: initialValue,
          decoration: InputDecoration(
            filled: true,
            hoverColor: Colors.transparent,
            focusColor: ColorConst.white,
            fillColor: ColorConst.white,
            disabledBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(6),
              borderSide: BorderSide(
                color: ColorConst.lightGrey3,
                width: 1.w,
              ),
            ),
            enabledBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(6),
              borderSide: const BorderSide(
                color: ColorConst.dartGrey3,
                width: 1,
              ),
            ),
            focusedBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(6),
              borderSide: const BorderSide(
                color: ColorConst.black,
                width: 2,
              ),
            ),
            focusedErrorBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(6),
              borderSide: const BorderSide(
                color: ColorConst.black,
                width: 2,
              ),
            ),
            errorBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(6),
              borderSide: const BorderSide(
                color: ColorConst.black,
                width: 1,
              ),
            ),
            // prefixIcon: prefixIcon,
            // prefixIconColor: ColorConst.burgundy,
            // suffixIcon: suffixIcon,
            // suffixIconColor: ColorConst.burgundy,
            hintText: hint,
            hintStyle: TextStyle(
              // TextType.subHeading2,
              color: ColorConst.dartGrey3,
              fontSize: 16.sp,
            ),
            errorText: errorText,
            errorStyle: TextStyle(
              // TextType.text6,
              color: ColorConst.red,
              fontSize: 16.sp,
            ),
            enabled: true,

            // helperText: helperText,
            // helperStyle: getTextStyle(
            //   // TextType.text6,
            //   color: ColorConst.dartGrey3,
            //   fontSize: helperFontSize,
            // ),
            // contentPadding: contentPadding,
          ),
          style: TextStyle(
              // TextType.subHeading1,
              color: ColorConst.black,
              fontSize: 16.sp,
              fontWeight: FontWeight.w600),
          inputFormatters: inputFormatters,
          keyboardType: keyboardType,
          textInputAction: textInputAction,
          obscureText: obscureText,
          autofocus: autofocus,
          enabled: enabled,
          onChanged: onChanged,
          onFieldSubmitted: onSubmitted,
          validator: validator,
          autofillHints: autofillHints,
        ),
      ],
    );
  }
}
