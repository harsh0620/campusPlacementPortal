import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:hydrated_bloc/hydrated_bloc.dart';
import 'package:path_provider/path_provider.dart';

import 'auth/auth_bloc.dart';
import 'core/locator/locator.dart';
import 'core/router/router.dart';
import 'features/login/cubit/login_cubit.dart';
import 'features/login/cubit/register_student_cubit.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();

  HydratedBloc.storage = await HydratedStorage.build(
      storageDirectory: await getApplicationDocumentsDirectory());
  initLocator();

  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return ScreenUtilInit(
      // designSize: const Size(1440, 1024),
      minTextAdapt: true,
      builder: (context, child) {
        return MultiBlocProvider(
          providers: [
            BlocProvider<AuthBloc>(
              create: (context) => locator<AuthBloc>(),
            ),
            BlocProvider<LoginCubit>(
              create: (context) => locator<LoginCubit>(),
            ),
            BlocProvider<RegisterStudentCubit>(
              create: (context) => locator<RegisterStudentCubit>(),
            ),
          ],
          child: BlocBuilder<AuthBloc, AuthState>(
            builder: (context, state) {
              return MaterialApp.router(
                debugShowCheckedModeBanner: false,
                routerConfig: goRouter(context),
                theme: ThemeData(
                  textTheme: GoogleFonts.quicksandTextTheme(),
                ),
              );
            },
          ),
        );
      },
    );
  }
}
