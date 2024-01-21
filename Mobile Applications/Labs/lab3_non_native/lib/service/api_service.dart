import 'dart:convert';
import 'dart:io';
import 'package:path_provider/path_provider.dart';

import '../model/reminder.dart';

class ApiService {
  Future<List<Reminder>> fetchReminders() async {
    try {
      final directory = await getApplicationDocumentsDirectory();
      final filePath = File('${directory.path}/reminders.json');

      if (!await filePath.exists()) {
        await filePath.create();
        return [];
      }

      final data = await filePath.readAsString();
      const decoder = JsonDecoder();
      final reminders = decoder.convert(data).map<Reminder>((reminder) {
        return Reminder(
          id: reminder['id'],
          title: reminder['title'],
          date: reminder['date'],
          time: reminder['time'],
          category: reminder['category'],
          priority: reminder['priority'],
          note: reminder['note'],
          isCompleted: reminder['isCompleted'],
        );
      }).toList();
      return reminders;
    } catch (e) {
      return [];
    }
  }

  Future<void> saveReminders(List<Reminder> reminders) async {
    final directory = await getApplicationDocumentsDirectory();
    final filePath = File('${directory.path}/reminders.json');

    const encoder = JsonEncoder.withIndent('  ');
    final data = encoder.convert(reminders.map((reminder) {
      return {
        'id': reminder.id,
        'title': reminder.title,
        'date': reminder.date,
        'time': reminder.time,
        'category': reminder.category,
        'priority': reminder.priority,
        'note': reminder.note,
        'isCompleted': reminder.isCompleted,
      };
    }).toList());

    await filePath.writeAsString(data);
  }
}
