import 'package:flutter/cupertino.dart';

import 'view/reminder_list_view.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const CupertinoApp(
      title: 'Reminders App',
      theme: CupertinoThemeData(
        primaryColor: CupertinoColors.activeBlue,
        brightness: Brightness.light,
      ),
      debugShowCheckedModeBanner: false,
      home: ReminderListView(),
    );
  }
}
