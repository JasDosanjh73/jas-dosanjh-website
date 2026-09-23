---
version: "2.3.1"
releaseDate: "2026-02-26"
order: 1
requirements:
  - "No database migration required"
downloads:
  - label: "Download (macOS)"
    url: "#"
  - label: "Download Installer (Windows)"
    url: "#"
changes:
  - type: "Bugfix"
    summary: |
      Resolved a permissions edge case that blocked uploads after an admin role change.
  - type: "Bugfix"
    summary: |
      Fixed missing audit events in export logs when a batch finished with warnings.
  - type: "Improvement"
    summary: |
      Added clearer inline validation for malformed import files.
---
