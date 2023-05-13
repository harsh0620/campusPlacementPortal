import 'package:flutter/material.dart';

import '../../constants/colors.dart';

class ErrorPageWidget extends StatelessWidget {
  final String message;
  final String buttonText;
  final VoidCallback onBack;

  const ErrorPageWidget({
    Key? key,
    required this.message,
    required this.onBack,
    this.buttonText = 'Go Home',
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(
              'Something went wrong!',
              style: Theme.of(context).textTheme.headlineSmall,
            ),
            const SizedBox(height: 16),
            Text(
              message,
              style: Theme.of(context).textTheme.bodyLarge,
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 32),
            SizedBox(
              width: 120,
              height: 40,
              // child: Button(
              //   onPressed: onBack,
              //   label: buttonText,
              // ),
              child: ElevatedButton(
                onPressed: onBack,
                style: ElevatedButton.styleFrom(
                  foregroundColor: ColorConst.white,
                  backgroundColor: ColorConst.primaryPink,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(6),
                  ),
                  padding: const EdgeInsets.all(16),
                ),
                child: Text(
                  buttonText,
                  style: const TextStyle(color: ColorConst.white),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
