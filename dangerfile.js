import { danger, warn } from "danger";

const diffLines = danger.github.pr.additions + danger.github.pr.deletions;
if (diffLines > 200) {
  warn("Over 200 lines changed in this PR.");
}

if (danger.github.pr.changed_files > 10) {
  warn("Over 10 files modified in this PR.");
}

if (!danger.github.pr.assignee) {
  warn("Assignee not selected for PR.");
}
