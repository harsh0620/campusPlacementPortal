import 'package:dio/dio.dart';

import '../../auth/auth_bloc.dart';
import '../../features/login/cubit/login_cubit.dart';
import '../locator/locator.dart';

class AppInterceptor extends Interceptor {
  @override
  void onRequest(
      RequestOptions options, RequestInterceptorHandler handler) async {
    final token = locator<AuthBloc>().state.accessToken;
    // SharedPreferences prefs = await SharedPreferences.getInstance();

    // final token = prefs.get("token");

    if (token != null) options.headers['Authorization'] = 'Bearer $token';

    super.onRequest(options, handler);
  }

  @override
  void onError(DioError err, ErrorInterceptorHandler handler) {
    if (err.response?.statusCode == 403) {
      if (locator<AuthBloc>().state.accessToken != null) {
        locator<AuthBloc>().add(LogoutEvent());
      }
      locator<LoginCubit>().resetLoginState();
    }
    super.onError(err, handler);
  }
}
