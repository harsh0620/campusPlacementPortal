import 'package:flutter/material.dart';

class EnterOtpScreen extends StatefulWidget {
  final String email;
  const EnterOtpScreen({super.key, required this.email});

  @override
  State<EnterOtpScreen> createState() => _EnterOtpScreenState();
}

class _EnterOtpScreenState extends State<EnterOtpScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: const [
            Text('EnterOtpScreen'),
          ],
        ),
      ),
    );
  }
}
