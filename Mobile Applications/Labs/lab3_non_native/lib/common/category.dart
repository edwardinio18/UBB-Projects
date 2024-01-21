enum Category {
  personal,
  work,
  health,
  family,
  recreation,
}

extension CategoryExtension on Category {
  String get name {
    switch (this) {
      case Category.personal:
        return "Personal";
      case Category.work:
        return "Work";
      case Category.health:
        return "Health";
      case Category.family:
        return "Family";
      case Category.recreation:
        return "Recreation";
    }
  }
}
