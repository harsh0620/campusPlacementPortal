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

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  //  await Firebase.initializeApp(
  //   options: DefaultFirebaseOptions.currentPlatform,
  // );
  // final storage = await HydratedStorage.build(
  //   storageDirectory: kIsWeb
  //       ? HydratedStorage.webStorageDirectory
  //       : await getApplicationDocumentsDirectory(),
  // );
  HydratedBloc.storage = await HydratedStorage.build(
      storageDirectory: await getApplicationDocumentsDirectory());
  initLocator();
  // HydratedBlocOverrides.runZoned(
  //   () => runApp(MyApp()),
  //   storage: storage,
  // );
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    // return ScreenUtilInit(builder: (context, child) {
    //   return MultiBlocProvider(
    //     providers: [
    //       BlocProvider<AuthBloc>(
    //         create: (context) => locator<AuthBloc>(),
    //       ),
    //       BlocProvider<LoginCubit>(
    //         create: (context) => locator<LoginCubit>(),
    //       ),
    //     ],
    //     child: BlocBuilder<AuthBloc, AuthState>(
    //       builder: (context, state) {
    //         return MaterialApp.router(
    //           debugShowCheckedModeBanner: false,
    //           routerConfig: router(context),
    //           theme: ThemeData(
    //             textTheme: GoogleFonts.quicksandTextTheme(),
    //           ),
    //         );
    //       },
    //     ),
    //   );
    // });
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
