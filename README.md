# Issues Reporter

[![GitHub Actions build badge](https://github.com/actions/typescript-action/workflows/build-test/badge.svg)](https://github.com/brcrista/summarize-issues/actions?query=workflow%3Abuild-test)

GitHub Action that generates a Markdown summary of the issues in a repo.

See a full example at https://github.com/brcrista/summarize-issues-test.

## Example

```yml
name: Generate issues report

on: issues

env:
  OUTPUT_FILE_NAME: IssuesReport.md
  COMMITTER_EMAIL: 33549821+brcrista@users.noreply.github.com
  COMMITTER_NAME: Brian Cristante
  COMMITTER_USERNAME: brcrista

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v2

    - uses: brcrista/summarize-issues@dev
      with:
        title: 'My Issues Report'
        configPath: '.github/workflows/issues-report-config.json'
        outputPath: ${{ env.OUTPUT_FILE_NAME }}
        token: ${{ secrets.GITHUB_TOKEN }}

    - name: "Commit if any changes were made"
      run: |
        git remote add github "https://$COMMITTER_USERNAME:${{ secrets.GITHUB_TOKEN }}@github.com/$GITHUB_REPOSITORY.git"
        git pull github ${GITHUB_REF} --ff-only
        if [[ `git status --porcelain` ]]; then
          git add ${OUTPUT_FILE_NAME}
          git config --global user.email $COMMITTER_EMAIL
          git config --global user.name $COMMITTER_NAME
          git commit -m "Update $OUTPUT_FILE_NAME"
          git push github HEAD:${GITHUB_REF}
        fi
```

where `issues-report.json` looks like:

```json
[
  {
    "section": "Repair items",
    "labels": ["incident-repair", "short-term"],
    "threshold": 10
  },
  {
    "section": "Another section",
    "labels": ["bug"],
    "threshold": 2
  }
]
```

This will commit a Markdown file named `IssuesReport.md` that looks like this:

```markdown
### My Issues Report
### Summary of Repair items
| Section Title | Labels | Threshold | Count | Status |
| -- | -- | -- | -- | -- |
| [Repair items](#Repair-items) | `incident-repair`, `short-term` | 10 | 2 | 💚🥳 |
### Summary of Another section
| Section Title | Labels | Threshold | Count | Status |
| -- | -- | -- | -- | -- |
| [Another section](#Another-section) | `bug` | 2 | 2 | 💛😬 |
## Details
### 💚🥳 Repair items [(query)](https://github.com/some/query/url)
Total: 2

Threshold: 10

Labels: `incident-repair`, `short-term`

| Owner | Count |
| -- | -- |
| [brcrista](https://github.com/brcrista) | 1 |
### 💛😬 Another section [(query)](https://github.com/some/query/url)
Total: 2

Threshold: 2

Labels: `bug`

| Owner | Count |
| -- | -- |
| [brcrista](https://github.com/brcrista) | 1 |

```
