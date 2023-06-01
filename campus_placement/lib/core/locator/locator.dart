import 'package:campus_placement/features/login/cubit/register_student_cubit.dart';
import 'package:dio/dio.dart';
import 'package:get_it/get_it.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../../auth/auth_bloc.dart';
import '../../constants/constants.dart';
import '../../data/repository/repo.dart';
import '../../features/login/cubit/login_cubit.dart';
import '../../features/student_management/cubit/student_home_cubit.dart';
import '../dio/app_interceptor.dart';
import '../dio/dio_client.dart';
import '../dio/logger.dart';

final locator = GetIt.instance;

Future<void> initLocator() async {
  // SharedPreferences sharedPref = await SharedPreferences.getInstance();

  locator.registerSingleton<DioClient>(
    DioClient.create(
      Dio(BaseOptions(baseUrl: Constants.baseUrl)),
      interceptors: [AppInterceptor(), Logger()],
    ),
  );
  // locator.registerSingleton<SharedPreferences>(sharedPref);

  locator.registerSingleton<RemoteRepository>(
    RemoteRepositoryImpl(locator<DioClient>()),
  );
  locator.registerSingleton<AuthBloc>(
    AuthBloc(locator<RemoteRepository>()),
  );

  // locator.registerSingleton<AuthBloc>(
  //   AuthBloc(locator<RemoteRepository>()),
  // );

  locator.registerLazySingleton<LoginCubit>(
    () => LoginCubit(locator<RemoteRepository>()),
  );
  locator.registerFactory<StudentHomeCubit>(
    () => StudentHomeCubit(locator<RemoteRepository>()),
  );
  locator.registerLazySingleton<RegisterStudentCubit>(
      () => RegisterStudentCubit(locator<RemoteRepository>()));
}
