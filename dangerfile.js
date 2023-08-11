import { danger, warn } from "danger";

// CheckList for this file
// 1. Check if the PR is too big
// 2. Check if the PR has too many files
// 3. Check if the PR has a reviewer
// 4. Check if the PR has an assignee
// 5. Check if all checks have passed

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

if (!danger.github.pr.reviewers?.length > 0) {
  warn("Reviewer not assigned to PR.");
  isAllCheckPassed = false;
}

if (!danger.github.pr.assignees?.length > 0) {
  warn("Assignee not selected for PR.");
  isAllCheckPassed = false;
}

if (isAllCheckPassed) {
  markdown("## All checkes have passed.");
} else {
  markdown("## Some checks have failed.");
}
