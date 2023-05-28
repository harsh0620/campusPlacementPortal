import 'dart:convert';

import 'package:flutter/foundation.dart';

String prettyJson(dynamic json) {
  if (json is! Map) {
    return json.toString();
  } else {
    return const JsonEncoder.withIndent('  ').convert(json);
  }
}

void prettyPrintJson(dynamic json) {
  final string = prettyJson(json);
  string.split('/n').forEach((element) {
    if (kDebugMode) print(element);
  });
}
