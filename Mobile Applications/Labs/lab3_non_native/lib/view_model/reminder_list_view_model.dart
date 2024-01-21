import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

import '../model/reminder.dart';
import '../service/api_service.dart';
import '../utility/validator/reminder_validator.dart';

class ReminderListViewModel with ChangeNotifier {
  List<Reminder> reminders = [];
  final ApiService apiService = ApiService();
  final ReminderValidator reminderValidator = ReminderValidator();

  ReminderListViewModel() {
    loadReminders();
  }

  Future<void> loadReminders() async {
    reminders = await apiService.fetchReminders();
    notifyListeners();
  }

  void deleteReminder(int id) {
    reminders = reminders.where((reminder) => reminder.id != id).toList();
    apiService.saveReminders(reminders);
    notifyListeners();
  }

  void addReminder({
    required String title,
    required DateTime date,
    required DateTime time,
    required String category,
    required String priority,
    required String note,
  }) {
    final int highestId = reminders.fold(0, (int currentMaxId, Reminder reminder) {
          return currentMaxId > reminder.id ? currentMaxId : reminder.id;
        }) +
        1;

    final String dateString = DateFormat('dd/MM/yyyy').format(date);
    final String timeString = DateFormat('HH:mm').format(time);

    Reminder newReminder = Reminder(
      id: highestId,
      title: title,
      date: dateString,
      time: timeString,
      category: category,
      priority: priority,
      note: note,
      isCompleted: false,
    );

    try {
      reminderValidator.validate(newReminder);
    } catch (error) {
      rethrow;
    }

    reminders.add(newReminder);

    notifyListeners();

    apiService.saveReminders(reminders);
  }

  void updateReminder({
    required int id,
    required String title,
    required DateTime date,
    required DateTime time,
    required String category,
    required String priority,
    required String note,
  }) {
    String dateString = DateFormat('dd/MM/yyyy').format(date);
    String timeString = DateFormat('HH:mm').format(time);

    Reminder updatedReminder = Reminder(
      id: id,
      title: title,
      date: dateString,
      time: timeString,
      category: category,
      priority: priority,
      note: note,
    );

    try {
      reminderValidator.validate(updatedReminder);
    } catch (error) {
      rethrow;
    }

    int index = reminders.indexWhere((reminder) => reminder.id == id);
    if (index != -1) {
      reminders[index] = updatedReminder;
      notifyListeners();
    }

    apiService.saveReminders(reminders);
  }

  void updateReminderCompletion(Reminder reminder) {
    int index = reminders.indexWhere((r) => r.id == reminder.id);
    if (index != -1) {
      reminders[index] = reminder.updateCompletion();
      apiService.saveReminders(reminders);
      notifyListeners();
    }
  }
}
