import 'package:intl/intl.dart';

import '../../error/reminder_error.dart';
import '../../model/reminder.dart';

class ReminderValidator {
  void validate(Reminder reminder) {
    if (reminder.title.isEmpty) {
      throw EmptyTitleError();
    }

    if (reminder.title.length < 5) {
      throw ShortTitleError();
    }

    final dateFormatter = DateFormat("dd/MM/yyyy HH:mm");
    final reminderDate = dateFormatter.parse("${reminder.date} ${reminder.time}");

    if (reminderDate.isBefore(DateTime.now())) {
      throw InvalidTimeError();
    }

    if (reminder.note.isEmpty) {
      throw EmptyNoteError();
    }

    if (reminder.note.length < 5) {
      throw ShortNoteError();
    }
  }
}
