import { danger, warn } from "danger";

const modifiedFiles = danger.git.modified_files;

const addedLines = danger.git.created_files.reduce(
  (acc, file) => acc + (danger.git.diffForFile(file).added || "").split("\n").length,
  0
);
const deletedLines = danger.git.deleted_files.reduce(
  (acc, file) => acc + (danger.git.diffForFile(file).deleted || "").split("\n").length,
  0
);

if (addedLines + deletedLines > 2) {
  warn("You have more than 200 line changes in this PR");
}

if (modifiedFiles.length > 10) {
  warn("You have modified more than 10 files in this PR");
}

if (!danger.github.pr.assignee) {
  warn("This pull request needs an assignee, and optionally include any reviewers.");
}
