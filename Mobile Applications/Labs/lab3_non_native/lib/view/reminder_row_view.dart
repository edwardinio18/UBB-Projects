import 'package:flutter/cupertino.dart';

import '../model/reminder.dart';
import '../view_model/reminder_list_view_model.dart';
import 'edit_reminder_view.dart';

class ReminderRowView extends StatelessWidget {
  final Reminder reminder;
  final ReminderListViewModel viewModel;

  const ReminderRowView({
    Key? key,
    required this.reminder,
    required this.viewModel,
  }) : super(key: key);

  void _showEditReminderView(BuildContext context) {
    showCupertinoModalPopup(
      context: context,
      builder: (BuildContext context) {
        return EditReminderView(
          reminder: reminder,
          viewModel: viewModel,
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () => _showEditReminderView(context),
      child: Padding(
        padding: const EdgeInsets.all(8.0),
        child: Row(
          children: [
            GestureDetector(
              onTap: () {
                viewModel.updateReminderCompletion(reminder);
              },
              child: Icon(
                reminder.isCompleted ? CupertinoIcons.check_mark_circled_solid : CupertinoIcons.circle,
                color: CupertinoColors.systemGrey,
              ),
            ),
            const SizedBox(width: 10.0),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    reminder.title,
                    style: const TextStyle(
                      fontWeight: FontWeight.bold,
                      color: CupertinoColors.white,
                    ),
                    overflow: TextOverflow.ellipsis,
                  ),
                  Text(
                    reminder.note,
                    style: const TextStyle(
                      color: CupertinoColors.white,
                    ),
                    overflow: TextOverflow.ellipsis,
                  ),
                  Row(
                    children: [
                      Text(
                        reminder.date,
                        style: const TextStyle(
                          color: CupertinoColors.white,
                        ),
                      ),
                      const Text(" · ", style: TextStyle(color: CupertinoColors.white)),
                      Text(
                        reminder.time,
                        style: const TextStyle(
                          color: CupertinoColors.white,
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
