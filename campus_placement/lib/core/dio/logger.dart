import 'package:campus_placement/core/dio/pretty_json.dart';
import 'package:dio/dio.dart';
import 'package:flutter/foundation.dart';

class Logger extends Interceptor {
  @override
  void onRequest(RequestOptions options, RequestInterceptorHandler handler) {
    debugPrint('''
    *** [REQUEST] ***
      url: ${options.uri}
      requestMethod: ${options.method}
      queryParams: ${prettyJson(options.queryParameters)}
      headers: ${prettyJson(options.headers)}
      data: ${prettyJson(options.data)}
      ''');
    super.onRequest(options, handler);
  }

  @override
  void onResponse(
      Response<dynamic> response, ResponseInterceptorHandler handler) {
    debugPrint('''
    *** [RESPONSE] ***
      url: ${response.realUri}
      statusCode: ${response.statusCode}
      data: ${prettyJson(response.data)}
    ''');
    super.onResponse(response, handler);
  }

  @override
  void onError(DioError err, ErrorInterceptorHandler handler) {
    debugPrint('''
    *** [ERROR] ***
      url: ${err.requestOptions.uri}
      response: ${err.response}
      error: ${err.error}
      type: ${err.type}
      message: ${err.message}
      requestData: ${err.requestOptions.data};
    ''');
    super.onError(err, handler);
  }
}
