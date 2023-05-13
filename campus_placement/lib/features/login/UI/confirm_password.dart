import 'package:flutter/material.dart';

class ConfirmPasswordScreen extends StatefulWidget {
  final String email;
  const ConfirmPasswordScreen({super.key, required this.email});

  @override
  State<ConfirmPasswordScreen> createState() => _ConfirmPasswordScreenState();
}

class _ConfirmPasswordScreenState extends State<ConfirmPasswordScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: const [
            Text('ConfirmPasswordScreen'),
          ],
        ),
      ),
    );
  }
}
