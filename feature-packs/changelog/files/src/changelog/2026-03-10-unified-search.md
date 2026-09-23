---
version: "2.4.0"
releaseDate: "2026-03-10"
order: 1
statusLabel: "Paid upgrade"
statusTone: "warning"
requirements:
  - "macOS 14 or later required"
  - "Windows 11 or later required"
downloads:
  - label: "Download (macOS)"
    url: "#"
  - label: "Download Installer (Windows)"
    url: "#"
callouts:
  - title: "Upgrade notice"
    body: |
      Existing customers can apply an upgrade discount before moving to this release.
    tone: "warning"
  - title: "Press release"
    body: |
      A short release summary is available for journalists and partners.
    url: "#"
    linkText: "Open press release"
    tone: "info"
changes:
  - type: "Feature"
    summary: |
      Added a unified search layer across project notes, assets, and linked records.
  - type: "Feature"
    summary: |
      Introduced resumable background tasks for longer-running imports.
  - type: "Bugfix"
    summary: |
      Fixed stalled sync progress when multiple uploads were queued at once.
---
This release introduces the first complete version of the new release-management workflow.
