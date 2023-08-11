import { danger, warn, message } from "danger";

// CheckList for this file
// ・Check if the PR is too big
// ・Check if the PR has too many files
// ・Check if the PR has an assignee

let isAllCheckPassed = true;
const diffLines = danger.github.pr.additions + danger.github.pr.deletions;
if (diffLines > 200) {
  warn("Over 200 lines changed in this PR.");
  isAllCheckPassed = false;
}

if (danger.github.pr.changed_files > 10) {
  warn("Over 10 files modified in this PR.");
  isAllCheckPassed = false;
}

if (!danger.github.pr.assignee) {
  warn("Assignee not selected for PR.");
  isAllCheckPassed = false;
}

if (isAllCheckPassed) {
  message("## All checkes is OK!!");
}
