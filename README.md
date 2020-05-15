# Issues Reporter

[![GitHub Actions build badge](https://github.com/actions/typescript-action/workflows/build-test/badge.svg)](https://github.com/brcrista/issues-reporter/actions?query=workflow%3Abuild-test)

GitHub Action to generate a Markdown summary of the issues in a repo.

## Usage

```yml
- uses: brcrista/issues-reporter@v1
  with:
    title: 'My Issues Report'
    path: 'IssuesReport.md'
    sections: 'issues-report.json'
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
| [Section Title](Link to Section Below) | `incident-repair`, `short-term` | 10 | 5 | :green_heart: |

### Summary of Another section
| Section Title | Labels | Threshold | Count | Status |
| -- | -- | -- | -- | -- |
| [Section Title](Link to Section Below) | `bug` | 2 | 0 | :green_heart: |

## Details
### :green_heart: Repair items [Link to Query](Link)
Total : 5
Threshold : 10
Labels : `incident-repair`, `short-term`
| Owner | Count |
| -- | -- |
| [PersonA](Link) | 5 |
| [PersonB](Link) | 5 |

### :green_heart: Another section [Link to Query](Link)
Total : 0
Threshold : 2
Labels : `bug`
| Owner | Count |
| -- | -- |
```