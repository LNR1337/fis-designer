FIS-Designer is a hobby project aiming to help design dashboards for the fantastic
[FIS-Control MMI](https://fis-control.de/fis_control_mmi_en.html) device.

#### The tool is available at http://fis-designer.xyz.

![Gauge config window](https://i.imgur.com/gmIAJWC.png)

### Main features:

- Accurate preview of the analog gauges.
- Preview of the tables (accurate positions, different font)
- Full support for loading and saving of FIS-Control binary files (binary format discussed with
  Stefan, so it should be fully compatible).
- Support for loading and saving of full configs (settings + images) in local storage or as JSON
  files.
- Ability to load only the visual part of a config from JSON, leaving your settings intact.
- Bulk image uploader - if you don't like clicking the "upload" button wink
- Mobile friendly.

### TODO

- Load digits as grayscale.
- Digit visualization.
- More accurate tables font.

### Known bugs

- Workspace component unloading leaves subscriptions hanging.
