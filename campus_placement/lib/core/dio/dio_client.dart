import 'package:dio/dio.dart';

class DioClient {
  final Dio _dio;

  /// Creates a new instance of [DioClient] with the given [Dio] instance.
  ///
  /// This constructor is intended for internal use only. It's recommended to
  /// use the [create] constructor to create a new instance of [DioClient] with
  /// the provided [baseUrl] parameter.
  DioClient._(this._dio);

  /// Creates a new instance of [DioClient] with the given [baseUrl].
  ///
  /// Example usage:
  ///
  /// ```dart
  /// final dioClient = DioClient.create(Dio());
  /// ```
  factory DioClient.create(Dio dio, {List<Interceptor>? interceptors}) {
    // Add custom interceptors if provided
    if (interceptors != null) {
      dio.interceptors.addAll(interceptors);
    }
    return DioClient._(dio);
  }

  /// Returns baseUrl
  String get baseUrl => _dio.options.baseUrl;

  Future<Response<dynamic>> get(
    String path, {
    Map<String, dynamic>? params,
    Options? options,
    CancelToken? cancelToken,
    ProgressCallback? onReceiveProgress,
  }) async {
    try {
      final response = await _dio.get(
        path,
        queryParameters: params,
        options: options,
        cancelToken: cancelToken,
        onReceiveProgress: onReceiveProgress,
      );
      return response;
    } catch (e) {
      if (e is DioError) {
        // throw (handleDioError(e));
        throw ('error $e');
      } else {
        rethrow;
      }
    }
  }

  /// Sends an HTTP POST request to the given [path] with optional [data] and
  /// [params].
  ///
  /// Returns the response as a [Response] object.
  Future<Response<T>> post<T>(
    String path, {
    dynamic data,
    Map<String, dynamic>? params,
    Options? options,
    CancelToken? cancelToken,
    ProgressCallback? onSendProgress,
    ProgressCallback? onReceiveProgress,
  }) async {
    try {
      final response = await _dio.post<T>(
        path,
        data: data,
        queryParameters: params,
        options: options,
        cancelToken: cancelToken,
        onSendProgress: onSendProgress,
        onReceiveProgress: onReceiveProgress,
      );
      return response;
    } catch (e) {
      if (e is DioError) {
        // throw (handleDioError(e));
        // print("Error $e");
        throw ('error $e');
      } else {
        rethrow;
      }
    }
  }

  /// Sends an HTTP PUT request to the given [path] with optional [data].
  ///
  /// Returns the response as a [Response] object.
  ///
  /// Throws a [DioError] if the request fails.
  Future<Response<T>> put<T>(
    String path, {
    dynamic data,
    Map<String, dynamic>? params,
    Options? options,
    CancelToken? cancelToken,
    ProgressCallback? onSendProgress,
    ProgressCallback? onReceiveProgress,
  }) async {
    try {
      final response = await _dio.put<T>(
        path,
        data: data,
        queryParameters: params,
        options: options,
        cancelToken: cancelToken,
        onSendProgress: onSendProgress,
        onReceiveProgress: onReceiveProgress,
      );
      return response;
    } catch (e) {
      if (e is DioError) {
        // print("Error $e");
        // throw (handleDioError(e));
        throw ('error $e');
      } else {
        rethrow;
      }
    }
  }

  /// Sends an HTTP PATCH request to the given [path] with optional [data].
  ///
  /// Returns the response as a [Response] object.
  ///
  /// Throws a [DioError] if the request fails.
  Future<Response<T>> patch<T>(
    String path, {
    dynamic data,
    Map<String, dynamic>? params,
    Options? options,
    CancelToken? cancelToken,
    ProgressCallback? onSendProgress,
    ProgressCallback? onReceiveProgress,
  }) async {
    try {
      final response = await _dio.patch<T>(
        path,
        data: data,
        queryParameters: params,
        options: options,
        cancelToken: cancelToken,
        onSendProgress: onSendProgress,
        onReceiveProgress: onReceiveProgress,
      );
      return response;
    } catch (e) {
      if (e is DioError) {
        // throw handleDioError(e);
        // print("Error $e");
        throw ('error $e');
      } else {
        rethrow;
      }
    }
  }

  /// Sends an HTTP DELETE request to the given [path] with optional [params].
  ///
  /// Returns the response as a [Response] object.
  ///
  /// Throws a [DioError] if the request fails.
  Future<Response<T>> delete<T>(
    String path, {
    Map<String, dynamic>? params,
    Options? options,
    CancelToken? cancelToken,
  }) async {
    try {
      final response = await _dio.delete<T>(
        path,
        queryParameters: params,
        options: options,
        cancelToken: cancelToken,
      );
      return response;
    } catch (e) {
      if (e is DioError) {
        throw ('error $e');
        // throw (handleDioError(e));
      } else {
        rethrow;
      }
    }
  }
}
