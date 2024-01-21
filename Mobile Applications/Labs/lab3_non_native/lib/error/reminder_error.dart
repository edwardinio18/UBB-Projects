class ReminderError implements Exception {
  final String message;

  ReminderError(this.message);

  @override
  String toString() {
    return message;
  }
}

class EmptyTitleError extends ReminderError {
  EmptyTitleError() : super("Title cannot be empty.");
}

class ShortTitleError extends ReminderError {
  ShortTitleError() : super("Title is too short.");
}

class InvalidTimeError extends ReminderError {
  InvalidTimeError() : super("Invalid time.");
}

class EmptyNoteError extends ReminderError {
  EmptyNoteError() : super("Note cannot be empty.");
}

class ShortNoteError extends ReminderError {
  ShortNoteError() : super("Note is too short.");
}
