import 'package:campus_placement/features/login/UI/register_student.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:go_router/go_router.dart';

import '../../auth/auth_bloc.dart';
import '../../features/error/error.dart';
import '../../features/home/UI/home.dart';
import '../../features/login/UI/confirm_password.dart';
import '../../features/login/UI/enter_otp_screen.dart';
import '../../features/login/UI/login_page.dart';
import '../../features/login/UI/reset_password.dart';

class Routes {
  static const root = '/';
  static const error = '/error';
  static const login = '/login';
  static const registerStudentPage = '/register-student';
  static const enterEmailResetPassword = 'reset-password';
  static const enterOtp = 'enter-otp';
  static const changePassword = 'confirm-password';
}

final rootKey = GlobalKey<NavigatorState>();

GoRouter goRouter(BuildContext context) {
  return GoRouter(
      debugLogDiagnostics: true,
      navigatorKey: rootKey,
      initialLocation: Routes.root,
      redirect: (ctx, state) {
        final authState = context.read<AuthBloc>().state;
        if (authState.isAuthenticated ||
            state.location.contains(Routes.login) ||
            state.location.contains(Routes.registerStudentPage)) {
          return null;
        } else {
          return Routes.login;
        }
        // // final authState = context.read<AuthBloc>().state;
        // if (state.location.contains(Routes.login)) {
        //   return null;
        // } else {
        //   return Routes.login;
        // }
      },
      errorBuilder: (context, state) {
        return ErrorPageWidget(
          message: 'Error: "${state.location}" route not found.',
          onBack: () {
            context.goNamed(Routes.root);
          },
        );
      },
      routes: [
        GoRoute(
          name: Routes.root,
          path: Routes.root,
          pageBuilder: (context, state) {
            return NoTransitionPage(
              child: const Home(),
            );
          },
        ),
        GoRoute(
          path: Routes.login,
          name: Routes.login,
          pageBuilder: (context, state) => const NoTransitionPage(
            child: LoginPage(),
          ),
          routes: [
            GoRoute(
              path: Routes.enterOtp,
              name: Routes.enterOtp,
              // redirect: (context, state) {},
              builder: (ctx, state) {
                return EnterOtpScreen(
                  email: state.queryParams['email'] ?? '',
                );
              },
            ),
            GoRoute(
              path: Routes.enterEmailResetPassword,
              name: Routes.enterEmailResetPassword,
              builder: (context, state) => const ResetPasswordScreen(),
            ),
            GoRoute(
                path: Routes.changePassword,
                name: Routes.changePassword,
                redirect: (context, state) {},
                builder: (ctx, state) {
                  return ConfirmPasswordScreen(
                      email: state.queryParams['email'] ?? '');
                }),
          ],
        ),
        GoRoute(
          path: Routes.registerStudentPage,
          name: Routes.registerStudentPage,
          pageBuilder: (context, state) => const NoTransitionPage(
            child: RegisterStudent(),
          ),
        ),
        GoRoute(
          path: Routes.error,
          builder: (context, state) {
            final args = state.extra as Map<String, String>?;
            final message = args?['message'] ?? 'Error: Invalid Route.';
            final route = args?['route'] ?? Routes.root;
            return ErrorPageWidget(
              message: message,
              onBack: () {
                context.pushReplacement(route);
              },
            );
          },
        ),
      ]);
}
